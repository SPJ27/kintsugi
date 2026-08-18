import { requireAuth } from "./auth-guard";
import { getHackatimeToken } from "./db/user";

export async function getHackatimeProjects() {

  const session = await requireAuth();
  const userId = session.id;

  const hackatimeToken = await getHackatimeToken(userId);
  if (!hackatimeToken) {
    return { success: false, error: "Unable to fetch Hackatime Data" };
  }
  const res = await fetch(
    "https://hackatime.hackclub.com/api/v1/authenticated/projects?include_archived=false&projects=&since=&until=&until_date=&start=&end=&start_date=&end_date=",
    {
      headers: {
        Authorization: `Bearer ${hackatimeToken}`,
      },
    },
  );
  if (!res.ok) {
    console.error(await res.text())
    return { success: false }
  }
  const data = await res.json();
  const projects = Array.isArray(data?.projects)
    ? data.projects
    : Array.isArray(data)
      ? data
      : [];

  return { success: true, projects };

}

export async function getHackatimeHours(hackatimeProjects: string[]) {

  const session = await requireAuth();
  const userId = session.id;

  const hackatimeToken = await getHackatimeToken(userId);

  if (!hackatimeToken) {
    return { success: false, error: "Unable to fetch Hackatime Data" };
  }
  const res = await fetch(
    "https://hackatime.hackclub.com/api/v1/authenticated/projects?include_archived=false&projects=&since=&until=&until_date=&start=&end=&start_date=&end_date=",
    {
      headers: {
        Authorization: `Bearer ${hackatimeToken}`,
      },
    },
  );
  if (!res.ok) {
    console.error(await res.text())
    return { success: false }
  }
  const data = await res.json()

  const allProjects: { name: string; total_seconds: number; archived: boolean }[] =
    data.projects ?? data;

  const filteredProjects = allProjects.filter((project) =>
    hackatimeProjects.includes(project.name)
  );

  const totalSeconds = filteredProjects.reduce(
    (sum, project) => sum + (project.total_seconds ?? 0),
    0
  );

  return {
    success: true,
    projects: filteredProjects,
    totalSeconds,
    totalHours: totalSeconds / 3600,
  };

}
