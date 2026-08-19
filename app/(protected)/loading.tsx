'use client'
import { useEffect, useRef } from "react";
export default function Loading() {
        const videoRef = useRef<HTMLVideoElement>(null);
        useEffect(()=>{
            if(videoRef.current){
                videoRef.current.playbackRate = 1;
            }
        },[])
    return (
        <div className="flex flex-col min-h-screen w-full items-center justify-center text-center">
            <video src={'/images/loading.webm'} ref={videoRef} autoPlay loop muted playsInline />

        </div>
    )
}