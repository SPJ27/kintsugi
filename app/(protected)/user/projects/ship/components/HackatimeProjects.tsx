'use client'
import { submitShipProject } from "@/actions/ship-form";
import { Check, ChevronDown, ChevronLeft, ChevronUp, Circle, CircleCheck, Loader2, ShipIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type HackatimeProject = {
    name: string;
    total_seconds?: number;
    formattedString: string
}
type FormData = {
    name: string;
    description: string;
    shipText: string;
    projectRepo: string;
    projectDemo: string;
}
type FinalShipProps = {
    project: any;
    hackatimeProjects: HackatimeProject[];
    formData: FormData;
    onBack: () => void
}
export default function FinalShip({ project, hackatimeProjects, formData, onBack }: FinalShipProps) {
    const router = useRouter();
    const [hackatimeOpen, setHackatimeOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedProjects, setSelectedProjects] = useState<string[]>(project?.hackatimeProjects ?? []);
    const [aiDeclaration, setAiDeclaration] = useState(false);
    const [fraudDeclaration, setFraudDeclaration] = useState(false);
    const [shipping, setShipping] = useState(false);

    const toggleProject = (projectName: string) => {
        setSelectedProjects((current) => current.includes(projectName) ? current.filter((name) => name !== projectName) : [...current, projectName])
    }
    const projects = hackatimeProjects ?? [];
    const filteredProjects = projects.filter(
        (project) => project.name.toLowerCase().includes(search.toLowerCase()));
    const totalSeconds = selectedProjects.reduce(
        (total, projectName) => {
            const project = projects.find(
                (item) => item.name === projectName
            );
            return total + (project?.total_seconds ?? 0);
        },
        0
    )
    const approvedSeconds = project.approvedSeconds
    const hours = Math.floor((totalSeconds - approvedSeconds) / 3600);
    const minutes = Math.floor(((totalSeconds - approvedSeconds) % 3600) / 60);
    const canShip = selectedProjects.length > 0 && aiDeclaration && fraudDeclaration && !shipping;
    const handleShip = async () => {
        if (!canShip) return;
        try {
            setShipping(true);
            const result = await submitShipProject(
                project.id,
                formData.shipText,
                selectedProjects,
                {
                    name: formData.name,
                    description: formData.description,
                    projectRepo: formData.projectRepo,
                    projectDemo: formData.projectDemo,
                }
            );
            if (!result.success) {
                toast.error(result.error);
                return;
            }
            toast.success("Project shipped successfully!");
            router.push(`/user/projects/view/${project.id}`)
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while shipping")
        } finally {
            setShipping(false);
        }
    }
    const formattedString = (totalSeconds: number) => {return `${Math.floor(totalSeconds/3600)}h ${Math.floor((totalSeconds%3600)/60)}m`}

    return (
        <div className="mx-6 relative">
            <button onClick={onBack} disabled={shipping} className="absolute hover:scale-90 transition-all duration-300 cursor-pointer -top-40 -left-12 bg-[#24221C] border-3 cursor-pointer  text-[#c9a030] px-1 py-1 rounded-xl border-[#c9a030]">
                <ChevronLeft />
            </button>
            <div className="flex flex-col gap-4">
                <div>
                    <h2 className="text-2xl text-[#24221C] font-bold">One Last Review</h2>
                    <p className="text-md text-[#f0c14d]">Select the projects whose tracked time you are submitting</p>
                </div>
                <div className="relative mx-4">
                    <div
                        className={`w-full cursor-pointer border-2 border-[#c9a030] flex items-center text-xl text-[#2a1a08] py-4 px-2 rounded-2xl bg-[#fdf0c2] font-medium text-left transition-all duration-300 ${hackatimeOpen ? "rounded-t-2xl rounded-b-none" : "rounded-2xl"}`}
                        onClick={() => setHackatimeOpen((prev) => !prev)}>
                        <div className="min-w-0 flex-1 overflow-hidden">{selectedProjects.length === 0 ? (
                            <div className="mx-4 translate-y-1">No Projects Selected</div>
                        ) : (
                            <div className="flex gap-2 items-center overflow-x-auto kintsugi-scrollbar  px-4 min-w-0 max-w-full whitespace-nowrap ">
                                {selectedProjects.map((project) => (
                                    <div key={project}>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedProjects((prev) => prev.filter((name) => name !== project))
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
                    </div>
                    {hackatimeOpen && (
                        <div className="absolute  z-50  w-full rounded-b-2xl border-x-2 border-b-2 border-[#c9a030]  bg-[#fdf0c2] shadow-xl overflow-hidden">
                            <div className="p-3 border-b-2 border-[#c9a030]/30">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search projects..."
                                    autoFocus
                                    className="w-full border-2 border-[#c9a030]/30 rounded-xl px-4 py-3 text-lg text-[#2a1a08] bg-white/50 outline-none focus:border-[#c9a030]"
                                />
                            </div>
                            <div className="max-h-44 overflow-y-auto p-2 kintsugi-scrollbar">
                                {shipping ? (
                                    <div className="p-4 text-center text-[#2a1a08]/70">Loading Hackatime projects...</div>
                                ) : filteredProjects.length === 0 ? (
                                    <div className="p-4 text-center text-[#2a1a08]/70">No Projects Found</div>
                                ) : (
                                    <div className="flex flex-col gap-2">

                                        {filteredProjects.map((project) => {
                                            const selected = selectedProjects.includes(project.name);
                                            return (

                                                <div
                                                    key={project.name}
                                                    onClick={() => {
                                                        setSelectedProjects((prev) => selected ? prev.filter((name) => name !== project.name) : [...prev, project.name])
                                                    }}
                                                    className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl text-left text-lg transition-all ${selected ? "bg-[#c9a030]/30" : "hover:bg-[#c9a030]/15"}`}
                                                >
                                                    <div>
                                                        {selected ? <CircleCheck /> : <Circle />}
                                                    </div>
                                                    <span className="truncate">{project.name} <span className="text-xs text-neutral-700">{formattedString(project.total_seconds ?? 0)}</span></span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {selectedProjects.map((project) => (
                        <input
                            key={project}
                            type="hidden"
                            name="hackatimeProjects"
                            value={project}
                        />
                    ))}

                    <div className="flex flex-col gap-3 mt-4">
                        <button
                            type="button"
                            disabled={shipping}
                            onClick={() => setAiDeclaration((prev) => !prev)}
                            className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${aiDeclaration ? "bg-[#c9a030]/25 border-[#c9a030] shadow-[3px_0px_#24221C]" : "bg-[#fdf0c2] border-[#c9a030] border-[#c9a030]/60 hover:border-[#c0a030] hover:bg-[#c9a030]/10"}`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-7 h-7 shrink-0 border-2 rounded-lg flex items-center justify-center transition-all duration-200 ${aiDeclaration ? "bg-[#24221C] border-[#24221C] rotate-3" : "bg-[#fff9e8] border-[#c9a030]"}`}>
                                    {
                                        aiDeclaration && (
                                            <span>
                                                <Check className="text-[#c9a030] text-lg font-bold" />
                                            </span>
                                        )
                                    }
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-[#242221C]">AI Declaration</p>
                                    <p className="text-sm text-[#2a1a08]/70">I confirm that I have followed the project's AI usage requirements and have honestly represented my use of AI.</p>
                                </div>
                            </div>
                        </button>
                    </div>
                    <div className="flex flex-col gap-3 mt-4">
                        <button
                            type="button"
                            disabled={shipping}
                            onClick={() => setFraudDeclaration((prev) => !prev)}
                            className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${fraudDeclaration ? "bg-[#c9a030]/25 border-[#c9a030] shadow-[3px_0px_#24221C]" : "bg-[#fdf0c2] border-[#c9a030] border-[#c9a030]/60 hover:border-[#c0a030] hover:bg-[#c9a030]/10"}`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-7 h-7 shrink-0 border-2 rounded-lg flex items-center justify-center transition-all duration-200 ${fraudDeclaration ? "bg-[#24221C] border-[#24221C] rotate-3" : "bg-[#fff9e8] border-[#c9a030]"}`}>
                                    {
                                        fraudDeclaration && (
                                            <span>
                                                <Check className="text-[#c9a030] text-lg font-bold" />
                                            </span>
                                        )
                                    }
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-[#242221C]">Fraud Declaration</p>
                                    <p className="text-sm tezt-[#2a1a08]/70">I confirm that the information in this submission is accurate, that the tracked time is genuine, and that I am not attempting to manipulate or misrepresent my work.</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                    <div className="text-[#24221C]">
                        <p className="text-lg font-bold">Ready to ship?</p>
                        <p className="text-sm text-[#2a1a08]/70">
                            {hours}h {minutes}m of tracked time will be shipped
                        </p>
                    </div>
                    <button
                        type="button"
                        disabled={!canShip}
                        onClick={handleShip}
                        className={`px-8 py-3 rounded-2xl border-3 border-dashed text-xl font-bold transition-all duration-200 ${canShip ? "bg-[#24221C] text-[#c9a030] border-[#c9a030] cursor-pointer hover:scale-95 hover:shadow-shadow-[3px_3px_0_#c9a030]" : "bg-[#b9b1a0] text-[#746f63] border-[#746f63] cursor-not-allowed opacity-60"}`}>
                        {
                            shipping ?
                                <span className="flex flex-col justify-center items-center text-center w-full">
                                    <Loader2 className="animate-spin" />
                                </span> :
                                <span className="flex w-full gap-2">
                                    <span>
                                        Ship Project
                                    </span>
                                    <span>
                                        <ShipIcon />
                                    </span>
                                </span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}