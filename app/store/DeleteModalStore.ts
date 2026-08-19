import { create } from "zustand";

type DeleteModalStore = {
    isOpen : boolean;
    projectId : number | null;
    projectName : string | null;
    openDeleteModal : (projectId : number, name : string)=> void;
    closeDeleteModal : ()=> void;
}
export const useDeleteModalStore = create<DeleteModalStore>((set)=>({
    isOpen : false,
    projectId : null,
    projectName : null,
    openDeleteModal : (id, name)=>
        set({
            isOpen : true,
            projectId : id,
            projectName : name
        }),
    closeDeleteModal : ()=>
        set({
            isOpen : false,
            projectId : null,
            projectName : null
        })
}))