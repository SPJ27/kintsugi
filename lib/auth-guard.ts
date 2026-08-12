import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers"
import { cache } from "react";
import { getHackatimeProjects } from "./hackatime";

const getSession = cache(async ()=> {
    return auth.api.getSession({headers: await headers()})
})

export async function requireAuth(){
    const session = await getSession()
    
    if(!session){
        redirect('/')
    }
    return session;
}

export async function requireRole(role : string){
    const session = await requireAuth();

    if(!session.user.role?.includes(role)){
        redirect('/');
    }

    return session;
}

export async function requireAnyRole(roles:string[]) {
    const session = await requireAuth();
    const hasRole = roles.some((role)=>session.user.role?.includes(role));
    if(!hasRole){
        redirect('/');
    }
    return session;
}