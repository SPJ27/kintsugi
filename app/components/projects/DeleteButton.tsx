"use client";

import { useDeleteModalStore } from "@/app/store/DeleteModalStore";
import { TrashIcon } from "lucide-react";

export default function DeleteButton({
    projectId, projectName,
} : { projectId: number, projectName : string}){
    const {openDeleteModal} = useDeleteModalStore();
    return(
                <button
            type="button"
            onClick={() => openDeleteModal(projectId, projectName)}
            className="bg-[#2A1A08] text-xl px-6 py-3 rounded-2xl border-2 text-[#f0c14d] border-[#f0c14d]"
        >
            <TrashIcon />
        </button>
    )
}