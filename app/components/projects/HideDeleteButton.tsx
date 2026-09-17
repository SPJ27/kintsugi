"use client"
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

export default function HideDeleteButton(){
    const handleHideDelete= ()=>{
        toast.error("You can't delete your project if its pending for review")
    }
    return(
                <button onClick={handleHideDelete} type="button" className="whitespace-nowrap cursor-pointer py-1 mx-2 bg-[#2A1A08]/50 text-xl px-4 h-12 items-center text-center justify-center flex  rounded-2xl border-2 text-[#f0c14d] border-[#f0c14d]">
            <TrashIcon />
        </button>
    )
}