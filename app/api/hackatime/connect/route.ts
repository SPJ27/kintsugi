import { auth } from "@/lib/auth";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { randomBytes } from "crypto";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }

  const state = randomBytes(16).toString("hex");

  (await cookies()).set("hackatime_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10,
    path: "/",
  });

  const params = new URLSearchParams({
    client_id: process.env.HACKATIME_CLIENT_ID!,
    redirect_uri: `${process.env.HACKATIME_REDIRECT_URI}`,
    response_type: "code",
    scope: "profile read",
    state,
  });

  redirect(`https://hackatime.hackclub.com/oauth/authorize?${params.toString()}`);
}