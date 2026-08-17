import Link from "next/link";
import { Kalam, Rubik_Wet_Paint } from "next/font/google";
import { requireAuth } from "@/lib/auth-guard";
import { db } from "@/db";
import { desc, eq } from "drizzle-orm";
import { projects } from "@/db/schema";
import Image from "next/image";
import { getHackatimeProjects } from "@/lib/hackatime";
import { div } from "framer-motion/client";
import { ArrowRight, Pencil, ShipIcon, TrashIcon } from "lucide-react";
import ProjectCard from "./new/components/ProjectCard";


const kalam = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
})
const rubiks_Wet_Paint = Rubik_Wet_Paint({
    subsets: ['latin'],
    weight: "400"
})
export default async function page() {
    const session = await requireAuth();
    const userProjects = await db.query.projects.findMany({
        where: eq(projects.userId, session.id),
        orderBy: [desc(projects.createdAt)]
    })
    const hackatimeResult = await getHackatimeProjects();
    const hackatimeProjects = hackatimeResult.success ? hackatimeResult.projects : [];
    return (
        <div className={`${kalam.className} flex flex-col gap-8`}>
            <div className="relative mb-12">
                <h1 className={`absolute left-[7px]  top-[1.5px] text-center select-none text-6xl leading-none tracking-[2px] text-[#1a1209] ${rubiks_Wet_Paint.className}`}>MY PROJECTS</h1>
                <h1 className={`absolute select-none text-center text-6xl translate-x-1 leading-none tracking-[2px] text-[#f0c14d] ${rubiks_Wet_Paint.className}  [-webkit-text-stroke:0.7px_#1a1209]`}>MY PROJECTS</h1>
            </div>
            <div className="w-full flex justify-center items-center">
                <Link href={'/user/projects/new'} className="w-[940px] mt-4 shadow-[3px_5px_0_rgba(26,18,9,0.18)] gap-4 py-4 flex cursor-pointer border-[#c9a030] font-medium justify-center text-[#c9a030] items-center bg-[#2A1A08] border-4 border-dashed rounded-2xl uppercase text-4xl">
                    <span className="text-5xl">+</span> Create Project
                </Link>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center w-full">
                {userProjects.map((project)=>(
                    <ProjectCard 
                    key={project.id}
                    project={project}
                    hackatimeProjects={hackatimeProjects}
                    />
                ))}
            </div>
        </div>
    )
}
