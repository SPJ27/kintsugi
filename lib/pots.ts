import { db } from "@/db";
import { user, transactions } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { randomUUID } from "crypto";

type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0];
type DbOrTx = typeof db | Tx;

export async function awardPots(
    dbOrTx: DbOrTx,
    userId: string | null,
    pots: number,
    title: string,
    type: string,
    isGoldenPot: boolean = false,
    metadata?: string,
) {
    if (!userId || pots <= 0) return;

    const [updatedUser] = await dbOrTx
        .update(user)
        .set({
            pots: sql`${user.pots} + ${pots}`,
            ...(isGoldenPot ? { goldenPots: sql`${user.goldenPots} + 1` } : {}),
        })
        .where(eq(user.id, userId))
        .returning();

    await dbOrTx.insert(transactions).values({
        id: randomUUID(),
        title,
        type,
        potsAwarded: pots,
        metadata,
        userId,
    });

    return updatedUser;
}