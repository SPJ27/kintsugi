"use client";
import Link from "next/link";
import { Kalam } from "next/font/google";

const kalam = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
})
export default function page() {

    return (
        <div className={`${kalam.className} flex flex-col gap-8`}>
            <div className="text-4xl font-bold text-[#2A1A08]">
                My Projects
            </div>
            <Link href={'/user/projects/new'} className="w-full gap-4 py-4 flex cursor-pointer border-[#c9a030] font-medium justify-center text-[#c9a030] items-center bg-[#2A1A08] border-4 border-dashed rounded-2xl uppercase text-4xl">
                <span className="text-5xl">+</span> Create Project
                </Link>
        </div> 
    )
}