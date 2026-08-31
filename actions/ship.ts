'use server'
import { db } from "@/db";
import { requireAnyRole, requireAuth } from "@/lib/auth-guard";
import { projects, shipEvents, user } from "@/db/schema";
import { and, eq, isNull, sql } from "drizzle-orm";
import { getHackatimeHours } from "@/lib/hackatime";
import { addLog } from "@/lib/db/logs";

export async function shipProject(projectId: number, shipText: string, selectedProjects: string[]) {
    const session = await requireAuth()
    const project = await db.query.projects.findFirst({ where: eq(projects.id, projectId) })

    if (!project) return { success: false, error: 'project not found' }
    if (project.userId !== session.id) return { success: false, error: 'not authorized to ship this project' }

    if (project.recentShipStatus === 'perm_rejected') {
        return {
            success: false,
            error: "This project has been permanently rejected and can no longer be shipped."
        };
    }

    // only a currently-pending event blocks a new ship; "rejected" and
    // "changes_requested" both allow reshipping (see requestChanges/rejectProject
    // for how approvedSeconds is or isn't bumped in each case)
    const existingPending = await db.query.shipEvents.findFirst({
        where: and(
            eq(shipEvents.projectId, projectId),
            eq(shipEvents.userId, session.id),
            eq(shipEvents.approvalStatus, "pending"),
            isNull(shipEvents.withdrawnAt)
        ),
    })

    if (existingPending) {
        return {
            success: false,
            error: "You already have a pending ship event for this project."
        };
    }

    if (selectedProjects.length === 0) {
        return {
            success: false,
            error: "Please select at least one Hackatime proejct"
        }
    }

    const totalTime = await getHackatimeHours(selectedProjects)

    if (!totalTime.success || totalTime.totalSeconds == null || totalTime.totalSeconds <= 15 * 60) {
        return { success: false, error: "error" in totalTime ? totalTime.error : "Not enough tracked time to ship" }
    }

    const approvedSeconds = project.approvedSeconds ?? 0
    const newSeconds = totalTime.totalSeconds - approvedSeconds

    if (newSeconds <= 0) {
        return { success: false, error: 'No new tracked time since last ship' }
    }

    const [shipEvent] = await db.transaction(async (tx) => {
        const [event] = await tx
            .insert(shipEvents)
            .values({
                projectId: project.id,
                userId: session.id,
                shipText,
                seconds: newSeconds,
                approvalStatus: "pending",
            })
            .returning()

        await tx
            .update(projects)
            .set({ recentShipStatus: 'pending' })
            .where(eq(projects.id, projectId))

        return [event]
    })

    await addLog({
        title: 'Project Shipped',
        description: 'A project was shipped',
        location: '/projects/ship',
        type: 'ship_event',
        metadata: `shipEventId: ${shipEvent.id}`,
        userId: session.id
    })

    return { success: true, shipEvent }
}


export async function approveProject(shipEventId: number, reviewerNote?: string, auditNote?: string) {
    const session = await requireAnyRole(["reviewer"])

    const shipEvent = await db.query.shipEvents.findFirst({ where: eq(shipEvents.id, shipEventId) })

    if (!shipEvent) return { success: false, error: 'ship event not found' }
    if (shipEvent.approvalStatus === 'approved') return { success: false, error: 'already approved' }

    const result = await db.transaction(async (tx) => {
        const [updatedShipEvent] = await tx
            .update(shipEvents)
            .set({
                approvalStatus: "approved",
                reviewerNote: reviewerNote ?? shipEvent.reviewerNote,
                auditNote,
                reviewedBy: session.id,
                reviewedOn: new Date()
            })
            .where(eq(shipEvents.id, shipEventId))
            .returning()

        const [updatedProject] = await tx
            .update(projects)
            .set({
                approvedSeconds: sql`${projects.approvedSeconds} + ${shipEvent.seconds}`,
                recentShipStatus: 'approved'
            })
            .where(eq(projects.id, shipEvent.projectId))
            .returning()

        const [updatedUser] = await tx
            .update(user)
            .set({
                pots: sql`${user.pots} + ${shipEvent.seconds / 720}`,
            })
            .where(eq(user.id, shipEvent.userId))
            .returning()

        return { updatedShipEvent, updatedProject, updatedUser }
    })

    await addLog({
        title: 'Ship Event Approved',
        description: 'A ship event was approved',
        location: '/projects/approve',
        type: 'ship_event_approved',
        metadata: `shipEventId: ${shipEvent.id}, reviewerId: ${session.id}`,
        userId: shipEvent.userId
    })

    return { success: true, ...result }
}


/**
 * "Request changes": submitter can reship. approvedSeconds is NOT bumped,
 * so these hours stay unspent and count toward the next ship attempt.
 */
export async function requestChanges(shipEventId: number, reviewerNote?: string, auditNote?: string) {
    const session = await requireAnyRole(["reviewer"])

    const shipEvent = await db.query.shipEvents.findFirst({ where: eq(shipEvents.id, shipEventId) })

    if (!shipEvent) return { success: false, error: 'ship event not found' }
    if (shipEvent.approvalStatus === 'changes_requested') return { success: false, error: 'changes already requested' }
    if (shipEvent.approvalStatus === 'perm_rejected') return { success: false, error: 'this ship event was permanently rejected' }
    if (shipEvent.approvalStatus === 'approved') return { success: false, error: 'already approved' }

    const result = await db.transaction(async (tx) => {
        const [updatedShipEvent] = await tx
            .update(shipEvents)
            .set({
                approvalStatus: "changes_requested",
                reviewerNote: reviewerNote ?? shipEvent.reviewerNote,
                auditNote,
                reviewedBy: session.id,
                reviewedOn: new Date()
            })
            .where(eq(shipEvents.id, shipEventId))
            .returning()

        const [updatedProject] = await tx
            .update(projects)
            .set({
                recentShipStatus: 'changes_requested'
            })
            .where(eq(projects.id, shipEvent.projectId))
            .returning()

        return { updatedShipEvent, updatedProject }
    })

    await addLog({
        title: 'Ship Event Changes Requested',
        description: 'Changes were requested; submitter may reship for the same hours',
        location: '/projects/approve',
        type: 'ship_event_changes_requested',
        metadata: `shipEventId: ${shipEvent.id}, reviewerId: ${session.id}`,
        userId: shipEvent.userId
    })

    return { success: true, ...result }
}

/**
 * "Reject": submitter can reship, but only for time worked BEYOND this batch.
 * approvedSeconds IS bumped — no pots for this batch, hours are spent.
 */
export async function rejectProject(shipEventId: number, reviewerNote?: string, auditNote?: string) {
    const session = await requireAnyRole(["reviewer"])

    const shipEvent = await db.query.shipEvents.findFirst({ where: eq(shipEvents.id, shipEventId) })

    if (!shipEvent) return { success: false, error: 'ship event not found' }
    if (shipEvent.approvalStatus === 'rejected') return { success: false, error: 'already rejected' }
    if (shipEvent.approvalStatus === 'perm_rejected') return { success: false, error: 'already permanently rejected' }

    const result = await db.transaction(async (tx) => {
        const [updatedShipEvent] = await tx
            .update(shipEvents)
            .set({
                approvalStatus: "rejected",
                reviewerNote: reviewerNote ?? shipEvent.reviewerNote,
                auditNote,
                reviewedBy: session.id,
                reviewedOn: new Date()
            })
            .where(eq(shipEvents.id, shipEventId))
            .returning()

        const [updatedProject] = await tx
            .update(projects)
            .set({
                approvedSeconds: sql`${projects.approvedSeconds} + ${shipEvent.seconds}`,
                recentShipStatus: 'rejected'
            })
            .where(eq(projects.id, shipEvent.projectId))
            .returning()

        return { updatedShipEvent, updatedProject }
    })

    await addLog({
        title: 'Ship Event Rejected',
        description: 'A ship event was rejected; hours spent, no pots awarded',
        location: '/projects/approve',
        type: 'ship_event_rejected',
        metadata: `shipEventId: ${shipEvent.id}, reviewerId: ${session.id}`,
        userId: shipEvent.userId
    })

    return { success: true, ...result }
}

/**
 * Permanent rejection: the project can never be shipped again. approvedSeconds
 * is bumped since there's no future ship event that could "reclaim" these hours.
 */
export async function permRejectProject(shipEventId: number, reviewerNote?: string, auditNote?: string) {
    const session = await requireAnyRole(["reviewer"])

    const shipEvent = await db.query.shipEvents.findFirst({ where: eq(shipEvents.id, shipEventId) })

    if (!shipEvent) return { success: false, error: 'ship event not found' }
    if (shipEvent.approvalStatus === 'perm_rejected') return { success: false, error: 'already permanently rejected' }

    const result = await db.transaction(async (tx) => {
        const [updatedShipEvent] = await tx
            .update(shipEvents)
            .set({
                approvalStatus: "perm_rejected",
                reviewerNote: reviewerNote ?? shipEvent.reviewerNote,
                auditNote,
                reviewedBy: session.id,
                reviewedOn: new Date()
            })
            .where(eq(shipEvents.id, shipEventId))
            .returning()

        const [updatedProject] = await tx
            .update(projects)
            .set({
                approvedSeconds: sql`${projects.approvedSeconds} + ${shipEvent.seconds}`,
                recentShipStatus: 'perm_rejected'
            })
            .where(eq(projects.id, shipEvent.projectId))
            .returning()

        return { updatedShipEvent, updatedProject }
    })

    await addLog({
        title: 'Ship Event Permanently Rejected',
        description: 'A ship event was permanently rejected; project can no longer be shipped',
        location: '/projects/approve',
        type: 'ship_event_perm_rejected',
        metadata: `shipEventId: ${shipEvent.id}, reviewerId: ${session.id}`,
        userId: shipEvent.userId
    })

    return { success: true, ...result }
}