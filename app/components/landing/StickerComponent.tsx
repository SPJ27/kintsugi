import { Kalam } from "next/font/google"

const kalam = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
})
export default function Sticker() {
    return (
        <>
            <div className="absolute right-64  pointer-events-none -rotate-12 -top-26 z-2 border-1 w-14 h-4 border-[#d2b432] bg-[#FFF4968A]" />
            <div className="absolute right-64 pointer-events-none -top-26 z-2 border-1 w-14 rotate-12 h-4 border-[#d2b432] bg-[#FFF4968A]" />

            <div className={`absolute right-24 -top-24  rotate-2 text-[#90782C] h-50 select-none w-100 items-center text-left font-medium text-lg ${kalam.className} px-4 py-4 bg-[#FFEF6D] border-[#c8aa1e] border-4 rounded-lg shadow-[3px_4px_10px_rgba(0,0,0,0.1)] `}>
               <div className="flex justify-center flex-col gap-16 w-full items-center">
                <button className={`${kalam.className} text-[#3d2a00] border-4 border-[#3d2a00] bg-[#c9a030] px-3 py-1 text-xl  shadow-[2px_2px_0_#1a1209]  rounded-2xl`}>
                    Pottery Guide
                </button>
                <div className="flex gap-1 text-center items-center flex-col">
                <div className="text-sm text-[#90782C]">Made By Akshansh and Saksham For Hack club with love:&gt; </div>
                <div className="text-xs font-extralight">金継ぎ — break it. fix it. ship it.</div>
                </div>
                </div>
            </div>
        </>
    )
}