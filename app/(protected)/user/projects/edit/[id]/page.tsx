import { getProject } from "@/actions/projects";
import { notFound } from "next/navigation";
import ProjectForm from "../../new/components/ProjectForm";
import { Kalam, Rubik_Wet_Paint } from "next/font/google";
const kalam = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
});
const rubiks_Wet_Paint = Rubik_Wet_Paint({
    subsets: ['latin'],
    weight: ['400']
})
export default async function Page({ params }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const result = await getProject(Number(id));
    if (!result.success || !result.project || !result.userCreated) {
        notFound();
    }
    return (
        <main className={`${kalam.className} w-full h-[89vh] shadow-[3px_5px_0_rgba(26,18,9,0.18)]  flex flex-col  rounded-[55px] border-[4px] shadow-[3px_5px_0_rgba(26,18,9,0.18)] border-[#24221C] bg-[#e8b93f] p-4`}>
            <div className="absolute left-40 -rotate-12 pointer-events-none top-12 z-2 border-1 w-30 h-8 border-[#d2b432] bg-[#FFF4968A]" />
            <div className="relative h-full overflow-y-auto w-full scrollbar-none px-12 py-12 rounded-[45px] border-[3px] bg-[#fff9e8] border-[#24221C] ">
                <div className="relative">
                    <h1 className={`absolute left-[7px]  top-[4px] text-center select-none text-4xl leading-none tracking-[2px] text-[#1a1209] ${rubiks_Wet_Paint.className}`}>CREATE PROJECT</h1>
                    <h1 className={`absolute select-none text-center text-4xl translate-x-2 leading-none tracking-[2px] text-[#f0c14d] ${rubiks_Wet_Paint.className}  [-webkit-text-stroke:0.7px_#1a1209]`}>CREATE PROJECT</h1>
                </div>
                <p className="text-[#c7a653] mb-14 translate-y-11 mx-2 text-xl font-medium">Add Your Project Details here</p>
                <div className="flex flex-col mt-4">
                    <ProjectForm project={result.project} />
                </div>
            </div>
        </main>
    )
}