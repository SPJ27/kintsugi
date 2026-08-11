import { auth } from "@/lib/auth";
import { syncHackClubUser } from "@/lib/sync-hc";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

const SYNC_COOLDOWN_MS = 60_000;

export default async function CallbackPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/");
  }

  const userId = session.user.id;

  const existing = await db.query.user.findFirst({
    where: eq(user.id, userId),
    columns: { lastSyncedAt: true },
  });

  const isStale =
    !existing?.lastSyncedAt ||
    Date.now() - existing.lastSyncedAt.getTime() > SYNC_COOLDOWN_MS;

  if (isStale) {
    try {
      await syncHackClubUser(userId);
      await db
        .update(user)
        .set({ lastSyncedAt: new Date() })
        .where(eq(user.id, userId));
    } catch (err) {
      console.error("Hack Club sync failed:", err instanceof Error ? err.message : err);
    }
  }

  redirect("/user");
}