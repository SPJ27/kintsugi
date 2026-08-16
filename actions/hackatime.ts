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
    let response: Response;
    try {
        response = await fetch(
            "https://hackatime.hackclub.com/api/v1/authenticated/projects",
            {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
                cache : "no-store",
            },
        );
    } catch {
        return {
            success: false,
            error: "Unable to reach Hackatime. Please try again.",
            projects: [],
        };
    }
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
        projects : data.projects ?? []
    }
}
