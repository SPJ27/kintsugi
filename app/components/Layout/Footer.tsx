import { Dot } from "lucide-react";
import { Kalam } from "next/font/google";
const kalam = Kalam({
    subsets : ['latin'],
    weight : ['300', '400', '700'],
})
export default function Footer() {
    return (
        <div className={`bg-[#2A1A08] px-12 flex items-center justify-around ml-4 min-h-[25vh] rounded-t-4xl border-t-4 border-dashed border-[#c9a030] ${kalam.className}`}>
            <div className="flex gap-4 flex-col">
                <h1 className={`text-2xl font-semibold text-[#c9a030]`}>Hack Club</h1>
                <p className="w-80 text-[#F5E4B0] font-extralight text-md">Hack Club is the world's largest non-profit movement of teenagers making cool projects.</p>
                <p className="flex text-[#A3926D] font-light text-sm">&copy; Hack Club <Dot /> All Rights Reserved</p>
            </div>
            <div className="flex flex-col gap-2 ">
                    <div className="text-2xl font-bold text-[#c9a030]">Directory</div>
            <div className="text-[#F5E4B0] flex flex-col gap-2">
                <div><a href="https://hackclub.com/philosophy" target="_blank" rel="noopener noreferrer" >Philosophy</a></div>
                <div><a href="https://hackclub.com/team" target="_blank" rel="noopener noreferrer" >Team Cluster</a></div>
                <div><a href="https://hackclub.com/brand" target="_blank" rel="noopener noreferrer" >Brand Asset</a></div>
                <div><a href="https://hackclub.com/philanthropy" target="_blank" rel="noopener noreferrer" >Philanthropy</a></div>
            </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="text-2xl font-bold text-[#c9a030]">Resources</div>
                <div className="text-[#F5E4B0] flex flex-col gap-2" >
                <div><a href="https://hackclub.com/jams" target="_blank" rel="noopener noreferrer" >System Jams</a></div>
                <div><a href="https://toolbox.hackclub.com/" target="_blank" rel="noopener noreferrer" >ToolBox Matrix</a></div>
                <div><a href="https://hackclub.com/conduct" target="_blank" rel="noopener noreferrer" >Legal Conduct</a></div>
                <div><a href="https://hackclub.com/philanthropy" target="_blank" rel="noopener noreferrer" >Data Privacy</a></div>
                </div>
            </div>       
         </div>
    )
}