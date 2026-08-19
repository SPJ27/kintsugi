import { getProject } from '@/actions/projects';
import { Pencil } from 'lucide-react';
import { Rubik_Wet_Paint, Kalam } from 'next/font/google';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import DeleteButton from '../components/DeleteButton';
import Link from 'next/link';
import DeleteProject from '../../new/components/DeleteProject';
import { getHackatimeProjects } from '@/lib/hackatime';
const rubik_Wet_Paint = Rubik_Wet_Paint({
    subsets: ['latin'],
    weight: ['400'],
})

const kalam = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
})
type ProjectCardProps = {
    project: any;
    hackatimeProjects: any[];
}
export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const result = await getProject(Number(id));
    if (!result.success || !result.project) {
        notFound();
    }
    const project = result.project;
    const hackatimeResult = await getHackatimeProjects()
    const hackatimeProjects = hackatimeResult.success ? hackatimeResult.projects : []
    return (
        <>
            <div className={`${kalam.className} w-full h-[89vh] shadow-[3px_5px_0_rgba(26,18,9,0.18)]  flex flex-col  rounded-[55px] border-[4px] shadow-[3px_5px_0_rgba(26,18,9,0.18)] border-[#24221C] bg-[#e8b93f] p-4`}>
                <div className="absolute left-40 -rotate-12 pointer-events-none top-12 z-2 border-1 w-30 h-8 border-[#d2b432] bg-[#FFF4968A]" />
                <div className="relative h-full overflow-y-auto w-full scrollbar-none px-12 py-12 rounded-[45px] border-[3px] bg-[#fff9e8] border-[#24221C] ">
                    <div className="relative h-24">
                        <h1 className={`absolute left-[7px]  top-[4px] text-center select-none text-6xl leading-none tracking-[2px] text-[#1a1209] ${rubik_Wet_Paint.className}`}>{project.name}</h1>
                        <h1 className={`absolute select-none text-center text-6xl translate-x-2 leading-none tracking-[2px] text-[#f0c14d] ${rubik_Wet_Paint.className}  [-webkit-text-stroke:0.7px_#1a1209]`}>{project.name}</h1>
                    </div>
                    <div>

                    </div>
                    <div className="relative  w-full h-100 shrink-0 overflow-hidden rounded-3xl border-4">
                        {
                            project.bannerUrl ? (
                                <Image src={project.bannerUrl} alt={project.name} fill className="absolute object-contain" />

                            ) : (
                                <div className="bg-[#fdf0c2] w-full h-full flex justify-center items-center text-center text-xl ">No Banner</div>
                            )
                        }
                    </div>
                    <div className='text-3xl mt-3 font-bold text-[#1a1209]'>
                        Description
                    </div>
                    <div className="my-4 border-[#c9a030] focus:border-solid focus:scale-[105%] transition-all duration-300 ease-out border-2 text-xl text-[#2A1A08] py-4 px-4 rounded-2xl bg-[#fdf0c2] font-medium outline-none">
                        {project.description || "No Description added yet"}
                    </div>
                    <div className='flex items-center text-center'>
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
                            {project.hackatimeProjects?.length > 0 && (
                                <div className=" py-1 mx-2 bg-[#2A1A08] text-xl px-4 h-12 items-center text-center justify-center flex  rounded-2xl border-2 text-[#f0c14d] border-[#f0c14d]">{project.hackatimeProjects}</div>
                            )}
                        </div>
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
                            <Link href={`/user/projects/edit/${project.id}`} className=" py-1 mx-2 bg-[#2A1A08] text-xl px-4 h-12 items-center text-center justify-center flex  rounded-2xl border-2 text-[#f0c14d] border-[#f0c14d]">
                                <Pencil />
                            </Link>
                        </div>
                        <DeleteButton projectId={project.id} projectName={project.name} />
                    </div>
                </div>
            </div>
            <DeleteProject />
        </>
    )
}