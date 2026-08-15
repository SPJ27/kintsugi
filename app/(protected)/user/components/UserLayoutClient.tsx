"use client";

import { useState } from "react";
import SideBar from "./SideBar";

interface UserLayoutClientProps {
    children: React.ReactNode;
    displayName: string;
}

export default function UserLayoutClient({ children, displayName }: UserLayoutClientProps) {
    const [pinned, setPinned] = useState(false);

    return (
        <main className="max-w-screen min-h-screen flex relative">
            <div className={`shrink-0 transition-[width] duration-500 ${pinned ? "w-60" : "w-20"}`}>
                <SideBar pinned={pinned} setPinned={setPinned} displayName={displayName} />
            </div>
            <div className="flex-1 min-w-0 my-10 mx-12">
                {children}
            </div>
        </main>
    );
}
