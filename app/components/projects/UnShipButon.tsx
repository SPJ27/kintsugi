"use client"
import { getProjectBack } from "@/actions/ship-form";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
    projectId : number;
}
export default function UnShipButton({projectId} : Props){
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleGetBack = async()=>{
        if(loading) return;
        try{
            setLoading(true);
            const result = await getProjectBack(projectId);
            if(!result.success){
                toast.error(result.error);
                return;
            }
            toast.success("Project withdrawn successfully!");
            router.refresh();
            
        }catch(error){
            toast.error("Something went wrong")
        }finally{
            setLoading(false)
        }
    }
    return(
        <button disabled={loading} onClick={handleGetBack} type="button" className="absolute  right-4 border-[#c9a030] border-3 rounded-xl top-4 bg-[#2A1A08] py-2 px-4">
            <Undo2 size={24} className='text-[#c9a030]' strokeWidth={2.5} />
        </button>
    )
}