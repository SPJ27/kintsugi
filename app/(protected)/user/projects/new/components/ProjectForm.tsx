'use client'
import { Kalam } from "next/font/google"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createNewProject, EditProject } from "@/actions/projects"
import { ChevronDown, ChevronUp, Circle, CircleCheck, Loader2, UploadCloud, UploadIcon, X } from "lucide-react"
import { getHackatimeProjects } from "@/actions/hackatime"
import Image from "next/image"
import { projects } from "@/db/schema"
const kalam = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
})
type ProjectFormProps = {
    project?: typeof projects.$inferSelect;
}
export default function ProjectForm({ project }: ProjectFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [projects, setProjects] = useState<
        {
            name: string;
            total_seconds: number;
            archived: boolean;
        }[]
    >([]);
    const [bannerPreview, setBannerPreview] = useState<string | null>(project?.bannerUrl ?? null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [loadingImage, setLoadingImage] = useState(false);
    const [hackatimeOpen, setHackatimeOpen] = useState(false);
    const [hackatimeSearch, setHackatimeSearch] = useState('');
    const [selectedHackatimeProjects, setSelectedHackatimeProjects] = useState<string[]>(project?.hackatimeProjects ?? []);
    const [projectsLoading, setProjectsLoading] = useState(true);

    const isEditing = !!project;

    const handleFile = (file: File | undefined) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file.");
            return;
        }
        try {
            setLoadingImage(true)
            const preview = URL.createObjectURL(file)
            setBannerFile(file);
            setBannerPreview(URL.createObjectURL(file));
        }
        catch (error) {
            throw new Error("Failed to upload image.")
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
    useEffect(() => {
        async function loadProjects() {
            const result = await getHackatimeProjects();
            if (result.success) {
                setProjects(result.projects);
            } else {
                toast.error(result.error);
            }
            setProjectsLoading(false);
        }
        loadProjects()
    }, [])
    const handleSubmit = async (formData: FormData) => {
        try {
            setLoading(true);
            const result = isEditing
                ? await EditProject(project.id, formData) : await createNewProject(formData);
            if (!result.success) {
                setError(result.error);
                return;
            }
            router.push(`/user/projects/view/${result.project.id}`);
            router.refresh();
        }
        catch (error) {
            toast.error( isEditing ? "Failed to update project" : "Failed to create project");
        }
        finally {
            setLoading(false);
        }
    }
    const hackatimeRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (hackatimeRef.current && !hackatimeRef.current.contains(event.target as Node)) {
                setHackatimeOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        };
    }, []);

    const filteredProjects = projects.filter((project) => project.name.toLowerCase().includes(hackatimeSearch.toLowerCase()));
    return (
        <>
            <form action={handleSubmit} className="space-y-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="bannerFile" className="text-[#2A1A08] text-2xl font-bold ml-4" >
                        Project Banner
                    </label>
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        className="flex w-full cursor-pointer justify-center flex-col items-center  border-6 border-[#c9a030]/50 rounded-4xl border-dashed border-["
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            name="bannerFile"
                            className="hidden"
                            onChange={(e) => handleFile(e.target.files?.[0])}
                        />
                        {
                            project?.bannerUrl && (
                                <input 
                                type="hidden"
                                name="bannerUrl"
                                value={project.bannerUrl}
                                />
                            )
                        }
                        {loadingImage && (
                            <div>Hey I am loading</div>
                        )}
                        {
                            bannerPreview ? (
                                <div className="relative w-full h-77 overflow-hidden rounded-2xl">
                                    <Image src={bannerPreview} alt={project?.name ?? "Project banner"} fill className="object-contain" />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-center gap-8 py-12">
                                    <div className={`border-[#c9a030] transition-all duration-300 border-8 rounded-full text-[#c9a030] p-4 ${isDragging && "scale-105"}`}>
                                        {isDragging ? (
                                            <UploadIcon size={64} />
                                        ) : (
                                            <UploadCloud size={64} />

                                        )}
                                    </div>
                                    <div className="flex gap-2 flex-col">
                                        <p className="text-2xl font-bold text-[#B88900]">
                                            Drag and drop a banner for your project
                                        </p>
                                        <p className="text-xl font-semibold text-[#B88900]/80" >
                                            or click to browse your files
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[#2A1A08] text-2xl font-bold ml-4">Title</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        defaultValue={project?.name || ""}
                        placeholder="My awesome project"
                        className="ml-4 border-[#c9a030] focus:border-solid focus:scale-[105%] transition-all duration-300 ease-out border-2 text-xl text-[#2A1A08] py-4 px-4 rounded-2xl bg-[#fdf0c2] font-medium outline-none"
                        required />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="desc" className="text-[#2A1A08] text-2xl font-bold ml-4">Description</label>
                    <textarea
                        id="desc"
                        name="desc"
                        className="ml-4 border-[#c9a030] focus:border-solid focus:scale-[105%] transition-all duration-300 ease-out border-2 text-xl text-[#2A1A08] py-4 px-4 rounded-2xl bg-[#fdf0c2] font-medium outline-none"
                        defaultValue={project?.description ?? ""}
                        placeholder="Tell us about your project"
                        rows={5} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="hackatimeProjects" className="text-[#2A1A08] text-2xl font-bold ml-4">Hackatime</label>
                    <div ref={hackatimeRef} className="relative mx-4">
                        <button
                            className={`w-full border-2 border-[#c9a030] flex items-center text-xl text-[#2a1a08] py-4 px-2 rounded-2xl bg-[#fdf0c2] font-medium text-left transition-all duration-300 ${hackatimeOpen ? "rounded-t-2xl rounded-b-none" : "rounded-2xl"}`}
                            type="button"
                            onClick={() => setHackatimeOpen((prev) => !prev)}>
                            <div className="min-w-0 flex-1 overflow-hidden">{selectedHackatimeProjects.length === 0 ? (
                                <div className="mx-4 translate-y-1">No Projects Selected</div>
                            ) : (
                                <div className="flex gap-2 items-center overflow-x-auto kintsugi-scrollbar  px-4 min-w-0 max-w-full whitespace-nowrap ">
                                    {selectedHackatimeProjects.map((project) => (
                                        <div key={project}>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedHackatimeProjects((prev) => prev.filter((name) => name !== project))
                                                }}
                                                className="bg-[#2a1a08] text-[#c9a030] my-2 border-2 border-[#c9a030] rounded-xl flex gap-2 items-center text-center justify-center px-2 py-1 text-sm shrink-0 whitespace-nowrap">
                                                <span>{project}</span>
                                                <span><X size={12} /></span>
                                            </button>
                                        </div>
                                    )
                                    )}
                                </div>
                            )}</div>
                            <div className="text-2xl shrink-0 px-2 transition-all duration-300 ease-out">
                                {hackatimeOpen ? <ChevronUp /> : <ChevronDown />}
                            </div>
                        </button>
                        {hackatimeOpen && (
                            <div className="absolute  z-50  w-full rounded-b-2xl border-x-2 border-b-2 border-[#c9a030]  bg-[#fdf0c2] shadow-xl overflow-hidden">
                                <div className="p-3 border-b-2 border-[#c9a030]/30">
                                    <input
                                        type="text"
                                        value={hackatimeSearch}
                                        onChange={(e) => setHackatimeSearch(e.target.value)}
                                        placeholder="Search projects..."
                                        autoFocus
                                        className="w-full border-2 border-[#c9a030]/30 rounded-xl px-4 py-3 text-lg text-[#2a1a08] bg-white/50 outline-none focus:border-[#c9a030]"
                                    />
                                </div>
                                <div className="max-h-44 overflow-y-auto p-2 kintsugi-scrollbar">
                                    {projectsLoading ? (
                                        <div className="p-4 text-center text-[#2a1a08]/70">Loading Hackatime projects...</div>
                                    ) : filteredProjects.length === 0 ? (
                                        <div className="p-4 text-center text-[#2a1a08]/70">No Projects Found</div>
                                    ) : (
                                        <div className="flex flex-col gap-2">

                                            {filteredProjects.map((project) => {
                                                const selected = selectedHackatimeProjects.includes(project.name);
                                                return (

                                                    <button
                                                        key={project.name}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedHackatimeProjects((prev) => selected ? prev.filter((name) => name !== project.name) : [...prev, project.name])
                                                        }}
                                                        className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl text-left text-lg transition-all ${selected ? "bg-[#c9a030]/30" : "hover:bg-[#c9a030]/15"}`}
                                                    >
                                                        <div>
                                                            {selected ? <CircleCheck /> : <Circle />}
                                                        </div>
                                                        <span className="truncate">{project.name}</span>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {selectedHackatimeProjects.map((project) => (
                            <input
                                key={project}
                                type="hidden"
                                name="hackatimeProjects"
                                value={project}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="projectDemo" className="text-[#2A1A08] text-2xl font-bold ml-4">Demo Url</label>
                    <input
                        id="projectDemo"
                        name="projectDemo"
                        type="url"
                        defaultValue={project?.projectDemo || ""}
                        className="ml-4 border-[#c9a030] focus:border-solid focus:scale-[105%] transition-all duration-300 ease-out border-2 text-xl text-[#2A1A08] py-4 px-4 rounded-2xl bg-[#fdf0c2] font-medium outline-none"

                        placeholder="https://myproject.vercel.app"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="projectRepo" className="text-[#2A1A08] text-2xl font-bold ml-4">Repository URL</label>
                    <input
                        id="projectRepo"
                        name="projectRepo"
                        type="url"
                        defaultValue={project?.projectRepo || ""}
                        className="ml-4 border-[#c9a030] focus:border-solid focus:scale-[105%] transition-all duration-300 ease-out border-2 text-xl text-[#2A1A08] py-4 px-4 rounded-2xl bg-[#fdf0c2] font-medium outline-none"
                        placeholder="https://github.com/username/project"
                    />
                </div>
                {error && (
                    <div>{error}</div>
                )}

                <div className="flex w-full items-center  justify-center ">
                    <button
                        type="submit"
                        className="text-4xl w-full border-4 border-dashed border-[#c9a030] bg-[#2A1A08] py-4 rounded-2xl text-[#fdf0c2] cursor-pointer"
                        disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" size={32} /> : (
                            isEditing ? "Save Changes" : "Create Project"
                        )}
                    </button>
                </div>
            </form>

        </>
    )
}
