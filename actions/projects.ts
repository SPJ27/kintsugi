"use server";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { requireAuth } from "@/lib/auth-guard";
import { addLog } from "@/lib/db/logs";
import { eq } from "drizzle-orm";

type CreateProjectResult =
  | { success: true; project: typeof projects.$inferSelect }
  | { success: false; error: string };

async function safeLog(params: Parameters<typeof addLog>[0]) {
  try {
    await addLog(params);
  } catch (err) {
    console.error("Failed to write log:", err);
  }
}

export async function createNewProject(
  formData: FormData,
): Promise<CreateProjectResult> {
  const session = await requireAuth();
  

  const userId = session.id;

  const name = formData.get("name") as string;
  if (!name?.trim()) {
    await safeLog({
      title: "Project Creation Failed",
      description: "Attempted to create a project without a name",
      location: "/projects/new",
      type: "error",
      metadata: "reason: missing name",
      userId,
    });
    return { success: false, error: "Project name is required." };
  }

  const description = (formData.get("desc") as string) || null;
  const projectDemo = (formData.get("projectDemo") as string) || null;
  const projectRepo = (formData.get("projectRepo") as string) || null;
  const bannerUrlInput = (formData.get("bannerUrl") as string) || null;
  const bannerFile = (formData.get("bannerFile") as File) || null;
  const hackatimeProjects = formData.getAll("hackatimeProjects") as string[];

  let bannerUrl: string | null = bannerUrlInput;

  if (bannerFile && bannerFile.size > 0) {
    const bannerForm = new FormData();
    bannerForm.append("file", bannerFile);

    const response = await fetch("https://cdn.hackclub.com/api/v4/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.CDN_KEY}` },
      body: bannerForm,
    });

    if (!response.ok) {
      const errText = await response.text();
      await safeLog({
        title: "Project Creation Failed",
        description: "Banner upload failed",
        location: "/projects/new",
        type: "error",
        metadata: `status: ${response.status}, body: ${errText}`,
        userId,
      });
      return {
        success: false,
        error: "Unable to upload the banner image. Please try again.",
      };
    }

    const data = await response.json();
    if (!data.url) {
      console.error("Banner upload returned no URL:", data);
      await safeLog({
        title: "Project Creation Failed",
        description: "Banner upload succeeded but returned no URL",
        location: "/projects/new",
        type: "error",
        metadata: JSON.stringify(data),
        userId,
      });
      return {
        success: false,
        error: "Unable to upload the banner image. Please try again.",
      };
    }
    bannerUrl = data.url;
  }

  let newProject;
  try {
    [newProject] = await db
      .insert(projects)
      .values({
        name,
        description,
        projectDemo,
        projectRepo,
        bannerUrl,
        hackatimeProjects,
        userId,
      })
      .returning();
  } catch (err) {
    console.error("Failed to insert project:", err);
    await safeLog({
      title: "Project Creation Failed",
      description: "Database insert failed",
      location: "/projects/new",
      type: "error",
      metadata: err instanceof Error ? err.message : String(err),
      userId,
    });
    return {
      success: false,
      error: "Something went wrong saving your project.",
    };
  }

  await safeLog({
    title: "Project Created",
    description: "A new project was created",
    location: "/projects/new",
    type: "project",
    metadata: `Project ID: ${newProject.id}`,
    userId,
  });

  return { success: true, project: newProject };
}

export async function getProject(projectId: number) {
  const session = await requireAuth();
  
  let data;
  try {
    data = await db.query.projects.findFirst({
      where: eq(projects.id, projectId),
    });
  } catch (err) {
    await safeLog({
      title: "Project Fetch Failed",
      description: "Unable to fetch data",
      location: `/projects/${projectId}`,
      type: "error",
      metadata: err instanceof Error ? err.message : String(err),
      userId: session.id,
    });
    return { success: false, error: "Unable to fetch project" };
  }
  const userCreated = session.id === data?.userId;
  return { success: true, project: data, userCreated };
}

