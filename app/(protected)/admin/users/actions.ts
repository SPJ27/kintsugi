"use server";

import { db } from "@/db";
import { getSlackProfile } from "@/lib/auth-guard";
import { eq } from "drizzle-orm";
import { user } from "@/db/schema";

export type UserRow = {
  id: string;
  email: string;
  slackId: string | null;
  role: string[];
  slackName: string | null;
  slackImage: string | null;
  pots: number
};

export async function getUsers(query?: string) {
  const users = await db.query.user.findMany();

  const slackProfiles = await Promise.all(
    users.map((user) =>
      user.slackId ? getSlackProfile(user.slackId) : Promise.resolve(null)
    )
  );

  const rows = users.map((user, i) => {
    const profile = slackProfiles[i];
    return {
      id: user.id,
      email: user.email,
      slackId: user.slackId ?? null,
      role: user.role,
      slackName: profile?.name ?? null,
      slackImage: profile?.image ?? null,
      pots: user.pots
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


const SLACK_ID_REGEX = /^[UW][A-Z0-9]{8,10}$/;

export async function getUserById(id: string): Promise<UserRow | null> {
  const userData = SLACK_ID_REGEX.test(id)
    ? await db.query.user.findFirst({ where: eq(user.slackId, id) })
    : await db.query.user.findFirst({ where: eq(user.id, id) });

  if (!userData) return null;

  let slackName: string | null = null;
  let slackImage: string | null = null;
  if (userData.slackId) {
    const profile = await getSlackProfile(userData.slackId);
    slackName = profile?.name ?? null;
    slackImage = profile?.image ?? null;
  }
  console.log(userData)
  return {
    id: userData.id,
    email: userData.email,
    slackId: userData.slackId ?? null,
    role: userData.role,
    pots: userData.pots,
    slackName,
    slackImage,
  };
}