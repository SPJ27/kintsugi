import { db } from '@/db'
import { getCommits } from '@/lib/github'
import { shipEvents } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import {ReviewPanel} from '../components/ReviewForm'

const page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params
  const shipEvent = await db.query.shipEvents.findFirst({
    where: eq(shipEvents.id, id),
    with: { project: true, user: true },
  })

  if (!shipEvent) notFound()

  const project = shipEvent.project
  const repoUrl = project?.projectRepo
  const demoUrl = project?.projectDemo
  const commits = repoUrl ? await getCommits(repoUrl, project.hackatimeProjects) : null
  console.log(shipEvent)

  return (
    <ReviewPanel shipEvent={shipEvent}/>
    )
}

export default page