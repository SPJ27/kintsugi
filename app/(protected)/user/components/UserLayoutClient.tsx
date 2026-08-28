"use client";

import { useState } from "react";
import SideBar from "./SideBar";
import AppDrawer from "./AppDrawer";
import { LayoutGridIcon } from "lucide-react";
import { useAppDrawer } from "@/app/store/AppDrawer";

interface UserLayoutClientProps {
    children: React.ReactNode;
    displayName: string;
    roles: string[];
    image : string | null;
}

export default function UserLayoutClient({ children, displayName, roles, image }: UserLayoutClientProps) {
    const [pinned, setPinned] = useState(false);
    const {onOpen, onClose} = useAppDrawer()
    return (
        <main className="max-w-screen min-h-screen flex relative">
            <div className={` hidden md:block shrink-0 transition-[width] duration-500 ${pinned ? "w-60" : "w-20"}`}>
                <SideBar pinned={pinned} setPinned={setPinned} displayName={displayName} roles={roles} image={image} />
            </div>
            <div className="md:hidden block">
                <AppDrawer />
            </div>
            <div className="md:hidden block fixed bottom-8 left-8">
                <button onClick={onOpen} className="shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] bg-[#2A1A08] border-dashed border-2 border-[#c9a030] text-[#c9a030] rounded-full p-3" >
                        <LayoutGridIcon size={24}  />
                </button>
            </div>
            <div className="flex-1 min-w-0 my-10 mx-8 md:mx-12">
                {children}
            </div>
        </main>
    );
}
