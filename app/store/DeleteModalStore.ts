import { create } from "zustand";

type DeleteModalStore = {
    isOpen : boolean;
    projectId : number | null;
    openDeleteModal : (projectId : number)=> void;
    closeDeleteModal : ()=> void;
}
export const useDeleteModalStore = create<DeleteModalStore>((set)=>({
    isOpen : false,
    projectId : null,
    openDeleteModal : (projectId)=>
        set({
            isOpen : true,
            projectId,
        }),
    closeDeleteModal : ()=>
        set({
            isOpen : false,
            projectId : null,
        })
}))