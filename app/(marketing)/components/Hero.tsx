"use client"
import { authClient } from "@/lib/auth-client";
import { MoveRight } from "lucide-react";
import { Kalam, Rubik_Wet_Paint } from "next/font/google";
import Image from "next/image";
const kalam = Kalam({
    subsets: ['latin'],
    weight: ["300", "400", "700"]
})
const rubiks_Wet_Paint = Rubik_Wet_Paint({
    subsets: ['latin'],
    weight: "400"
})
export default function Hero() {
    const { data: session, isPending, error } = authClient.useSession();
    return (
        <div className="flex flex-col gap-4 relative min-h-screen justify-center items-center text-center px-2 py-16 sm:px-4 sm:py-20 lg:px-8 lg:py-24 overflow-x-hidden">

            <div className="hidden md:block absolute left-4 lg:left-14 pointer-events-none -top-6 z-2 border-1 w-20 h-4 border-[#d2b432] bg-[#FFF4968A]" />
            <div className={`hidden md:block absolute rotate-2 text-[#90782C] select-none -top-4 w-38 items-center text-left font-medium text-lg ${kalam.className} px-4 py-4 bg-[#FFEF6D] border-[#c8aa1e] border-1 shadow-[3px_4px_10px_rgba(0,0,0,0.1)] left-2 lg:left-4`}>
                HACK CLUB YSWS-Program <span className="font-light text-sm">Just ship it</span>
            </div>
            <div className="hidden md:block absolute right-8 lg:right-24 pointer-events-none -top-6 z-2 border-1 w-30 h-4 border-[#d2b432] bg-[#FFF4968A]" />
            <div className={`hidden md:block absolute select-none right-2 lg:right-8 rotate-2 text-[#90782C] -top-4 w-[18rem] lg:w-[17rem] items-center text-left font-medium text-sm ${kalam.className} px-4 py-4 bg-[#FFEF6D] border-[#c8aa1e] border-1 shadow-[3px_4px_10px_rgba(0,0,0,0.1)]`}>
                Work on projects for <span className="font-bold text-[#B88900] decoration-2 underline-offset-2 mr-1 decoration-[#745307] text-lg underline">50</span>
                <span className="underline text-lg text-[#B88900] font-bold decoration-2 decoration-[#745307] underline-offset-2">HOURS</span>
                <span> and come to a <span className="text-lg text-[#745307] font-bold">KINTSUGI </span>
                    Hackathon in <span className="text-[#B88900] font-bold">Tokyo</span>!!
                </span>
            </div>
            <div className="relative w-full max-w-6xl -translate-y-4 sm:-translate-y-8 lg:-translate-y-12 -rotate-2 hover:scale-[101%] hover:rotate-0 transition-all duration-300 mx-auto rounded-[32px] sm:rounded-[55px] border-[4px] shadow-[3px_5px_0_rgba(26,18,9,0.18)] border-[#24221C] bg-[#e8b93f] p-3 sm:p-4">
                <div className="hidden md:block absolute left-24 lg:left-80 -rotate-2 pointer-events-none -top-6 z-2 border-1 w-30 h-8 border-[#d2b432] bg-[#FFF4968A]" />

                <div className="relative h-[320px] sm:h-[380px] lg:h-[440px] w-full overflow-hidden rounded-[28px] sm:rounded-[45px] border-[3px] bg-[#fff9e8] border-[#24221C] ">
                    <div className="hidden sm:block absolute inset-0">
                        <div className="absolute left-[4%] top-[16%] h-24 w-28 sm:h-28 sm:w-40 md:h-32 md:w-48 rounded-md rotate-[-8deg] border-2 border-[#24221c] bg-[#fffdf5] shadow-[2px_3px_0_rgba(0,0,0,0.15)]">
                            <div className="absolute select-none left-6 top-6 h-10 w-16 rotate-[-12deg] rounded-full">
                                <Image src={'/images/doodle.svg'} fill alt={"doodle"} />
                            </div>
                        </div>
                        <div className="absolute left-[18%] top-[8%] h-24 w-36 sm:h-28 sm:w-44 md:h-28 md:w-48 rounded-md rotate-[4deg] border-2 border-[#24221c] bg-[#fffdf5] shadow-[2px_3px_0_rgba(0,0,0,0.15)]" />
                        <div className="absolute left-[35%] top-[10%] h-24 w-32 sm:h-28 sm:w-40 md:h-32 md:w-48 rounded-md rotate-[12deg] border-2 border-[#24221c] bg-[#fffdf5] shadow-[2px_3px_0_rgba(0,0,0,0.15)]">
                            <div className="absolute select-none left-8 top-12 h-10 w-10 rotate-[10deg] rounded-full">
                                <Image src={'/images/doodle.svg'} fill alt={"doodle"} />
                            </div>
                        </div>
                        <div className="absolute right-[28%] top-[10%] h-24 w-32 sm:h-28 sm:w-40 md:h-32 md:w-48 rounded-md rotate-[4deg] border-2 border-[#24221c] bg-[#fffdf5] shadow-[2px_3px_0_rgba(0,0,0,0.15)]" />
                        <div className="absolute right-[8%] top-[14%] h-24 w-28 sm:h-28 sm:w-36 md:h-28 md:w-44 rounded-md rotate-[4deg] border-2 border-[#24221c] bg-[#fffdf5] shadow-[2px_3px_0_rgba(0,0,0,0.15)]">
                            <div className="absolute select-none left-6 top-12 h-10 w-14 rotate-[-12deg] rounded-full">
                                <Image src={'/images/doodle.svg'} fill alt={"doodle"} />
                            </div>
                        </div>

                        <div className="absolute left-[10%] bottom-[16%] h-24 w-28 sm:h-28 sm:w-40 md:h-32 md:w-48 rounded-md rotate-[14deg] border-2 border-[#24221c] bg-[#fffdf5] shadow-[2px_3px_0_rgba(0,0,0,0.15)]">
                            <div className="absolute select-none right-6 bottom-12 h-10 w-10 rotate-[10deg] rounded-full">
                                <Image src={'/images/doodle.svg'} fill alt={"doodle"} />
                            </div>
                        </div>
                        <div className="absolute right-[8%] bottom-[16%] h-24 w-32 sm:h-28 sm:w-40 md:h-32 md:w-50 rounded-md rotate-[-14deg] border-2 border-[#24221c] bg-[#fffdf5] shadow-[2px_3px_0_rgba(0,0,0,0.15)]">
                            <div className="absolute select-none left-6 bottom-12 h-10 w-10 rotate-[10deg] rounded-full">
                                <Image src={'/images/doodle.svg'} fill alt={"doodle"} />
                            </div>
                        </div>
                        <div className="absolute left-[40%] top-[16%]">
                            <div className="w-32 h-32 sm:w-44 sm:h-44 lg:w-56 lg:h-56 relative rotate-24" >
                                <Image src={"/images/hero-star.svg"} alt="hero-star" className="absolute" fill />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 pt-10 sm:pt-16 lg:pt-20">
                    <div className="relative">
                        <h1 className={`absolute left-[4px] top-[3px] text-center select-none text-5xl sm:text-7xl lg:text-8xl xl:text-9xl leading-none tracking-[2px] text-[#1a1209] ${rubiks_Wet_Paint.className}`}>KINTSUGI</h1>
                        <h1 className={`relative select-none text-center text-5xl sm:text-7xl lg:text-8xl xl:text-9xl -translate-x-1 leading-none tracking-[2px] text-[#f0c14d] ${rubiks_Wet_Paint.className}  [-webkit-text-stroke:0.7px_#1a1209]`}>KINTSUGI</h1>
                    </div>
                    <p className="mt-3 sm:mt-4 font-caveat italic text-center text-sm sm:text-base lg:text-lg tracking-wide text-[#c7a653] font-bold select-none"> 金継ぎ - break it. fix it. ship it.</p>
                </div>
                <div className="hidden sm:block w-12 h-6 select-none absolute top-[38%] left-[20%] sm:left-[16%] lg:left-[20%] -rotate-40">
                    <Image src={'/images/doodle2.svg'} alt="doodle2" fill className="absolute" />
                </div>
            </div>
            <div className="w-full max-w-4xl -translate-y-4 sm:-translate-y-6 lg:-translate-y-8 relative items-center text-center flex flex-col sm:flex-row border-2 py-4 sm:py-6 px-4 sm:px-6 gap-3 sm:gap-4 border-dashed bg-[#2a1a08] border-[#c9a030] shadow-[3px_5px_0_rgba(26,18,9,0.18)] rounded-2xl" >
                <div className="hidden md:block absolute left-20 lg:left-80 -rotate-2 pointer-events-none -top-4 z-2 border-1 w-30 h-8 border-[#d2b432] bg-[#FFF4968A]" />
                <input type="text" required placeholder="enter your email..." className={`bg-[#3a3128] border-[1px] rounded-xl px-4 py-4 items-center justify-center text-[#f5e4b0] outline-none text-base sm:text-xl font-light ${kalam.className} w-full min-w-0`} />

                {!session && !isPending && (
                    <button
                        onClick={async () => {
                            await authClient.signIn.oauth2({
                                providerId: "hackclub",
                                callbackURL: "/auth/callback",
                            });
                        }} className={`${kalam.className} w-full sm:w-auto text-center items-center justify-center flex gap-2 text-[#2a1a08] cursor-pointer hover:-translate-y-1 transition-all duration-300 ease-in border-[2px] border-[#1a1209] bg-[#e8dfa0] py-4 px-4 rounded-xl text-lg`}>
                        <span>Start</span>
                        <span>
                            <MoveRight size={24} strokeWidth={1} />
                        </span>
                    </button>
                )}
                
                <div className="hidden md:block w-[1.5px] -bottom-8 left-100 absolute h-[22px] bg-[#d4a017] -translate-y-2">
                    <div className="block w-[5px] h-[5px] rounded-full bg-[#d4a017] m-auto translate-y-[21px]" />
                </div>
            </div>
        </div>
    )
}