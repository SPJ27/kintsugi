"use client"
import {motion} from "framer-motion"
interface FloatingDecorationProps {
    children: React.ReactNode;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    rotation?: number;

}
export default function FloatingDecoration({children, top, bottom, left, right, rotation=0}:FloatingDecorationProps) {
    return (
        <motion.div 
        className="absolute pointer-events-none select-none opacity-30"
        style={{
            top,
            left,
            right,
            bottom,
            rotate : `${rotation}deg`
        }}
        >
            {children}
        </motion.div>
    )
}