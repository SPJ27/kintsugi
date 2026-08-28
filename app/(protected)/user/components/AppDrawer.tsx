'use client';
import { useAppDrawer } from "@/app/store/AppDrawer"
import { authClient } from "@/lib/auth-client";
import { AnimatePresence, motion } from "framer-motion"
import { FileIcon, HomeIcon, LogOut, ShoppingBasket, UserIcon, Users } from "lucide-react";
import { Kalam } from "next/font/google";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
const kalam = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
})
export default function AppDrawer() {
    const { isOpen, onOpen, onClose } = useAppDrawer();
    const pathName = usePathname();
    const router = useRouter();
    return (
        <AnimatePresence>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="min-w-screen bg-black/20 fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
                >
                    <motion.div
                        transition={{ damping: 25, stiffness: 220, type: "spring" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        initial={{ y: "100%" }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 300 }}
                        dragElastic={0.2}
                        onDragEnd={(e, info) => {
                            if (info.offset.y > 150) {
                                onClose;
                            }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#f6ebca] overflow-y-auto w-full  justify-center items-center fixed bottom-0 p-6 rounded-t-4xl right-0 left-0 pb-12 pt-4 px-4 flex flex-col z-50 backdrop-blur-2xl ">
                        <div className={`${kalam.className} text-2xl pt-4 text-[#AF8937] justify-between w-full font-bold flex items-center text-center`}>
                            <div>Kintsugi</div>
                            <div>金継ぎ</div>
                        </div>
                        <div className="px-5 py-6 flex  justify-center items-center  gap-12 flex-wrap">
                            <Link href={'/user'} onClick={onClose} className={`flex transition-all duration-300 flex-col gap-2 items-center border-2 py-2 px-4 rounded-2xl  justify-center  text-center border-dashed w-25 h-25 ${kalam.className} text-xl ${pathName === "/user" ? "border-[#c9a030] border-2 text-[#c9a030] bg-[#3d2a08] font-bold" : "text-[#3d2a08] border-[#3d2a08]"}`} >
                                <HomeIcon />
                                <span>Home</span>
                            </Link>
                            <Link href={'/user/projects'} onClick={onClose} className={`flex transition-all duration-300 flex-col gap-2 items-center border-2 py-2 px-4 rounded-2xl  justify-center  text-center border-dashed w-25 h-25 ${kalam.className} text-xl ${pathName === "/user/projects" ? "border-[#c9a030] border-2 text-[#c9a030] bg-[#3d2a08] font-bold" : "text-[#3d2a08] border-[#3d2a08]"}`} >
                                <FileIcon />
                                <span>Projects</span>
                            </Link>

                            <Link href={'/user/shop'} onClick={onClose} className={`flex transition-all duration-300 flex-col gap-2 items-center border-2 py-2 px-4 rounded-2xl  justify-center  text-center border-dashed w-25 h-25 ${kalam.className} text-xl ${pathName === "/user/shop" ? "border-[#c9a030] border-2 text-[#c9a030] bg-[#3d2a08] font-bold" : "text-[#3d2a08] border-[#3d2a08]"}`} >
                                <ShoppingBasket />
                                <span>Shop</span>
                            </Link>
                            <Link href={'/user/social'} onClick={onClose} className={`flex transition-all duration-300 flex-col gap-2 items-center border-2 py-2 px-4 rounded-2xl  justify-center  text-center border-dashed w-25 h-25 ${kalam.className} text-xl ${pathName === "/user/social" ? "border-[#c9a030] border-2 text-[#c9a030] bg-[#3d2a08] font-bold" : "text-[#3d2a08] border-[#3d2a08]"}`} >
                                <Users />
                                <span>People</span>
                            </Link>
                            <button 
                            onClick={async()=>{
                                await authClient.signOut();
                                router.refresh();
                            }}
                            className={`flex transition-all duration-300  mx-6 gap-4 items-center border-2 font-semibold py-2 px-4 rounded-2xl  justify-center  text-center border-dashed w-full h-15 ${kalam.className} text-xl text-[#c9a030] bg-[#3d2a08]`}>
                                <span>
                                    <LogOut strokeWidth={3} />
                                </span>
                                <span className="text-2xl">Logout</span>
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>


    )
}