import { requireAuth, requireRole } from "@/lib/auth-guard";
import { getHackatimeStatus } from "@/lib/db/user";
import { Kalam } from "next/font/google";
import { verification } from '../../../../db/schema';
const kalamFont = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
})
export default async function page() {
    const session = await requireAuth();
    const hackatimeConnected = await getHackatimeStatus(session.id);
    return (
        <div className={`flex flex-col gap-6 ${kalamFont.className} overflow-hidden`}>
            <div className={`bg-[#2A1A08] flex flex-col gap-4 border-2 border-dashed border-[#c9a030] py-8 px-6 rounded-2xl ${kalamFont.className}}`}>
                <div className={`${kalamFont.className} text-2xl text-[#F5E4B0]`}>12hrs logged</div>
                <div className="w-full h-6 bg-[#3A2C10] border-4 border-[#453416] rounded-full">
                    <div />
                </div>
            </div>
            <div className="flex flex-col gap-4">
            <div className="flex flex-col">
                <h1 className="text-[#2A1A08] uppercase text-4xl font-semibold">Welcome {session.name},</h1>
                <p className="text-lg text-[#C4B282]">Nothing Here Yet Pick Section</p>
            </div>
            <div className="flex flex-col justify-center items-center w-full h-[20vw] bg-[#FDF2CB] border-2 border-dashed border-[#c9a030] rounded-xl text-[#C4B282] text-2xl">
                {hackatimeConnected ?(
                    <div>Hackatime Connected</div>
                ) : (
                    <a href="/api/hackatime/connect">connect hackatime</a>
                )}
            </div>
            </div>
            <div className="flex gap-4">
                <div className="py-4 px-4 w-1/2 flex flex-col gap-2 rounded-xl border-2 border-dashed border-[#c9a030] bg-[#2A1A08]">
                        <h2 className="text-xl text-[#69583C]">YSWS ELIGIBILITY</h2>
                    <p className={`text-3xl ${session.verificationStatus === "verified" ?"text-[#7CAE73]" : "text-red-500"}`}>{session.verificationStatus === "verified" ? "Eligible" : "Not Eligible"}</p>
                </div>
                <div  className="py-4 px-4 w-1/2 flex flex-col gap-2 rounded-xl border-2 border-dashed border-[#c9a030] bg-[#2A1A08]">
                    <h2 className="text-xl text-[#69583C]">DOCS AND GUIDES</h2>
                    <p className="text-3xl hover:text-[#7d6114] text-[#c9a030] duration-300 transition-all cursor-pointer">PLEASE READ GUIDE!</p>
                </div>
            </div>
        </div>
    )
}
