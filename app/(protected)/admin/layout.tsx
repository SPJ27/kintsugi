import { requireRole } from "@/lib/auth-guard";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  await requireRole("admin");
  return <div>{children}</div>;
};

export default layout;
