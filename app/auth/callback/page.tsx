import { auth } from "@/lib/auth";
import { syncHackClubUser } from "@/lib/sync-hc";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CallbackPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  await syncHackClubUser(session.user.id);

  redirect("/");
}