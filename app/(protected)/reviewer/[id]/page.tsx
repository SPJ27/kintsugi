import { db } from '@/db'
import { getCommits } from '@/lib/github'
import { shipEvents } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import {ReviewPanel} from '../components/ReviewForm'
import { requireRole } from '@/lib/auth-guard'

const page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params
  const session = await requireRole('reviewer')
  const shipEvent = await db.query.shipEvents.findFirst({
    where: eq(shipEvents.id, id),
    with: { project: true, user: true },
  })

  if (!shipEvent) notFound()
  // if (!shipEvent || shipEvent.userId === session.id) notFound()

  const project = shipEvent.project
  const repoUrl = project?.projectRepo
  const demoUrl = project?.projectDemo
  const commits = repoUrl ? await getCommits(repoUrl, project.hackatimeProjects) : null
  


  return (
    <ReviewPanel shipEvent={shipEvent}/>
    )
}

export default page