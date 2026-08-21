import { getProject } from "@/actions/projects";
import { Kalam } from "next/font/google";
import { notFound } from "next/navigation";
import ShipProjectForm from "../components/ShipProjectForm";
const kalam = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
})
export default async function page({
    params,
}: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const projectId = Number(id);
    if (!Number.isInteger(projectId)) {
        notFound();
    }
    const result = await getProject(projectId);
    if (!result.success || !result.project) {
        notFound();
    }
    if (!result.userCreated) {
        notFound();
    }
    return (
        <main className={`${kalam.className} w-full h-[89vh] shadow-[3px_5px_0_rgba(26,18,9,0.18)]  flex flex-col  rounded-[55px] border-[4px] shadow-[3px_5px_0_rgba(26,18,9,0.18)] border-[#24221C] bg-[#e8b93f] p-4`}>
            <div className="absolute left-40 -rotate-12 pointer-events-none top-12 z-2 border-1 w-30 h-8 border-[#d2b432] bg-[#FFF4968A]" />
            <div className="relative h-full overflow-y-auto w-full scrollbar-none px-12 py-12 rounded-[45px] border-[3px] bg-[#fff9e8] border-[#24221C] ">
                <ShipProjectForm project={result.project} />
            </div>
        </main>
    )
}