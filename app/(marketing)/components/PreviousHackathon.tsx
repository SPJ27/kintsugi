import { Kalam } from "next/font/google";
import Image from "next/image";
const kalam = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
})
export default function PreviousHackathon() {
    return (
        <div className={`flex relative group min-h-[60vh] my-16 justify-center ${kalam.className} `}>
            <div className="bg-[#2A1A08]  py-24 flex gap-4 justify-center border-4 border-dashed border-[#c9a030] w-full mx-8 px-6 rounded-4xl group-hover:scale-102 cursor-grab transition-all duration-300">
                <div className="flex justify-between flex-col gap-4">
                    <div className="text-3xl font-bold text-[#c9a030] ">
                        This december,110+ hackclubbers from every corner will code and fix in japan for a 4 day long patchy hackathon
                    </div>
                    <div className="text-2xl text-[#F5E4B0] font-light">
                        This hackathon will be organised by <span className="underline decoration-2 underline-offset-4 decoration-dashed text-[#c9a030]">Hack Club</span>, A US bases 501(c)(3) nonprofit and network of 100,000 teens across the world.
                    </div>
                    <div className="text-2xl text-[#F5E4B0] font-light">
                        The whole hackathon including food ,accomodation ,activity etc. will be <span className="font-bold text-[#B88900]">free of cost</span> for all the attendees.Travel and flight stipend would be availaible for free too!
                    </div>
                    <div className="text-xl text-[#A3926D] font-extralight">
                        Photos from a hc hackathon held in Singapore
                    </div>
                </div>
                <div className="bg-[#F5E4B0] py-5 px-5 rotate-6">
                    <div className="w-160 select-none h-100 relative">
                        <Image src={'/images/hc1.webp'} alt="hc-event" className="absolute" fill />

                    </div>
                              <div className="absolute right-70  pointer-events-none z-2 border-1 w-20 h-8 -rotate-4 -top-5 border-[#d2b432] bg-[#FFF4968A]" />

                </div>
            </div>
            <div className="absolute group-hover:scale-108 cursor-grab transition-all duration-300 z-2 border-1 w-40 h-12 rotate-4 -top-4 border-[#d2b432] bg-[#FFF4968A]" />

        </div>
    )
}