"use server";

import { db } from "@/db";
import { getSlackProfile } from "@/lib/auth-guard";

export type UserRow = {
  id: string;
  email: string;
  slackId: string | null;
  role: string[];
  slackName: string | null;
  slackImage: string | null;
};

export async function getUsers(query?: string): Promise<UserRow[]> {
  const users = await db.query.user.findMany();

  const slackProfiles = await Promise.all(
    users.map((user) =>
      user.slackId ? getSlackProfile(user.slackId) : Promise.resolve(null)
    )
  );

  const rows: UserRow[] = users.map((user, i) => {
    const profile = slackProfiles[i];
    return {
      id: user.id,
      email: user.email,
      slackId: user.slackId ?? null,
      role: user.role,
      slackName: profile?.name ?? null,
      slackImage: profile?.image ?? null,
    };
  });

  const q = (query ?? "").trim().toLowerCase();
  if (!q) return rows;

  return rows.filter((row) => {
    const haystack = [row.email, row.slackId, row.id, row.slackName, ...row.role]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}