'use client'
import { toast } from "sonner";

export default function Button() {
    return (
        <>
            <h2 className="text-xl text-[#69583C]">DOCS AND GUIDES</h2>
            <p onClick={() => toast.error("This is currently not functionable")} className="text-2xl md:text-3xl hover:text-[#7d6114] text-[#c9a030] duration-300 transition-all cursor-pointer">PLEASE READ GUIDE!</p></>
    )
}