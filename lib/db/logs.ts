import { db } from "@/db";
import { logs } from "@/db/schema";
import { randomUUID } from "crypto";
import { auth } from "../auth";
import { headers } from "next/headers";

interface newLog {
  title: string;
  description: string;
  location: string;
  type: string;
  metadata: string;
  userId: string
}

export async function addLog({
  title,
  description,
  location,
  type,
  metadata='',
  userId
}: newLog) {

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
