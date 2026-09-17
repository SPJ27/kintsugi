"use client"
import { Pencil } from "lucide-react";
import { toast } from "sonner";


export default function HideEditButton() {
    const handleEditHide = () => {
        toast.error("You can't edit your project while its pending for review or permanently rejected ")
    }
    return (
        <button onClick={handleEditHide} type="button" className="whitespace-nowrap py-1 mx-2 bg-[#2A1A08]/50 cursor-pointer text-xl px-4 h-12 items-center text-center justify-center flex  rounded-2xl border-2 text-[#f0c14d] border-[#f0c14d]">
            <Pencil />
        </button>
    )
}