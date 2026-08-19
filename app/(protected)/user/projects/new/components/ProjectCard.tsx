'use client'
import { useDeleteModalStore } from "@/app/store/DeleteModalStore";
import { Eye, Pencil, TrashIcon } from "lucide-react";
import { Kalam, Rubik_Wet_Paint } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
const kalam = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
})
const rubiks_Wet_Paint = Rubik_Wet_Paint({
    subsets: ['latin'],
    weight: "400"
})
type ProjectCardProps = {
    project: any;
    hackatimeProjects: any[];
}
export default function ProjectCard({ project, hackatimeProjects }: ProjectCardProps) {
    const { openDeleteModal, projectName } = useDeleteModalStore()
    return (
        <>
            <div
                key={project.id}
                className={`${kalam.className} w-[940px] h-135 shadow-[3px_5px_0_rgba(26,18,9,0.18)]  flex flex-col  rounded-4xl border-[4px] shadow-[3px_5px_0_rgba(26,18,9,0.18)] border-[#24221C] bg-[#e8b93f] p-4`}
            >
                <div className="h-full overflow-y-auto w-[900px] scrollbar-none px-6 py-6 rounded-4xl border-[3px] gap-2 bg-[#fff9e8] border-[#24221C] flex flex-col">
                    <div className="flex justify-center items-center">
                        <div className="relative  w-[500px] h-64 shrink-0 overflow-hidden rounded-3xl border-4">
                            {
                                project.bannerUrl ? (
                                    <Image src={project.bannerUrl} alt={project.name} fill className="absolute object-cover" />

                                ) : (
                                    <div className="bg-[#fdf0c2] w-full h-full flex justify-center items-center text-center text-xl ">No Banner</div>
                                )
                            }
                        </div>
                    </div>
                    <div className="relative h-10 mb-2">
                        <h1 className={`absolute left-[7px]  top-[4px] text-center select-none text-4xl leading-none tracking-[2px] text-[#1a1209] ${rubiks_Wet_Paint.className}`}>{project.name}</h1>
                        <h1 className={`absolute select-none text-center text-4xl translate-x-2 leading-none tracking-[2px] text-[#f0c14d] ${rubiks_Wet_Paint.className}  [-webkit-text-stroke:0.7px_#1a1209]`}>{project.name}</h1>
                    </div>
                    <div className="flex items-center  ">
                        <div className="flex gap-2 items-center">
                            {project.hackatimeProjects?.map((hackatimeProject: any) => (
                                hackatimeProject &&
                                <div
                                    key={hackatimeProject}
                                    className=" py-1 mx-2 bg-[#2A1A08] text-xl px-4 h-12 items-center text-center justify-center flex  rounded-2xl border-2 text-[#f0c14d] border-[#f0c14d]">
                                    {hackatimeProject}
                                </div>
                            ))}
                        </div>

                        <div>{(() => {
                            const totalSeconds = project.hackatimeProjects.reduce(
                                (total: any, projectName: any) => {
                                    const hackatimeProject = hackatimeProjects.find(
                                        (p: { name: string; total_seconds?: number }) => p.name === projectName
                                    );
                                    return total + (hackatimeProject?.total_seconds ?? 0);
                                },
                                0
                            )
                            const hours = Math.floor(totalSeconds / 3600);
                            const minutes = Math.floor((totalSeconds % 3600) / 60);
                            return <div className=" py-1 mx-2 bg-[#2A1A08] text-xl px-4 h-12 items-center text-center justify-center flex  rounded-2xl border-2 text-[#f0c14d] border-[#f0c14d]">{hours}h {minutes}m</div>
                        })()}</div>
                        <div>
                            {project.projectDemo && (
                                <a href={project.projectDemo} target="_blank" rel="noopener noreferrer" className=" py-1 mx-2 bg-[#2A1A08] text-xl px-4 h-12 items-center text-center justify-center flex  rounded-2xl border-2 text-[#f0c14d] border-[#f0c14d]">Demo</a>
                            )}
                        </div>
                        <div>
                            {project.projectRepo && (
                                <a href={project.projectRepo} target="_blank" rel="noopener noreferrer" className=" py-1 mx-2 bg-[#2A1A08] text-xl px-4 h-12 items-center text-center justify-center flex  rounded-2xl border-2 text-[#f0c14d] border-[#f0c14d]">Repo</a>
                            )}
                        </div>
                        <div>
                            <Link href={`projects/view/${project.id}`} className=" py-1 mx-2 bg-[#2A1A08] text-xl px-4 h-12 items-center text-center justify-center flex  rounded-2xl border-2 text-[#f0c14d] border-[#f0c14d]">
                                <Eye />
                            </Link>
                        </div>
                        <div>
                            <Link href={`projects/edit/${project.id}`} className=" py-1 mx-2 bg-[#2A1A08] text-xl px-4 h-12 items-center text-center justify-center flex  rounded-2xl border-2 text-[#f0c14d] border-[#f0c14d]">
                                <Pencil />
                            </Link>
                        </div>
                        <div>

                            <button type="button" onClick={() => openDeleteModal(project.id, project.name)} className=" py-1 mx-2 bg-[#2A1A08] text-xl px-4 h-12 items-center text-center justify-center flex  rounded-2xl border-2 text-[#f0c14d] border-[#f0c14d]">
                                <TrashIcon />
                            </button>
                        </div>
                    </div>

                    <div className="ml-2 row-span-2 text-lg truncate">
                        {project.description || "No Description added yet."}
                    </div>

                </div>
            </div>

        </>
    )
}