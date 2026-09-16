'use client';

import { AnimatePresence } from "framer-motion";
import { Kalam, Rubik_Wet_Paint } from "next/font/google";
import { useState } from "react";
import { motion } from "framer-motion";
import BannerStep from "./Banner";
import ProjectDetailsStep from "./ProjectDetailsStep";
import FinalShip from "./HackatimeProjects";

const kalam = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
})

const rubiks_wet_Paint = Rubik_Wet_Paint({
    subsets: ['latin'],
    weight: '400'
})

type HackatimeProject = {
    name: string;
    total_seconds?: number;
}
type ShipProjectFormProps = {
    project: any;
    hackatimeProjects: HackatimeProject[];
}

type Step = 1 | 2 | 3

type FormData = {
    name: string;
    description: string;
    shipText: string;
    projectRepo: string;
    projectDemo: string;
}

export default function ShipProjectForm({
    project, hackatimeProjects
}: ShipProjectFormProps) {
    const [step, setStep] = useState<Step>(1);

    const [formData, setFormData] = useState<FormData>({
        name: project?.name ?? "",
        description: project?.description ?? "",
        shipText: "",
        projectRepo: project?.projectRepo ?? "",
        projectDemo: project?.projectDemo ?? "",
    });

    const updateFormData = (patch: Partial<FormData>) => {
        setFormData((prev) => ({ ...prev, ...patch }));
    };

    return (
        <div className={`${kalam.className}  mx-auto`}>
            <div className="relative h-14 mb-8 translate-y-6 ml-4">
                <h1 className={`absolute left-[7px]  top-[4px] text-center select-none text-4xl leading-none tracking-[2px] text-[#24221C] ${rubiks_wet_Paint.className}`}>SHIP PROJECT</h1>
                <h1 className={`absolute select-none text-center text-4xl translate-x-2 leading-none tracking-[2px] text-[#f0c14d] ${rubiks_wet_Paint.className}  [-webkit-text-stroke:0.7px_#1a1209]`}>SHIP PROJECT</h1>
            </div>
            <div className="flex justify-center gap-4 items-center mb-10">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center">
                        <div className={`w-95 h-3 rounded-full border-2 border-[#c9a030] flex items-center justify-center font-bold transition-all ${step >= item ? "bg-[#24221C] " : "bg-[#fff9e8]"}`}>
                        </div>
                    </div>
                ))}
            </div>
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step-1"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.25 }}
                    >
                        <BannerStep project={project} onNext={() => setStep(2)} />
                    </motion.div>
                )}
                {step === 2 && (
                    <motion.div
                        key="step-2"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.25 }}
                    >
                        <ProjectDetailsStep
                            project={project}
                            values={formData}
                            onChange={updateFormData}
                            onBack={() => setStep(1)}
                            onNext={() => setStep(3)}
                        />
                    </motion.div>
                )}
                {step === 3 && (
                    <motion.div
                        key="step-3"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.25 }}
                    >
                        <FinalShip
                            onBack={() => setStep(2)}
                            project={project}
                            hackatimeProjects={hackatimeProjects}
                            formData={formData}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}