import { create } from "zustand";

type EditModal = {
    isOpen : boolean;
    onClose : ()=> void;
    projectId : number | null;
    onOpen : (projectId : number)=>void;
}

export const useEditModalStore = create<EditModal>((set)=>({
    isOpen : false,
    projectId : null,
    onOpen : (id)=>set({
        isOpen : true,
        projectId : id,
    }),
    onClose : ()=>set({
        isOpen : false,
        projectId : null
    })
}))