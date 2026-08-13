'use client'
import { Kalam } from "next/font/google"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createNewProject } from "@/actions/projects"
import { Loader2 } from "lucide-react"

const kalam = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
})
export default function ProjectForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
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
            <div>
                <label htmlFor="bannerFile">
                    Project Banner
                </label>
                <input 
                id="bannerFile" 
                type="file" 
                accept="image/*" 
                name="bannerFile" />
            </div>
            <div>
                <label htmlFor="name">Title</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="My awesome project"
                    required />
            </div>
            <div>
                <label htmlFor="desc">Description</label>
                <textarea
                id="desc"
                name="desc"
                placeholder="Tell us about your project"
                rows={5} />
            </div>
            <div>
                <label htmlFor="hackatimeProjects">Hackatime</label>
                <input 
                id="hackatimeProjects"
                name="hackatimeProjects"
                type="select"
                placeholder="Hackatime Projects"
                />
            </div>
            <div>
                <label htmlFor="projectDemo">Demo Url</label>
                <input
                id="projectDemo"
                name="projectDemo" 
                type="url"
                placeholder="https://myproject.vercel.app"
                 />
            </div>
            <div>
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