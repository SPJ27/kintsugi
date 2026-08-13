"use server";
import { requireAuth } from "@/lib/auth-guard";
import { getHackatimeToken } from "@/lib/db/user";

export async function getHackatimeProjects(){
    const session = await requireAuth();
    const token = await getHackatimeToken(session.id);
    if(!token){
        return{
            success : false,
            error : "Hackatime is not connected",
            projects : [],
        }
    }
    const response = await fetch(
            "https://hackatime.hackclub.com/api/v1/authenticated/projects",
            {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
                cache : "no-store",
            },
    );
    if(!response.ok){
        return{
            success : false,
            error : "Unable to fetch Hackatime projects",
            projects : [],
        }
    }
    const data = await response.json();
    return{
        success : true,
        projects : data.projects ??[]
    }
}