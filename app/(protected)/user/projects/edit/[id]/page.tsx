import { getProject } from "@/actions/projects";
import { notFound } from "next/navigation";

export default async function Page({ params }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const result = await getProject(Number(id));
    if(!result.success || !result.project || !result.userCreated){
        notFound();
    }
    return(
        <div>
            
        </div>
    )
}