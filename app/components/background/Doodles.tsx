import Image from "next/image";

interface DoodleProps {
    src: string;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    size?: number;
    rotation?: number;
    opacity?: number
}
export default function Doodles({
    src,
    top,
    left,
    right,
    bottom,
    size = 32,
    rotation = 0,
    opacity = 0.06,

}: DoodleProps) {
    return (
        <Image
            src={src}
            alt=""
            width={size}
            height={size}
            className="absolute pointer-events-none select-none"
            style={{
                top,
                left,
                right,
                bottom,
                opacity,
                transform: `rotate(${rotation}deg)`,
            }}
        />
    )
}