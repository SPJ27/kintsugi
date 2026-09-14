import { requireRole } from "@/lib/auth-guard";
import React from "react";
import Providers from "./provider";

const layout = async ({ children }: { children: React.ReactNode }) => {
  await requireRole("admin");
  return <Providers>{children}</Providers>;
};

export default layout;
