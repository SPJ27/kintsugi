import { create } from "zustand";

type AppDrawerStore = {
    isOpen : boolean;
    onClose : ()=>void;
    onOpen : ()=>void
}

export const useAppDrawer = create<AppDrawerStore>((set)=>({
   isOpen :false,
   onOpen : (()=>set({
    isOpen : true
   })),
    onClose : (()=>set({
    isOpen : false,
   }))
}))