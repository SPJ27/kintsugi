'use client'
import { BadgeDollarSign, FilesIcon, HomeIcon, Pin, ShoppingBasket, Users } from "lucide-react"
import { Kalam } from "next/font/google"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
const kalam = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
})
interface SideBarProps {
    pinned: boolean;
    setPinned: React.Dispatch<React.SetStateAction<boolean>>;
    displayName : string;
}
export default function SideBar({ pinned, setPinned, displayName }: SideBarProps) {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <aside className={`group select-none z-20 flex h-screen flex-col items-center justify-between gap-4 border-r-2 border-dashed border-[#c9a030] bg-[#2A1A08] py-4 text-center transition-[width] duration-500 ease-out ${kalam.className} ${pinned ? "sticky top-0 w-60" : "sticky top-0 w-20 hover:w-60  absolute top-0 left-0"}`}>
            <div className="flex flex-col gap-12 w-full">
                <div className={`w-full delay-200 duration-300 transition-all items-center text-center ${pinned ? "flex justify-between px-3" : "group-hover:flex group-hover:justify-between group-hover:px-3"}`}>
                    <div className={`text-[#AF8937] ${pinned ? "text-xl" : "group-hover:text-xl"} font-bold`}>
                        金継ぎ
                    </div>
                    <button
                        onClick={() => setPinned((prev) => !prev)}
                        className={`bg-[#F5E4B0]/10 absolute right-2 outline-none py-2 px-2 rounded-xl cursor-pointer text-[#90782C] transition-all duration-500 pointer-events-auto ${pinned ? "opacity-100 border-2 border-dashed" : "opacity-0 group-hover:opacity-100"} `}>
                        <Pin size={16} className={`${pinned ? "rotate-45 text-[#AF8937]" : ""}`} />
                    </button>
                </div>
                <div className="flex gap-5 flex-col items-center text-center justify-center">
                    <Link href='/user' className={`flex hover:border outline-none transition-all duration-300 text-[#F5E4B0] hover:border-[#c9a030]/80 hover:text-[#c9a030]/80 relative items-center w-14 ${pinned ? "w-46" : "group-hover:w-46"} px-4 py-2 rounded-xl hover:bg-[#3d2a08] transition-all duration-500 border-dashed ${pathname === "/user" ? "border-[#c9a030] border-2 text-[#c9a030] bg-[#3d2a08]" : ""}`}>
                        <span><HomeIcon /></span>
                        <span className={`absolute left-16 translate-x-2 whitespace-nowrap text-2xl opacity-0 transition-all duration-200 ${pinned ? "translate-x-0 opacity-100" : "group-hover:translate-x-0 group-hover:opacity-100"}`}>Home</span>
                    </Link>
                    <Link href={'/user/projects'} className={`flex outline-none hover:border text-[#F5E4B0] hover:border-[#c9a030]/80 hover:text-[#c9a030]/80 relative items-center w-14 ${pinned ? "w-46" : "group-hover:w-46"} px-4 py-2 rounded-xl hover:bg-[#3d2a08] transition-all duration-500 border-dashed ${pathname === "/user/projects" ? "border-[#c9a030] border-2 text-[#c9a030] bg-[#3d2a08]" : ""}`}>
                        <span><FilesIcon /></span>
                        <span className={`absolute left-16 translate-x-2 whitespace-nowrap text-2xl opacity-0 transition-all duration-200 ${pinned ? "translate-x-0 opacity-100" : "group-hover:translate-x-0 group-hover:opacity-100"}`}>Projects</span>
                    </Link>
                    <Link href={'/user/social'} className={`flex outline-none hover:border text-[#F5E4B0] hover:border-[#c9a030]/80 hover:text-[#c9a030]/80 relative items-center w-14 ${pinned ? "w-46" : "group-hover:w-46"} px-4 py-2 rounded-xl hover:bg-[#3d2a08] transition-all duration-500 border-dashed ${pathname === "/user/social" ? "border-[#c9a030] border-2 text-[#c9a030] bg-[#3d2a08]" : ""}`}>
                        <span><Users /></span>
                        <span className={`absolute left-16 translate-x-2 whitespace-nowrap text-2xl opacity-0 transition-all duration-200 ${pinned ? "translate-x-0 opacity-100" : "group-hover:translate-x-0 group-hover:opacity-100"}`}>People</span>
                    </Link>
                    <Link href={'/user/shop'} className={`flex outline-none hover:border text-[#F5E4B0] hover:border-[#c9a030]/60 hover:text-[#c9a030]/80 relative items-center w-14 ${pinned ? "w-46" : "group-hover:w-46"} px-4 py-2 rounded-xl hover:bg-[#3d2a08] transition-all duration-500 border-dashed ${pathname === "/user/shop" ? "border-[#c9a030] border-2 text-[#c9a030] bg-[#3d2a08]" : ""}`}>
                        <span><ShoppingBasket /></span>
                        <span className={`absolute left-16 translate-x-2 whitespace-nowrap text-2xl opacity-0 transition-all duration-200 ${pinned ? "translate-x-0 opacity-100" : "group-hover:translate-x-0 group-hover:opacity-100"}`}>Shop</span>
                    </Link>
                    <Link href={'/user/currency'} className={`flex outline-none text-[#F5E4B0] hover:border hover:border-[#c9a030]/60 hover:text-[#c9a030]/80 relative items-center w-14 ${pinned ? "w-46" : "group-hover:w-46"} px-4 py-2 rounded-xl hover:bg-[#3d2a08] transition-all duration-500 hover:border-dashed ${pathname === "/user/currency" ? "border-[#c9a030] border-2 text-[#c9a030] bg-[#3d2a08]" : ""}`}>
                        <span><BadgeDollarSign /></span>
                        <span className={`absolute left-16 translate-x-2 whitespace-nowrap text-2xl opacity-0 transition-all duration-200 ${pinned ? "translate-x-0 opacity-100" : "group-hover:translate-x-0 group-hover:opacity-100"}`}>Currency</span>
                    </Link>
                </div>
            </div>
            <div className="border-t-2 flex-col gap-2 py-4 w-full border-dashed flex justify-center items-center border-[#c9a030]">
                <div className=" bg-[#c9a030] w-12 h-12 flex justify-center items-center text-center rounded-full ">
                    <div className="translate-y-[4px] select-none text-4xl">{displayName.trim().charAt(0).toUpperCase() ?? "?"}</div>
                </div>
                <div>
                    <button onClick={async () => {
                        await authClient.signOut();
                        router.refresh();
                    }} className={`text-xl outline-none cursor-pointer text-[#F5E4B0] hover:text-[#AF8937] transition-all duration-300`}>Logout</button>
                </div>
            </div>
        </aside>
    )
}
