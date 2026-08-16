import { db } from "@/db";
import { requireAnyRole, requireAuth } from "@/lib/auth-guard";
import { projects, shipEvents, user } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { getHackatimeHours } from "@/lib/hackatime";
import { addLog } from "@/lib/db/logs";

export async function shipProject(projectId: number, shipText: string) {
    // get the total number of hours tracked via hackatime
    // total hours - approved hours
    // for example, first ship event: 0 hours approved, 20 hours on hackatime => 20 hours in the ship event
    // 10 hours approved, 15 hours on hackatime => 5 hours in the s_e
    const session = await requireAuth()
    const project = await db.query.projects.findFirst({ where: eq(projects.id, projectId) })

    if (!project) return { success: false, error: 'project not found' }
    if (project.userId !== session.id) return { success: false, error: 'not authorized to ship this project' }

    const existingPending = await db.query.shipEvents.findFirst({
        where: and(
            eq(shipEvents.projectId, projectId),
            eq(shipEvents.userId, session.id),
            eq(shipEvents.approvalStatus, "pending"),
        ),
    })

    if (existingPending) {
        return { success: false, error: 'You already have a pending ship event for this project' }
    }


    const totalTime = await getHackatimeHours(project.hackatimeProjects)

    if (!totalTime.success || totalTime.totalSeconds == null || totalTime.totalSeconds <= 15 * 60) {
        return { success: false, error: "error" in totalTime ? totalTime.error : "Not enough tracked time to ship" }
    }

    const approvedSeconds = project.approvedSeconds ?? 0
    const newSeconds = totalTime.totalSeconds - approvedSeconds

    if (newSeconds <= 0) {
        return { success: false, error: 'No new tracked time since last ship' }
    }

    const [shipEvent] = await db
        .insert(shipEvents)
        .values({
            projectId: project.id,
            userId: session.id,
            shipText,
            seconds: newSeconds,
            approvalStatus: "pending",
        })
        .returning()
    
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


export async function approveProject(shipEventId: number, reviewerNote?: string) {
    // set the ship event to approved
    // on projects, set the total approved to ship_event_hours + prev
    // add the amount to balance
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
            })
            .where(eq(shipEvents.id, shipEventId))
            .returning()

        const [updatedProject] = await tx
            .update(projects)
            .set({
                approvedSeconds: sql`${projects.approvedSeconds} + ${shipEvent.seconds}`,
            })
            .where(eq(projects.id, shipEvent.projectId))
            .returning()

        const [updatedUser] = await tx
            .update(user)
            .set({
                pots: sql`${user.pots} + ${shipEvent.seconds}`,
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