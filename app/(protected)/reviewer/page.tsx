import { db } from "@/db";
import { shipEvents } from "@/db/schema";
import { getSlackProfile, requireRole } from "@/lib/auth-guard";
import { and, eq, ne, not } from "drizzle-orm";
import { Kalam } from "next/font/google";
import Link from "next/link";

const kalamFont = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export default async function Page() {
  const session = await requireRole("reviewer");

  const shippedProjects = await db.query.shipEvents.findMany({
    where: and( eq(shipEvents.approvalStatus, "pending")),
    // where: and( eq(shipEvents.approvalStatus, "pending"), ne(shipEvents.userId, session.id), eq(shipEvents.needsSecondPass, false)), //MAKE SURE TO SWITCH TO THIS BEFORE STARTING (IMP.)
    with: { project: true, user: true },
  });

  const slackProfiles = await Promise.all(
    shippedProjects.map((ship) =>
      ship.user?.slackId
        ? getSlackProfile(ship.user.slackId)
        : Promise.resolve(null),
    ),
  );

  const profileByShipId = new Map(
    shippedProjects.map((ship, i) => [ship.id, slackProfiles[i]]),
  );

  return (
    <div className={`min-h-screen px-6 py-10 sm:px-10 ${kalamFont.className}`}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold uppercase tracking-tight text-[#2A1A08]">
            Reviewer
          </h1>
          <p className="mt-1 text-lg text-[#C4B282]">
            {shippedProjects.length}{" "}
            {shippedProjects.length === 1 ? "ship" : "ships"} pending review
          </p>
        </div>

        {shippedProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-sm border-2 border-dashed border-[#c9a030] bg-[#FDF2CB] px-6 py-16 text-center text-[#C4B282] text-2xl">
            No pending ships
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {shippedProjects.map((ship) => {
              const profile = profileByShipId.get(ship.id);
              return (
                <Link
                  href={`/reviewer/${ship.id}`}
                  key={ship.id}
                  className="rounded-sm border-2 border-dashed border-[#c9a030] bg-[#2A1A08] px-6 py-5 shadow-sm transition-colors hover:bg-[#3A2C10]"
                >
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                    <h2 className="text-2xl text-[#F5E4B0]">
                      {ship.project?.name ?? "Untitled project"}
                    </h2>
                    <div className="flex flex-col items-end gap-2">
                      <span className="inline-flex items-center whitespace-nowrap rounded-full border border-[#453416] bg-[#3A2C10] px-3 py-0.5 text-sm text-[#C4B282]">
                        {(ship.seconds / 3600).toFixed(1)}h shipped
                      </span>
                      {profile ? (
                        <div className="flex items-center gap-2">
                          {profile.image && (
                            <img
                              src={profile.image}
                              alt={profile.name}
                              className="h-6 w-6 rounded-full border border-[#453416]"
                            />
                          )}
                          <span className="text-sm text-[#C4B282]">
                            {profile.name}
                          </span>
                        </div>
                      ) : (
                        ship.user?.slackId && (
                          <span className="text-sm text-[#69583C]">
                            {ship.user.slackId}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {ship.project?.description && (
                    <p className="mb-4 text-base text-[#C4B282]">
                      {ship.project.description}
                    </p>
                  )}

                  {ship.shipText && (
                    <p className="mb-4 text-base italic text-[#69583C]">
                      &ldquo;{ship.shipText}&rdquo;
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-[#453416] pt-3">
                    <span className="text-sm text-[#69583C]">
                      Shipped {ship.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
