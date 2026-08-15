"use client"

import { useEffect, useState } from "react";

export default function KintsugiScrollbar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const update = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const value = scrollable <= 0 ? 0 : window.scrollY / scrollable;
            setProgress(Math.min(1, Math.max(0, value)))
        }
        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        }
    }, [])
    return (
        <div className="fixed z-[9999] right-[1px] top-[28px] bottom-[28px] w-[24px] pointer-events-none">
            <div className="absolute top-0 bottom-0 w-[2px] -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,#B88900_0px,#B88900_8px,transparent_8px,transparent_15px)]" />
            <div className="absolute left-[50%] -translate-y-1/2 -translate-x-1/2 w-[28px] h-[52px] transition-[top] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{top : `${progress * 100}%`}}>
                <div className="absolute left-1/2 top-[7px] w-[3px] h-[38px] -translate-x-1/2 rotate-[8deg] bg-[#B88900] border border-[#21170d] origin-top" />
                <div className="absolute left-1/2 bottom-[2px] w-[3px] h-[12px] -translate-x-1/2 rotate-[8deg] bg-[#B88900] border-l border-r border-[#21170d] clip-path-[polygon(50%_100%,0_0, 100%_0)]" />
                <div className="absolute left-1/2 top-[1px] w-[9px] h-[9px] -translate-x-1/2 rounded-full border-[2px] border-[#21170d] bg-[#D6a500]" />
                <div className="absolute left-[11px] top-[-8px] w-[2px] h-[14px] bg-[#21170d] rotate-[-12deg]" />
            </div>
        </div>
    )
}