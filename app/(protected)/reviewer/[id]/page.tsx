import { db } from '@/db'
import { shipEvents } from '@/db/schema'
import { eq } from 'drizzle-orm'
import React from 'react'

const page = async ({params}:{params: Promise<{id: number}>}) => {
    const {id} = await params
    const shipEvent = await db.query.shipEvents.findFirst({where: eq(shipEvents.id, id), with: {project: true, user: true}})
    console.log(shipEvent) 
  return (
    <div>page</div>
  )
}

export default page