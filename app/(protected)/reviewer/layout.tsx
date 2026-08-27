import { requireRole } from "@/lib/auth-guard";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  await requireRole("reviewer");
  return <div>{children}</div>;
};

export default layout;
