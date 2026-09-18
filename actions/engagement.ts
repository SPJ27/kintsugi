'use server'
import { db } from "@/db";
import { likes } from "@/db/schema";
import { requireAuth } from "@/lib/auth-guard";
import { and, eq } from "drizzle-orm";

export async function likeUnlike(projectId: number) {
    const session = await requireAuth()
    const hasLiked = await db.query.likes.findFirst({
        where: and(
            eq(likes.projectId, projectId),
            eq(likes.userId, session.id))
    }
    )
    if (hasLiked) {
        await db.delete(likes).where(eq(likes.id, hasLiked.id))
    }
    else {
        await db.insert(likes).values({ id: crypto.randomUUID(), projectId, userId: session.id })
    }
}