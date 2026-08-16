"use client";

import { useState } from "react";
import SideBar from "./SideBar";

interface UserLayoutClientProps {
    children: React.ReactNode;
    displayName: string;
    roles: string[]
}

export default function UserLayoutClient({ children, displayName, roles }: UserLayoutClientProps) {
    const [pinned, setPinned] = useState(false);

    return (
        <main className="max-w-screen min-h-screen flex relative">
            <div className={`shrink-0 transition-[width] duration-500 ${pinned ? "w-56 sm:w-60" : "w-14 sm:w-20"}`}>
                <SideBar pinned={pinned} setPinned={setPinned} displayName={displayName} roles={roles}/>
            </div>
            <div className="flex-1 min-w-0 my-6 sm:my-10 mx-3 sm:mx-6 md:mx-12">
                {children}
            </div>
        </main>
    );
}
