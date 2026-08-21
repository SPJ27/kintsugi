'use client'
import { useEffect, useRef } from "react"

export default function Loading(){
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(()=>{
        if(videoRef.current){
            videoRef.current.playbackRate = 1;
        }
    },[])
    return(
    <div className="flex justify-center items-center h-screen ">
        <video src={'/videos/loading.mp4'} ref={videoRef} autoPlay loop muted playsInline/>
    </div>

)}