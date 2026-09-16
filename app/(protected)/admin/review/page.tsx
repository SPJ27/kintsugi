import { db } from "@/db";
import { shipEvents } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import React from "react";

const page = async () => {
  const shippedProjects = await db.query.shipEvents.findMany({
    where: and(
      eq(shipEvents.approvalStatus, "pending"),
      eq(shipEvents.needsSecondPass, true),
    ),
    with: { project: true, user: true },
  });
  console.log(shippedProjects);
  return <div>page</div>;
};

export default page;
