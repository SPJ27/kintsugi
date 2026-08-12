import { db } from "@/db";
import { account, user } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export async function addHackatimeToken(userId: string, token: string) {
  const existing = await db.query.account.findFirst({
    where: and(eq(account.userId, userId), eq(account.providerId, "hackatime")),
  });

  if (existing) {
    await db
      .update(account)
      .set({ accessToken: token, updatedAt: new Date() })
      .where(eq(account.id, existing.id));
  } else {
    await db.insert(account).values({
      id: randomUUID(),
      accountId: userId,
      providerId: "hackatime",
      userId,
      accessToken: token,
    });
    await db.update(user).set({hackatimeLinked: true}).where(eq(user.id, userId))
  }
}

export async function getHackatimeToken(userId: string) {
  const hackatimeAccount = await db.query.account.findFirst({
    where: and(eq(account.userId, userId), eq(account.providerId, "hackatime")),
  });

  return hackatimeAccount?.accessToken ?? null;
}
