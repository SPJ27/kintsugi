import { auth } from "@/lib/auth";
import { addLog } from "@/lib/db/logs";
import { addHackatimeToken } from "@/lib/db/user";
import { headers, cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  const returnedState = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(`/dashboard?hackatime_error=${error}`, req.url),
    );
  }

  const cookieStore = await cookies();
  const savedState = cookieStore.get("hackatime_oauth_state")?.value;
  cookieStore.delete("hackatime_oauth_state");

  if (!code || !returnedState || returnedState !== savedState) {
    return NextResponse.redirect(
      new URL("/dashboard?hackatime_error=invalid_state", req.url),
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
    return NextResponse.redirect(
      new URL("/dashboard?hackatime_error=token_exchange_failed", req.url),
    );
  }

  const tokenData = await tokenRes.json();

  await addHackatimeToken(session.user.id, tokenData.access_token);

  await addLog({
    title: "Hackatime Connected",
    description: "Linked to Hackatime",
    location: "/hackatime/callback",
    type: "auth",
    metadata: "",
  });

  return NextResponse.redirect(new URL("/", req.url));
}
