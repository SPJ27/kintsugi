"use client"
import { delay, motion } from "framer-motion";
import { useState } from "react";

const cards = [
    {
        title: 'fix it',
        icon: "★",
        left: '4%',
        rotate: -12,
    },
    {
        title: 'ship it!',
        left: '34%',
        rotate: 8,

    },
    {
        title: '金継ぎ',
        left: '64%',
        rotate: -17,

    },
    {
        title: 'open src',
        icon: "★",
        left: '84%',
        rotate: 22,

    }
]
const random = (min: number, max: number) => Math.random() * (max - min) + min
export default function FloatingCards() {
    const [animations] = useState(
        ()=> cards.map(()=>({
            duration : random(14,28),
            delay : random(0,10),
            exitY : random(-120, 30),
            driftX : random(-30, 30),
            rotation : random(-3,3),
            repeatDelay : random(0,5)
        }))
    )
    return (
        <div className="pointer-events-none opacity-60 absolute inset-0 z-10 overflow-hidden">

            {cards.map((card,index) => {
                const animation = animations[index];

                return (
                    <motion.div
                        key={card.title}
                        className="absolute w-[150px] h-[40px] rounded-lg border-2 bg-[#FFEF6D] border-[#8C6D21] p-5 text-[#8C6D21] flex justify-center items-center text-center"
                        style={{
                            left: card.left,
                        }}
                        initial={{
                            y : "110vh",
                            rotate : card.rotate,
                            opacity : 0,
                            x : 0,
                        }}
                        animate={{
                            y : `${animation.exitY}vh`,
                            x : animation.driftX,
                            rotate : card.rotate + animation.rotation,
                            opacity : [0,1,1,0]
                        }}
                        transition={{
                            duration : animation.duration,
                            delay : animation.delay,
                            repeat :Infinity,
                            repeatDelay : animation.repeatDelay,
                            ease : "linear",
                            times : [0, 0.12, 0.75, 1]
                        }}
                    >
                        <div className="flex items-center text-center gap-2">
                            <span className="text-xl font-caveat">{card.title}</span>
                            <span className="text-xl font-caveat">{card.icon}</span>
                        </div>
                    </motion.div>)
            })}
        </div>
    )
}