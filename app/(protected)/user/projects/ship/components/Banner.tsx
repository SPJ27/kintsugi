import { Loader2, Upload, UploadCloud, UploadIcon } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import Image from "next/image"
export default function BannerStep({
    project, onNext
}: {
    project: any; onNext: () => void;
}) {
    const [bannerPreview, setBannerPreview] = useState<string | null>(project.bannerUrl ?? null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [loadingImage, setLoadingImage] = useState(false);
    const bannerInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File | undefined) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            return;
        }
        try {
            setLoadingImage(true)
            const preview = URL.createObjectURL(file)
            setBannerFile(file);
            setBannerPreview(preview);
        }
        catch {
            toast.error("Failed to load Image");
        } finally {
            setLoadingImage(false)
        }
    }
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        handleFile(file)
    }
    return (
        <div className="mx-6">
            <div className="flex justify-between items-center">
                <div>
                <h2 className="text-2xl text-[#24221C] font-bold">Let's review your Banner</h2>
                <p className="text-md text-[#f0c14d]">Make sure your project looks good before sending it for review.</p>
            </div>
            <div>
                <button className="text-2xl font-bold bg-[#24221C] px-4 py-1 rounded-xl border-3 border-dashed border-[#c9a030] text-[#c9a030] cursor-pointer hover:scale-90 transition-all duration-300" onClick={onNext}><span className="-translate-y-4 w-full h-full">Next</span></button>
            </div>
            </div>
            <div
                onClick={() => bannerInputRef.current?.click()}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className="flex w-full mt-8 cursor-pointer justify-center flex-col items-center  border-6 border-[#c9a030]/50 rounded-4xl border-dashed "

            >
                <input
                    className="hidden"
                    ref={bannerInputRef}
                    id="bannerFile"
                    type="file"
                    onChange={(e) => handleFile(e.target.files?.[0])}

                />
                {loadingImage && (
                    <div className="py-20">
                        <Loader2 size={48} className="aniamte-spin text-[#c9a030]" />
                    </div>
                )}
                {!loadingImage && bannerPreview && (
                    <div className="relative w-full h-75  overflow-hidden rounded-2xl">
                        <Image
                            src={bannerPreview}
                            alt={project?.name ?? "Project Banner"}
                            fill
                            className="object-contain"
                        />
                    </div>
                )}
                {!loadingImage && !bannerPreview && (
                    <div className="flex flex-col items-center text-center gap-8 py-12">
                        <div className={`border-8 border-[#c9a030] transition-all duration-300 rounded-full text-[#c9a030 p-4 ${isDragging ? "scale-105" : ""}]`}>
                            {
                                isDragging ? (
                                    <UploadIcon size={64} />
                                ) : (
                                    <UploadCloud size={64} />
                                )
                            }
                        </div>
                        <div className="flex gap-2 flex-col">
                            <p className="text-2xl font-bold text-[#B88900]">Drag and drop a banner for your project</p>
                            <p className="text-xl font-semibold text-[#BB8900]/80">or click to browse your files</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}