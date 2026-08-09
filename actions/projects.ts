'use server'
import { db } from "@/db";
import { projects } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function createNewProject(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const name = formData.get("name") as string;
  const description = (formData.get("desc") as string) || null;
  const projectDemo = (formData.get("projectDemo") as string) || null;
  const projectRepo = (formData.get("projectRepo") as string) || null;
  const bannerUrl = (formData.get("bannerUrl") as string) || null;
  const hackatimeProjects = formData.getAll("hackatimeProjects") as string[];

  if (!name) {
    throw new Error("Project name is required");
  }

  const [newProject] = await db
    .insert(projects)
    .values({
      name,
      description,
      projectDemo,
      projectRepo,
      bannerUrl,
      hackatimeProjects,
      userId: session.user.id, 
    })
    .returning();

  return newProject;
}