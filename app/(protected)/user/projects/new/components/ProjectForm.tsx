'use client'
import { Kalam } from "next/font/google"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createNewProject } from "@/actions/projects"
import { ImageIcon, Loader2, Upload } from "lucide-react"
import { getHackatimeProjects } from "@/actions/hackatime"
import Image from "next/image"
const kalam = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
})
export default function ProjectForm() {
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
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [projectsLoading, setProjectsLoading] = useState(true);
    const handleFile = (file: File | undefined) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file.");
            return;
        }
        setBannerFile(file);
        setBannerPreview(URL.createObjectURL(file));
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
            }
            setProjectsLoading(false);
        }
        loadProjects()
    }, [])
    const handleSubmit = async (formData: FormData) => {
        try {
            setLoading(true);
            const result = await createNewProject(formData);
            if (!result.success) {
                setError(result.error);
                return;
            }
            router.push(`/projects/${result.project.id}`);
        }
        catch (error) {
            toast.error("Failed to create project");
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <form action={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2 text-xl">
                <label htmlFor="bannerFile" >
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
                    className="flex w-full justify-center flex-col items-center gap-4 border-2 rounded-3xl border-dashed"
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFile(e.target.files?.[0])}
                    />
                    {
                        bannerFile && bannerPreview ? (
                                <div className="relative w-full h-98 overflow-hidden rounded-2xl">
                                <Image src={bannerPreview} alt={bannerFile.name} fill className="object-cover" />
                                </div>
                        ) : (
                            <>
                                <div>
                                    <Upload />
                                </div>
                                <p>
                                    Drag and drop a screenshot or a banner for your project
                                </p>
                                <p>
                                    or click to browse your files
                                </p>
                            </>
                        )
                    }
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="name">Title</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="My awesome project"
                    required />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="desc">Description</label>
                <textarea
                    id="desc"
                    name="desc"
                    placeholder="Tell us about your project"
                    rows={5} />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="hackatimeProjects">Hackatime</label>
                {projectsLoading ? (
                    <div>Loading Hackatime projects...</div>
                ) : projects.length === 0 ? (
                    <div>No Hackatime projects found.</div>
                ) : (
                    <div>
                        {projects.map((project) => (
                            <label key={project.name}>
                                <input type="checkbox" name="hackatimeProjects" value={project.name} />
                                <span>{project.name}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="projectDemo">Demo Url</label>
                <input
                    id="projectDemo"
                    name="projectDemo"
                    type="url"
                    placeholder="https://myproject.vercel.app"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="projectRepo">Repository URL</label>
                <input
                    id="projectRepo"
                    name="projectRepo"
                    type="url"
                    placeholder="https://github.com/username/project"
                />
            </div>
            {error && (
                <div>{error}</div>
            )}
            <button
                type="submit"
                disabled={loading}>
                {loading ? <Loader2 /> : "Create Project"}
            </button>
        </form>
    )
}