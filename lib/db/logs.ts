import { db } from "@/db";
import { logs } from "@/db/schema";
import { randomUUID } from "crypto";
import { auth } from "../auth";
import { headers } from "next/headers";

interface addLog {
  title: string;
  description: string;
  location: string;
  type: string;
  metadata: string;
}

export async function addLog({
  title,
  description,
  location,
  type,
  metadata='',
}: addLog) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = session.user.id;

  await db.insert(logs).values({
    id: randomUUID(),
    title,
    description,
    location,
    userId: userId,
    type,
    metadata,
  });
}
