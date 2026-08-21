"use client";

import { ArrowLeft, ChevronLeft } from "lucide-react";
import { useState } from "react";

type ProjectDetailsStepProps = {
    project: any;
    onBack: () => void;
    onNext: () => void;
}
export default function ProjectDetailsStep({
    project, onBack, onNext
}: ProjectDetailsStepProps) {
    const [name, setName] = useState(project?.name ?? "");
    const [description, setDescription] = useState(project?.description ?? "");
    const [projectRepo, setProjectRepo] = useState(project?.projectRepo ?? "");
    const [projectDemo, setProjectDemo] = useState(project?.projectDemo ?? "");
    return (
        <div className="mx-6 relative">
            <button onClick={onBack} className="absolute hover:scale-90 transition-all duration-300 cursor-pointer -top-40 -left-12 bg-[#24221C] border-3 cursor-pointer  text-[#c9a030] px-1 py-1 rounded-xl border-[#c9a030]">
                <ChevronLeft />
            </button>
            <div className="flex  justify-between items-center">
                <div>
                    <h2 className="text-2xl text-[#24221C] font-bold">Let's review your Banner</h2>
                    <p className="text-md text-[#f0c14d]">Make sure your project looks good before sending it for review.</p>
                </div>
                <div>
                    <button className="text-2xl font-bold bg-[#24221C] px-4 py-1 rounded-xl border-3 border-dashed border-[#c9a030] text-[#c9a030] cursor-pointer hover:scale-90 transition-all duration-300" onClick={onNext}><span className="-translate-y-4 w-full h-full">Next</span></button>
                </div>
            </div>
            <div className="mt-4 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="project-name" className="text-[#2A1A08] ml-4 text-2xl font-bold">Title</label>
                    <input
                        type="text"
                        id="project-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="My awesome project."
                        className="ml-4 border-[#c9a030]  focus:border-solid focus:scale-[105%] transition-all duration-300 ease-out border-2 text-xl text-[#2A1A08] py-4 px-4 rounded-2xl bg-[#fdf0c2] font-medium outline-none"

                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="project-description" className="text-[#2A1A08] ml-4 text-2xl font-bold">Description</label>
                    <textarea
                        id="project-description"
                        className="ml-4 border-[#c9a030] focus:border-solid focus:scale-[105%] transition-all duration-300 ease-out border-2 text-xl text-[#2A1A08] py-4 px-4 rounded-2xl bg-[#fdf0c2] font-medium outline-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tell us about your project"
                        rows={5} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="project-demo" className="text-[#2A1A08] ml-4 text-2xl font-bold">Demo URL</label>
                    <input
                        type="url"
                        id="project-demo"
                        value={projectDemo}
                        onChange={(e) => setProjectDemo(e.target.value)}
                        placeholder="https://myproject.vercel.app"
                        className="ml-4 border-[#c9a030]  focus:border-solid focus:scale-[105%] transition-all duration-300 ease-out border-2 text-xl text-[#2A1A08] py-4 px-4 rounded-2xl bg-[#fdf0c2] font-medium outline-none"

                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="project-repo" className="text-[#2A1A08] ml-4 text-2xl font-bold">Repository URL</label>
                    <input
                        type="url"
                        id="project-repo"
                        value={projectRepo}
                        onChange={(e) => setProjectRepo(e.target.value)}
                        placeholder="https://myproject.vercel.app"
                        className="ml-4 border-[#c9a030]  focus:border-solid focus:scale-[105%] transition-all duration-300 ease-out border-2 text-xl text-[#2A1A08] py-4 px-4 rounded-2xl bg-[#fdf0c2] font-medium outline-none"

                    />
                </div>
            </div>
        </div>
    )
}