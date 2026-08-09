import { db } from "@/db";
import { user, account, logs } from "@/db/schema";
import { randomUUID } from "crypto";
import { eq, and } from "drizzle-orm";
import { addLog } from "./db/logs";

export async function syncHackClubUser(userId: string) {
  const hackclubAccount = await db.query.account.findFirst({
    where: and(
      eq(account.userId, userId),
      eq(account.providerId, "hackclub")
    ),
  });

  if (!hackclubAccount?.accessToken) return;
  console.log(hackclubAccount.accessToken)
  const response = await fetch(
    "https://auth.hackclub.com/oauth/userinfo",
    {
      headers: {
        Authorization: `Bearer ${hackclubAccount.accessToken}`,
      },
    }
  );

  console.log(response)
  const profile = await response.json();
  console.log('here2')

  await db
    .update(user)
    .set({
      verificationStatus: profile.verification_status,
      slackId: profile.slack_id,
    })
    .where(eq(user.id, userId));

  await addLog({
    title: 'User Login',
    description: 'User Logged In',
    location: '/',
    type: 'Auth',
    metadata: '',
    userId
  })
}