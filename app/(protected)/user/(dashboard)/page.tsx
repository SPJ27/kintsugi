import { user } from "@/db/schema";
import { requireAuth, requireRole } from "@/lib/auth-guard";
import { getHackatimeStatus } from "@/lib/db/user";
import { Kalam, Rubik_Wet_Paint } from "next/font/google";
import { toast } from "sonner";
import Button from "../components/Button";
const kalamFont = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
})
const rubiks_Wet_Paint = Rubik_Wet_Paint({
    subsets: ['latin'],
    weight: "400"
})
export default async function page() {
    const session = await requireAuth();
    const hackatimeConnected = await getHackatimeStatus(session.id);
    return (
        <div className={`flex flex-col gap-6 ${kalamFont.className} overflow-hidden`}>
            <div className={`bg-[#2A1A08] shadow-[3px_5px_0_rgba(26,18,9,0.18)] flex flex-col gap-4 border-2 border-dashed border-[#c9a030] py-8 px-6 rounded-2xl ${kalamFont.className}}`}>
                <div className={`${kalamFont.className} text-2xl text-[#F5E4B0]`}>0hrs logged</div>
                <div className="w-full h-6 bg-[#3A2C10] border-4 border-[#453416] rounded-full">
                    <div />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col ">
                    <div className="relative  h-14 md:h-10">
                        <h1 className={`absolute left-[7px]  top-[4px] text-center select-none text-3xl md:text-4xl leading-none tracking-[2px] text-[#1a1209] ${rubiks_Wet_Paint.className}`}>Welcome, {session?.name}</h1>
                        <h1 className={`absolute select-none text-center text-3xl md:text-4xl translate-x-1 leading-none tracking-[2px] text-[#f0c14d] ${rubiks_Wet_Paint.className}  [-webkit-text-stroke:0.7px_#1a1209]`}>Welcome, {session.name}</h1>
                    </div>
                    <p className="text-lg md:text-start text-center ml-2 translate-y-3 text-[#C4B282]">Nothing Here Yet Pick Section</p>
                </div>
                <div className="flex flex-col justify-center items-center w-full h-[40vh] bg-[#FDF2CB] border-2 border-dashed border-[#c9a030] rounded-xl text-[#C4B282] text-2xl ">
                    {hackatimeConnected ? (
                        <div>Hackatime Connected</div>
                    ) : (
                        <a href="/api/hackatime/connect">connect hackatime</a>
                    )}
                </div>
            </div>
            <div className="flex md:flex-row flex-col gap-4">
                <div className="py-4 px-4 h-30 w-full md:w-1/2 flex flex-col gap-2 rounded-xl border-2 border-dashed border-[#c9a030] bg-[#2A1A08]">
                    <h2 className="text-xl  text-[#69583C]">YSWS ELIGIBILITY</h2>
                    <p className={`text-3xl ${session.verificationStatus === "verified" ? "text-[#7CAE73]" : "text-red-500"}`}>{session.verificationStatus === "verified" ? "Eligible" : "Not Eligible"}</p>
                </div>
                <div className="py-4 px-4 h-30 w-full md:w-1/2 flex flex-col gap-2 rounded-xl border-2 border-dashed border-[#c9a030] bg-[#2A1A08]">
                    <Button />
                </div>
            </div>
        </div>
    )
}
