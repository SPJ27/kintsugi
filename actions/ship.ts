'use server'
import { db } from "@/db";
import { requireAnyRole, requireAuth } from "@/lib/auth-guard";
import { projects, shipEvents, user } from "@/db/schema";
import { and, eq, isNull, sql } from "drizzle-orm";
import { getHackatimeHours } from "@/lib/hackatime";
import { addLog } from "@/lib/db/logs";

export async function shipProject(
    projectId: number,
    shipText: string,
    selectedProjects: string[],
    projectDetails: {
        name: string;
        description: string;
        projectRepo: string;
        projectDemo: string;
    }
) {
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
            .set({
                recentShipStatus: 'pending',
                name: projectDetails.name,
                description: projectDetails.description,
                projectRepo: projectDetails.projectRepo,
                projectDemo: projectDetails.projectDemo,
                hackatimeProjects: selectedProjects,
            })
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

async function awardPots(userId: string | null, pots: number) {
    if (!userId || pots <= 0) return
    await db.update(user).set({ pots: sql`${user.pots} + ${pots}` }).where(eq(user.id, userId))
}

/*
When first check is done - change first pass approval status, first pass reviewer note, first pass audit note
When second check is done - replace approval status, reviewer note and audit note with ^^
Also, set recvent ship status to approval status, award pots
*/

async function assertFirstPassEligible(shipEvent: typeof shipEvents.$inferSelect) {
    if (shipEvent.approvalStatus !== 'pending') {
        return 'this ship event has already been finalized'
    }
    if (shipEvent.firstPassApprovalStatus !== 'pending') {
        return 'first pass review has already been completed for this ship event'
    }
    return null
}

export async function firstPassApprove(shipEventId: number, approvedSeconds?: number, reviewerNote?: string, auditNote?: string,) {
    const session = await requireAnyRole(["reviewer"])
    const shipEvent = await db.query.shipEvents.findFirst({ where: eq(shipEvents.id, shipEventId) })
    if (!shipEvent) return { success: false, error: 'ship event not found' }

    const err = await assertFirstPassEligible(shipEvent)
    if (err) return { success: false, error: err }

    const [updated] = await db
        .update(shipEvents)
        .set({
            approvedSeconds,
            firstPassApprovalStatus: "approved",
            firstPassReviewerNote: reviewerNote,
            firstPassAuditNote: auditNote,
            firstPassReviewedBy: session.id,
            firstPassReviewedOn: new Date(),
            needsSecondPass: true
        })
        .where(eq(shipEvents.id, shipEventId))
        .returning()

    await addLog({
        title: 'Ship Event First Pass: Approved',
        description: 'First pass review marked this ship event as approved, pending confirmation',
        location: '/projects/approve',
        type: 'ship_event_first_pass_approved',
        metadata: `shipEventId: ${shipEvent.id}, reviewerId: ${session.id}`,
        userId: shipEvent.userId
    })

    return { success: true, shipEvent: updated }
}

export async function firstPassRequestChanges(shipEventId: number, reviewerNote?: string, auditNote?: string) {
    const session = await requireAnyRole(["reviewer"])
    const shipEvent = await db.query.shipEvents.findFirst({ where: eq(shipEvents.id, shipEventId) })
    if (!shipEvent) return { success: false, error: 'ship event not found' }

    const err = await assertFirstPassEligible(shipEvent)
    if (err) return { success: false, error: err }

    const [updated] = await db
        .update(shipEvents)
        .set({
            firstPassApprovalStatus: "changes_requested",
            firstPassReviewerNote: reviewerNote,
            firstPassAuditNote: auditNote,
            firstPassReviewedBy: session.id,
            firstPassReviewedOn: new Date(),
            needsSecondPass: true

        })
        .where(eq(shipEvents.id, shipEventId))
        .returning()

    await addLog({
        title: 'Ship Event First Pass: Changes Requested',
        description: 'First pass review requested changes, pending confirmation',
        location: '/projects/approve',
        type: 'ship_event_first_pass_changes_requested',
        metadata: `shipEventId: ${shipEvent.id}, reviewerId: ${session.id}`,
        userId: shipEvent.userId
    })

    return { success: true, shipEvent: updated }
}

export async function firstPassPermReject(shipEventId: number, reviewerNote?: string, auditNote?: string) {
    const session = await requireAnyRole(["reviewer"])
    const shipEvent = await db.query.shipEvents.findFirst({ where: eq(shipEvents.id, shipEventId) })
    if (!shipEvent) return { success: false, error: 'ship event not found' }

    const err = await assertFirstPassEligible(shipEvent)
    if (err) return { success: false, error: err }

    const [updated] = await db
        .update(shipEvents)
        .set({
            firstPassApprovalStatus: "perm_rejected",
            firstPassReviewerNote: reviewerNote,
            firstPassAuditNote: auditNote,
            firstPassReviewedBy: session.id,
            firstPassReviewedOn: new Date(), needsSecondPass: true

        })
        .where(eq(shipEvents.id, shipEventId))
        .returning()

    await addLog({
        title: 'Ship Event First Pass: Perm Rejected',
        description: 'First pass review marked this ship event as permanently rejected, pending confirmation',
        location: '/projects/approve',
        type: 'ship_event_first_pass_perm_rejected',
        metadata: `shipEventId: ${shipEvent.id}, reviewerId: ${session.id}`,
        userId: shipEvent.userId
    })

    return { success: true, shipEvent: updated }
}

/**
 * Second pass. Copies the first-pass decision into the final fields and
 * applies the real side effects (approvedSeconds, pots, project status).
 * Must be a different reviewer than whoever did the first pass.
 */
type ReviewDecision = 'approved' | 'changes_requested' | 'perm_rejected'

export async function confirmReview(
    shipEventId: number,
    decision: ReviewDecision,
    approvedSeconds: number,
    reviewerNote?: string,
    auditNote?: string
) {

    const session = await requireAnyRole(["admin"])
    const shipEvent = await db.query.shipEvents.findFirst({ where: eq(shipEvents.id, shipEventId) })

    if (!shipEvent) return { success: false, error: 'ship event not found' }
    if (shipEvent.approvalStatus !== 'pending') return { success: false, error: 'already finalized' }
    if (shipEvent.firstPassApprovalStatus === 'pending') {
        return { success: false, error: 'first pass review has not been completed yet' }
    }
    // if (shipEvent.firstPassReviewedBy === session.id) {
    //     return { success: false, error: 'second pass must be completed by a different reviewer than the first pass' }
    // }
    if (shipEvent.firstPassApprovalStatus === 'perm_rejected' && decision !== 'perm_rejected') {
        return { success: false, error: 'permanent rejection cannot be reversed' }
    }

    const potsToAward = decision === 'approved' ? Math.floor(approvedSeconds / 720) : 0
    const bumpsApprovedSeconds = decision === 'approved' || decision === 'perm_rejected'

    const result = await db.transaction(async (tx) => {
        const [updatedShipEvent] = await tx
            .update(shipEvents)
            .set({
                approvalStatus: decision,
                reviewerNote,
                reviewedBy: shipEvent.firstPassReviewedBy,
                auditNote,
                reviewedOn: new Date(),
                potsAwarded: potsToAward,
                secondPassReviewedBy: session.id,
                needsSecondPass: false,
                approvedSeconds
            })
            .where(eq(shipEvents.id, shipEventId))
            .returning()

        const [updatedProject] = await tx
            .update(projects)
            .set({
                recentShipStatus: decision,
                ...(bumpsApprovedSeconds
                    ? { approvedSeconds: sql`${projects.approvedSeconds} + ${shipEvent.seconds}` }
                    : {}),
            })
            .where(eq(projects.id, shipEvent.projectId))
            .returning()

        let updatedUser
        if (potsToAward > 0) {
            [updatedUser] = await tx
                .update(user)
                .set({ pots: sql`${user.pots} + ${potsToAward}` })
                .where(eq(user.id, shipEvent.userId))
                .returning()
        }

        return { updatedShipEvent, updatedProject, updatedUser }
    })

    await addLog({
        title:
            `Ship Event Confirmed: ${decision}`,
        description:
            'Second pass review confirmed the first pass decision as-is',
        location: '/projects/approve',
        type: 'ship_event_confirmed',
        metadata: `shipEventId: ${shipEvent.id}, reviewerId: ${session.id}, decision: ${decision}, firstPassDecision: ${shipEvent.firstPassApprovalStatus}`,
        userId: shipEvent.userId
    })
    await awardPots(session.id, 1)
    await awardPots(shipEvent.firstPassReviewedBy, 1)
    return { success: true, ...result }
}