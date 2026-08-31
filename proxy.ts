import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/api/auth/get-session" &&
    request.headers.get("sec-fetch-mode") === "navigate"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/auth/get-session"],
};