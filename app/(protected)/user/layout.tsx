"use client"
import SideBar from "./components/SideBar";
import { useState  } from "react";
export default function layout({ children }: { children: React.ReactNode }) {
    const [pinned, setPinned] = useState(false);
    return (
        <main className="max-w-screen min-h-screen flex relative">
            <div className={`shrink-0 transition-[width] duration-500 ${pinned ? "w-60" : "w-20"}`}>
            <SideBar pinned={pinned} setPinned={setPinned} />
            </div>
            <div className={`flex-1 min-w-0 my-10 mx-12`}>
            {children}
            </div>
        </main>
    )
}