import { db } from "@/db";
import { requireAuth } from "./auth-guard";
import { and, eq } from "drizzle-orm";
import { account } from "@/db/schema";
import { getHackatimeToken } from "./db/user";

export async function getHackatimeProjects() {

  const session = await requireAuth();
  const userId = session.user.id;

  const hackatimeToken = await getHackatimeToken(userId);
  if (!hackatimeToken) {
    return { success: false, error: "Unable to fetch Hackatime Data" };
  }
  const res = await fetch(
    "https://hackatime.hackclub.com/api/v1/authenticated/projects?include_archived=false&projects=&since=&until=&until_date=&start=&end=&start_date=&end_date=",
    {
      headers: {
        Authorization: `Bearer ${hackatimeToken}`,
      },
    },
  );
  if (!res.ok) {
    console.error(await res.text())
    return {success: false}
  }
  const projects = await res.json()
  return {success: true, projects}
  
}
