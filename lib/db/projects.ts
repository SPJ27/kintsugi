import { db } from "@/db";

export async function getAllProjectsByUser(UserID: string){
    const data = await db.query.projects.findMany({
        where: ((project, {eq})=>eq(project.userId, UserID))
        ,
        with: {
            user: true
        }
    })
    return data
}