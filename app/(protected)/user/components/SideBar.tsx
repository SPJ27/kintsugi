'use client'
import { BadgeDollarSign, FilesIcon, HomeIcon, Pin, ShoppingBasket, Users } from "lucide-react"
import { Kalam } from "next/font/google"
import { usePathname } from "next/navigation"
import Link from "next/link"
const kalam = Kalam({
    subsets : ['latin'],
    weight : ['300', '400', '700']
})
export default function SideBar(){
    const pathname = usePathname();
    return(
        <div className={`group bg-[#2A1A08] text-center  flex-col items-center py-4 flex  justify-between gap-4 z-20 w-20 h-screen border-r-2 border-dashed border-[#c9a030] hover:absolute hover:w-60 duration-500 transition-all ${kalam.className}`}>
          <div className="flex flex-col gap-12 w-full">
            <div className="w-full group-hover:flex group-hover:justify-between group-hover:px-3  items-center text-center">
               <div className={`text-[#B88900] ${kalam.className} font-bold`}>
                金継ぎ
               </div>
               <div className="bg-[#F5E4B0]/10 absolute right-2   py-2 px-2 rounded-xl text-[#90782C] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 pointer-events-auto">
                <Pin size={16} />
               </div>
            </div>
            <div className="flex gap-5 flex-col items-center text-center justify-center">
            <Link href='/.git/' className="flex relative items-center w-14 group-hover:w-46 px-4 py-2 rounded-xl bg-[#3d2a08] transition-all duration-500">
                <span><HomeIcon /></span>
                <span className="absolute text-2xl opacity-0 translate-x-2 group-hover:opacity-100 delay-200 whitespace-nowrap left-16 group-hover:translate-y-[2px] transition-all duration-200">Home</span>
            </Link>
            <div  className="flex items-center flex-col gap-1">
                <span><ShoppingBasket /></span>
                <span>Shop</span>
            </div>
            <div  className="flex items-center flex-col gap-1">
                <span><FilesIcon /></span>
                <span>Projects</span>
            </div>
            <div  className="flex items-center flex-col gap-1">
                <span><Users /></span>
                <span>People</span>
            </div>
            <div  className="flex items-center flex-col gap-1">
                <span><BadgeDollarSign /></span>
                <span>Exchange</span>
            </div>
            </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}