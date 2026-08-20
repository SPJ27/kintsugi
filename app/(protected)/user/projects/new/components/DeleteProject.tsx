"use client";
import { deleteProject } from "@/actions/projects";
import { useDeleteModalStore } from "@/app/store/DeleteModalStore";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, TrashIcon } from "lucide-react";
import { Kalam } from "next/font/google";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const kalam = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
})
export default function DeleteProject() {
    const { isOpen, closeDeleteModal, projectName, projectId } = useDeleteModalStore();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleDelete = async () => {
        if (!projectId) return;
        try {
            setLoading(true);
            const result = await deleteProject(projectId);
            if (!result.success) {
                toast.error(result.error);
                return;
            }

            toast.success("Project deleted successfully");
            closeDeleteModal();
            router.replace('/user/projects');

        } catch {
            toast.error("Delete Failed ")
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => { if (!loading) closeDeleteModal(); }}
                    className={`fixed z-40 disabled:cursor-not-allowed min-w-screen flex items-center inset-0 justify-center bg-black/20 backdrop-blur-xs ${kalam.className}`}>
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-[450px] flex flex-col gap-4 items-center text-center rounded-3xl border-4 border-[#2A1A08] border-dashed bg-[#fdf0c2] p-8 shadow-[2px_2px_0_rgba(26,18,9,0.25)]">
                        <div className="text-[#c7a653] bg-[#c7a653]/30 border-4 rounded-full p-4 ">
                            <TrashIcon size={32} strokeWidth={2} />
                        </div>
                        <div className="text-md">Are you sure you want to delete <span className="font-bold">&quot;{projectName}&quot;</span>?</div>
                        <div className="w-full flex gap-6 items-center justify-center text-center">
                            <button type="button" disabled={loading} onClick={closeDeleteModal} className="bg-[#c7a653]/30 text-[#2A1A08] border-[#2A1A08] text-xl font-bold w-1/2 py-2 border-2 border-dashed rounded-2xl cursor-pointer hover:scale-[95%] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60">Cancel</button>
                            <button type="button" disabled={loading} onClick={handleDelete} className="bg-[#c7a653] text-[#2A1A08] border-[#2A1A08] text-xl font-bold w-1/2 py-2 border-2 border-dashed rounded-2xl cursor-pointer hover:scale-[95%] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 flex justify-center items-center text-center">{loading ? <Loader2 className="animate-spin duration-300 transition-all" /> : "Yes"}</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

        </AnimatePresence>
    )

}
