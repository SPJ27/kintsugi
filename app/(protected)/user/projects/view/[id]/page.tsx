import { getProject } from "@/actions/projects";
import { Hammer, Pencil, Ship } from "lucide-react";
import { Rubik_Wet_Paint, Kalam } from "next/font/google";
import Image from "next/image";
import { notFound } from "next/navigation";
import DeleteButton from "../../../../../components/projects/DeleteButton";
import Link from "next/link";
import DeleteProject from "../../../../../components/projects/DeleteProject";
import { getHackatimeProjects } from "@/lib/hackatime";
import { getShipStatusLabel, ShipStatus } from "@/lib/ship-status";
import UnShipButton from "../../../../../components/projects/UnShipButon";
import HideEditButton from "../../../../../components/projects/HideEditButton";
import HideDeleteButton from "../../../../../components/projects/HideDeleteButton";
import ReviewTimeLine from "../../../../../components/projects/ReviewTimeLine";
import { getSlackProfile, requireAuth } from "@/lib/auth-guard";

const rubik_Wet_Paint = Rubik_Wet_Paint({
  subsets: ["latin"],
  weight: ["400"],
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

type ProjectCardProps = {
  project: any;
  hackatimeProjects: any[];
};

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await getProject(Number(id));

  if (!result.success || !result.project) {
    notFound();
  }

  const project = result.project;

  const hackatimeResult = await getHackatimeProjects();
  const hackatimeProjects = hackatimeResult.success
    ? hackatimeResult.projects
    : [];

  const session = await requireAuth();

  const isCurrentUsers = project?.userId === session.id;

  const shipStatus = project?.recentShipStatus;
  const isPending = shipStatus === "pending";
  const isPermRejected = shipStatus === "perm_rejected";

  const cannotEditOrDelete = isPending || isPermRejected;

  const ShipStatusLabel = shipStatus
    ? getShipStatusLabel(shipStatus as ShipStatus)
    : {
        label: "NOT SHIPPED",
        className: "bg-[#fff9e8] text-[#6b5a32] border-[#c9a030]",
      };
  const projectCreatedBy = await getSlackProfile(project?.user?.slackId || "");
  console.log("p", projectCreatedBy);
  return (
    <>
      <div
        className={`${kalam.className} w-full h-[89vh] flex flex-col rounded-[20px] border-[4px] shadow-[3px_5px_0_rgba(26,18,9,0.18)] border-[#24221C] bg-[#e8b93f] p-4`}
      >
        <div className="absolute left-40 top-12 z-2 -rotate-12 pointer-events-none border border-[#d2b432] bg-[#FFF4968A] w-30 h-8" />

        <div className="relative h-full w-full overflow-y-auto scrollbar-none px-12 py-12 rounded-[20px] border-[3px] bg-[#fff9e8] border-[#24221C]">
          <div className="relative h-24">
            <h1
              className={`absolute left-[7px] top-[4px] text-center select-none text-4xl sm:text-6xl leading-none tracking-[2px] text-[#1a1209] ${rubik_Wet_Paint.className}`}
            >
              {project.name}
            </h1>

            <div
              className={`absolute flex gap-2 items-center translate-x-2 text-center select-none text-4xl md:text-6xl leading-none tracking-[2px] text-[#f0c14d] ${rubik_Wet_Paint.className} [-webkit-text-stroke:0.7px_#1a1209]`}
            >
              {project.name}
              {session.role.includes("admin") && (
                <Link href={`/admin/projects/${project.id}`}>
                  {" "}
                  <Hammer className="border-[#c9a030] text-black border bg-[#fdf0c2] p-1" />
                </Link>
              )}
            </div>
          </div>

          {isCurrentUsers &&
            (isPending ? (
              <UnShipButton projectId={project.id} />
            ) : isPermRejected ? (
              <div
                className="absolute right-4 top-4 cursor-not-allowed rounded-md border-3 border-[#c9a030] bg-[#2A1A08] px-4 py-2 opacity-50"
                title="This project has been permanently rejected and cannot be shipped"
              >
                <Ship size={24} className="text-[#c9a030]" strokeWidth={2.5} />
              </div>
            ) : (
              <Link
                href={`/user/projects/ship/${id}`}
                className="absolute right-4 top-4 rounded-md border-3 border-[#c9a030] bg-[#2A1A08] px-4 py-2"
              >
                <Ship size={24} className="text-[#c9a030]" strokeWidth={2.5} />
              </Link>
            ))}

          <div className="relative h-100 w-full shrink-0 overflow-hidden rounded-md border-4">
            {project.bannerUrl ? (
              <Image
                src={project.bannerUrl}
                alt={project.name}
                fill
                className="absolute object-contain"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#fdf0c2] text-center text-xl">
                No Banner
              </div>
            )}
          </div>

          <div className="mt-3 text-3xl font-bold text-[#2A1A08]">
            Description
          </div>

          <div className="my-4 rounded-md border-2 border-[#c9a030] bg-[#fdf0c2] px-4 py-4 text-xl font-medium text-[#2A1A08] outline-none transition-all duration-300 ease-out">
            {project.description || "No Description added yet"}
          </div>
          <div className="mt-3 text-lg font-bold flex gap-2 text-[#161008] mb-3">
            <Image
              alt="Profile Picture"
              src={projectCreatedBy?.image || ""}
              width={30}
              height={10}
              className="rounded-full border-2 border-[#c9a030]"
            />
            by {projectCreatedBy?.name}
            {session.role.includes("admin") && (
              <Link href={`/admin/users/${project.user.slackId}`}>
                {" "}
                <Hammer className="border-[#c9a030] border bg-[#fdf0c2] p-1" />
              </Link>
            )}
          </div>
          {isCurrentUsers &&
            (() => {
              const totalSeconds = project.hackatimeProjects.reduce(
                (total: number, projectName: string) => {
                  const hackatimeProject = hackatimeProjects.find(
                    (p: { name: string; total_seconds?: number }) =>
                      p.name === projectName,
                  );

                  return total + (hackatimeProject?.total_seconds ?? 0);
                },
                0,
              );

              const unshippedSeconds = totalSeconds - project.approvedSeconds;
              const unshippedHours = Math.floor(unshippedSeconds / 3600);
              const unshippedMinutes = Math.floor(
                (unshippedSeconds % 3600) / 60,
              );

              const estimatedPoints = unshippedHours * 5;

              return (
                <div className="mb-1 flex h-12 w-fit items-center justify-center whitespace-nowrap rounded-2xl text-neutral-600 text-md ">
                  {unshippedHours}h {unshippedMinutes}m since last ship ~{" "}
                  {estimatedPoints} estimated pots
                </div>
              );
            })()}
          <div className="flex items-center overflow-x-auto text-center">
            <div className="flex items-center gap-2"></div>

            {isCurrentUsers && (
              <div>
                {(() => {
                  const totalSeconds = project.hackatimeProjects.reduce(
                    (total: number, projectName: string) => {
                      const hackatimeProject = hackatimeProjects.find(
                        (p: { name: string; total_seconds?: number }) =>
                          p.name === projectName,
                      );

                      return total + (hackatimeProject?.total_seconds ?? 0);
                    },
                    0,
                  );

                  const hours = Math.floor(totalSeconds / 3600);
                  const minutes = Math.floor((totalSeconds % 3600) / 60);

                  return (
                    <div className="flex">
                      <div className="mx-2 flex h-12 items-center justify-center whitespace-nowrap rounded-2xl border-2 border-[#f0c14d] bg-[#2A1A08] px-4 py-1 text-xl text-[#f0c14d]">
                        {hours}h {minutes}m
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {project.projectDemo && (
              <div>
                <a
                  href={project.projectDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-2 flex h-12 items-center justify-center whitespace-nowrap rounded-2xl border-2 border-[#f0c14d] bg-[#2A1A08] px-4 py-1 text-xl text-[#f0c14d]"
                >
                  Demo
                </a>
              </div>
            )}

            {project.projectRepo && (
              <div>
                <a
                  href={project.projectRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-2 flex h-12 items-center justify-center whitespace-nowrap rounded-2xl border-2 border-[#f0c14d] bg-[#2A1A08] px-4 py-1 text-xl text-[#f0c14d]"
                >
                  Repo
                </a>
              </div>
            )}

            {isCurrentUsers && (
              <>
                {cannotEditOrDelete ? (
                  <HideEditButton />
                ) : (
                  <Link
                    href={`/user/projects/edit/${project.id}`}
                    className="mx-2 flex h-12 items-center justify-center whitespace-nowrap rounded-2xl border-2 border-[#f0c14d] bg-[#2A1A08] px-4 py-1 text-xl text-[#f0c14d]"
                  >
                    <Pencil />
                  </Link>
                )}

                {cannotEditOrDelete ? (
                  <HideDeleteButton />
                ) : (
                  <DeleteButton
                    projectId={project.id}
                    projectName={project.name}
                  />
                )}
              </>
            )}
            {isCurrentUsers && ShipStatusLabel && (
              <div
                className={`mx-2 flex h-12 shrink-0 items-center justify-center rounded-2xl border-2 px-4 py-1 text-md font-bold ${ShipStatusLabel.className}`}
              >
                {ShipStatusLabel.label}
              </div>
            )}
          </div>

          <div className="hidden sm:block">
            <ReviewTimeLine
              events={project.shipEvents}
              isCurrentUsers={isCurrentUsers}
              isCurrentUserAdmin={session.role.includes("admin")}
            />
          </div>
        </div>
      </div>

      <DeleteProject />
    </>
  );
}

export const metadata = {
  title: "View Project",
};
