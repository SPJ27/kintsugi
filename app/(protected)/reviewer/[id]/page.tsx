import { db } from '@/db'
import { getCommits } from '@/lib/github'
import { shipEvents } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'

function formatHours(totalHours: number) {
  const totalMinutes = Math.round(totalHours * 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) return `${minutes}m`
  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}m`
}

const page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params
  const shipEvent = await db.query.shipEvents.findFirst({
    where: eq(shipEvents.id, id),
    with: { project: true, user: true },
  })

  if (!shipEvent) notFound()

  const repoUrl = shipEvent.project?.projectRepo
  const commits = repoUrl ? await getCommits(repoUrl, shipEvent.project.hackatimeProjects) : null

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-xl font-semibold">{shipEvent.project?.name}</h1>

      {!repoUrl && <p className="text-sm text-red-500">No repo URL on this project.</p>}
      {repoUrl && commits === null && (
        <p className="text-sm text-red-500">Couldn&apos;t load commits for {repoUrl}.</p>
      )}
      {commits?.length === 0 && <p className="text-sm text-muted-foreground">No commits found.</p>}

      <div className="space-y-3">
        {commits?.map((c) => (
          <div key={c.oid} className="border rounded-lg p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium text-sm">{c.message.split('\n')[0]}</p>
              <span className="text-xs text-muted-foreground shrink-0">
                {c.oid.slice(0, 7)}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              {c.author.user?.avatarUrl && (
                <img
                  src={c.author.user.avatarUrl}
                  alt={c.author.name}
                  className="w-4 h-4 rounded-full"
                />
              )}
              <span>{c.author.user?.login ?? c.author.name}</span>
              <span>·</span>
              <span>{new Date(c.committedDate).toString()}</span>
              <span className="ml-auto flex items-center gap-1.5">
                <span className="text-green-600">+{c.additions}</span>
                <span className="text-red-600">-{c.deletions}</span>
                {c.hours && (
                  <span className="text-slate-800">{formatHours(c.hours.totalHours)}</span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page