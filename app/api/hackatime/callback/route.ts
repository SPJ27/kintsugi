import { auth } from "@/lib/auth";
import { requireAuth } from "@/lib/auth-guard";
import { addLog } from "@/lib/db/logs";
import { addHackatimeToken } from "@/lib/db/user";
import { headers, cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await requireAuth();
  const dashboardUrl = new URL("/user", req.url);

  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  const returnedState = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    dashboardUrl.searchParams.set("hackatime_error", error);
    return NextResponse.redirect(
      dashboardUrl,
    );
  }

  const cookieStore = await cookies();
  const savedState = cookieStore.get("hackatime_oauth_state")?.value;
  cookieStore.delete("hackatime_oauth_state");

  if (!code || !returnedState || returnedState !== savedState) {
    dashboardUrl.searchParams.set("hackatime_error", "invalid_state");
    return NextResponse.redirect(
      dashboardUrl,
    );
  }

  const tokenRes = await fetch("https://hackatime.hackclub.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.HACKATIME_CLIENT_ID!,
      client_secret: process.env.HACKATIME_CLIENT_SECRET!,
      code,
      redirect_uri: `${process.env.HACKATIME_REDIRECT_URI}`,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    const errText = await tokenRes.text();
    console.log("Token exchange failed:", tokenRes.status, errText);
    dashboardUrl.searchParams.set("hackatime_error", "token_exchange_failed");
    return NextResponse.redirect(
      dashboardUrl,
    );
  }

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    dashboardUrl.searchParams.set("hackatime_error", "missing_token");
    return NextResponse.redirect(
      dashboardUrl,
    );
  }
  await addHackatimeToken(session.id, tokenData.access_token);

  await addLog({
    title: "Hackatime Connected",
    description: "Linked to Hackatime",
    location: "/hackatime/callback",
    type: "auth",
    metadata: "",
    userId: session.id,
  });

  return NextResponse.redirect(dashboardUrl);
}
