import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handlers = toNextJsHandler(auth);

export const GET = async (req: Request) => {
  console.log("[auth GET]", new URL(req.url).pathname);
  return handlers.GET(req);
};

export const POST = async (req: Request) => {
  console.log("[auth POST]", new URL(req.url).pathname);
  return handlers.POST(req);
};