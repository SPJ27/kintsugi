'use client';

import { AnimatePresence } from "framer-motion";
import { Kalam, Rubik_Wet_Paint } from "next/font/google";
import { useState } from "react";
import {motion} from "framer-motion";

const kalam = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
})

const rubiks_wet_Paint = Rubik_Wet_Paint({
    subsets: ['latin'],
    weight: '400'
})

type ShipProjectFormProps = {
    project: any;
}

type Step = 1 | 2 | 3 | 4

export default function ShipProjectForm({
    project,
}: ShipProjectFormProps) {
    const [step, setStep] = useState<Step>(1);

    return (
        <div className={`${kalam.className}  mx-auto`}>
            <div className="relative h-14 mb-8">
                <h1 className={`absolute left-[7px]  top-[4px] text-center select-none text-4xl leading-none tracking-[2px] text-[#1a1209] ${rubiks_wet_Paint.className}`}>SHIP PROJECT</h1>
                <h1 className={`absolute select-none text-center text-4xl translate-x-2 leading-none tracking-[2px] text-[#f0c14d] ${rubiks_wet_Paint.className}  [-webkit-text-stroke:0.7px_#1a1209]`}>SHIP PROJECT</h1>
            </div>
            <div className="flex justify-center gap-4 items-center mb-10">
                {[1,2,3,4].map((item)=>(
                    <div key={item} className="flex items-center">
                        <div className={`w-70 h-3 rounded-full border-2 border-[#c9a030] flex items-center justify-center font-bold transition-all ${step >= item ? "bg-[#24221C] " : "bg-[#fff9e8]"}`}>
                        </div>
                    </div>
                ))}
            </div>
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                     key="step-1" 
                     initial={{opacity : 0, x : 40}}
                     animate={{opacity : 1, x:0}}
                     exit={{opacity : 0, x : -40}}
                     transition={{duration : 0.25}}
                     >
                          <div onClick={()=> setStep(2)}>
                              I am a  Banner Step
                          </div>
                    </motion.div>
                )}
                                {step === 2 && (
                    <motion.div
                     key="step-1" 
                     initial={{opacity : 0, x : 40}}
                     animate={{opacity : 1, x:0}}
                     exit={{opacity : 0, x : -40}}
                     transition={{duration : 0.25}}
                     >
                          <div onClick={()=> setStep(3)}>
                              I am a  Banner Step
                          </div>
                    </motion.div>
                )}
                                {step === 3 && (
                    <motion.div
                     key="step-1" 
                     initial={{opacity : 0, x : 40}}
                     animate={{opacity : 1, x:0}}
                     exit={{opacity : 0, x : -40}}
                     transition={{duration : 0.25}}
                     >
                          <div onClick={()=> setStep(4)}>
                              I am a  Banner Step
                          </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}