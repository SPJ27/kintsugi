"use client"
import { authClient } from "@/lib/auth-client";
import { MoveRight } from "lucide-react";
import { Kalam, Rubik_Wet_Paint } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
const kalam = Kalam({
    subsets: ['latin'],
    weight: ["300", "400", "700"]
})
const rubiks_Wet_Paint = Rubik_Wet_Paint({
    subsets: ['latin'],
    weight: "400"
})
export default function Hero() {
    const authDisabled = process.env.NEXT_PUBLIC_AUTH_DISABLED === "true";

    const { data: session, isPending, error } = authClient.useSession();
    return (
        <div className="flex flex-col gap-4 relative min-h-screen justify-center items-center text-center px-4 pt-28 pb-8 md:pt-0 md:pb-0">

            {/* Mobile-only badges (the taped sticky notes below are too fiddly to reflow, so we swap in a simple stacked version under sm) */}
            <div className={`flex md:hidden flex-col gap-2 items-center text-[#90782C] mb-2 ${kalam.className}`}>
                <div className="rotate-1 text-left font-medium text-sm px-3 py-2 bg-[#FFEF6D] border-[#c8aa1e] border-1 shadow-[3px_4px_10px_rgba(0,0,0,0.1)] rounded">
                    HACK CLUB YSWS-Program <span className="font-light text-xs">Just ship it</span>
                </div>
                <div className="-rotate-1 text-left font-medium text-sm px-3 py-2 bg-[#FFEF6D] border-[#c8aa1e] border-1 shadow-[3px_4px_10px_rgba(0,0,0,0.1)] rounded">
                    Work on projects for <span className="font-bold text-[#B88900] underline decoration-2 underline-offset-2 decoration-[#745307]">50 HOURS</span> and come to a <span className="font-bold text-[#745307]">KINTSUGI</span> Hackathon in <span className="font-bold text-[#B88900]">Tokyo</span>!!
                </div>
            </div>

            <div className="hidden md:block absolute left-14 pointer-events-none -top-6 z-2 border-1 w-20 h-4 border-[#d2b432] bg-[#FFF4968A]" />
            <div className={`hidden md:block absolute rotate-2 text-[#90782C] select-none -top-4 w-38 items-center text-left font-medium text-lg ${kalam.className} px-4 py-4 bg-[#FFEF6D] border-[#c8aa1e] border-1 shadow-[3px_4px_10px_rgba(0,0,0,0.1)] left-4`}>
                HACK CLUB YSWS-Program <span className="font-light text-sm">Just ship it</span>
            </div>
            <div className="hidden md:block absolute right-24 pointer-events-none -top-6 z-2 border-1 w-30 h-4 border-[#d2b432] bg-[#FFF4968A]" />
            <div className={`hidden md:block absolute select-none right-8 rotate-2 text-[#90782C] -top-4 w-68 items-center text-left font-medium text-sm ${kalam.className} px-4 py-4 bg-[#FFEF6D] border-[#c8aa1e] border-1 shadow-[3px_4px_10px_rgba(0,0,0,0.1)] `}>
                Work on projects for <span className="font-bold text-[#B88900] decoration-2 underline-offset-2 mr-1 decoration-[#745307] text-lg underline">50</span>
                <span className="underline text-lg text-[#B88900] font-bold decoration-2 decoration-[#745307] underline-offset-2">HOURS</span>
                <span> and come to a <span className="text-lg text-[#745307] font-bold">KINTSUGI </span>
                    Hackathon in <span className="text-[#B88900] font-bold">Tokyo</span>!!
                </span>
            </div>
            <div className="relative -translate-y-4 sm:-translate-y-8 md:-translate-y-12 -rotate-2 hover:scale-[104%] hover:rotate-0 transition-all duration-300 mx-auto w-full max-w-[800px] rounded-[28px] sm:rounded-[38px] md:rounded-[55px] border-[4px] shadow-[3px_5px_0_rgba(26,18,9,0.18)] border-[#24221C] bg-[#e8b93f]  p-3 sm:p-4">
                <div className="hidden md:block absolute left-80 -rotate-2 pointer-events-none -top-6 z-2 border-1 w-30 h-8 border-[#d2b432] bg-[#FFF4968A]" />

                <div className="relative h-[200px] sm:h-[300px] md:h-[380px] overflow-hidden w-full rounded-[22px] sm:rounded-[32px] md:rounded-[45px] border-[3px] bg-[#fff9e8] border-[#24221C] ">
                    <div className="hidden sm:block absolute left-10 top-16 h-32 w-56 rounded-md rotate-[-8deg] border-2 border-[#24221c] bg-[#fffdf5] shadow-[2px_3px_0_rgba(0,0,0,0.15)]">
                        <div className="absolute select-none left-10 top-8 h-12 w-20 rotate-[-12deg]  rounded-full">
                            <Image src={'/images/doodle.svg'} fill alt={"doodle"} />
                        </div>
                    </div>
                    <div className="hidden sm:block absolute left-28 top-8 h-28 w-48 rounded-md rotate-[4deg] border-2 border-[#24221c] bg-[#fffdf5] shadow-[2px_3px_0_rgba(0,0,0,0.15)]" />
                    <div className="hidden sm:block absolute left-74 top-10 h-32 w-48 rounded-md rotate-[12deg] border-2 border-[#24221c] bg-[#fffdf5] shadow-[2px_3px_0_rgba(0,0,0,0.15)]">
                        <div className="absolute select-none left-10 top-16 h-12 w-12 rotate-[10deg] rounded-full">
                            <Image src={'/images/doodle.svg'} fill alt={"doodle"} />

                        </div>
                    </div>
                    <div className="hidden sm:block absolute right-52 top-8 h-32 w-48 rounded-md rotate-[4deg] border-2 border-[#24221c] bg-[#fffdf5] shadow-[2px_3px_0_rgba(0,0,0,0.15)]" />
                    <div className="hidden sm:block absolute right-18 top-14 h-28 w-44 rounded-md rotate-[4deg] border-2 border-[#24221c] bg-[#fffdf5] shadow-[2px_3px_0_rgba(0,0,0,0.15)]">
                        <div className="absolute select-none left-10 top-16 h-12 w-16 rotate-[-12deg] rounded-full">
                            <Image src={'/images/doodle.svg'} fill alt={"doodle"} />
                        </div>
                    </div>

                    <div className="hidden sm:block absolute left-22 bottom-18 h-32 w-48 rounded-md rotate-[14deg] border-2 border-[#24221c] bg-[#fffdf5] shadow-[2px_3px_0_rgba(0,0,0,0.15)]">
                        <div className="absolute select-none right-10 bottom-16 h-12 w-12 rotate-[10deg] rounded-full">
                            <Image src={'/images/doodle.svg'} fill alt={"doodle"} />

                        </div>
                    </div>
                    <div className="hidden sm:block absolute right-22 bottom-18 h-32 w-50 rounded-md rotate-[-14deg] border-2 border-[#24221c] bg-[#fffdf5] shadow-[2px_3px_0_rgba(0,0,0,0.15)]">
                        <div className="absolute select-none left-10 bottom-16 h-12 w-12 rotate-[10deg] rounded-full">
                            <Image src={'/images/doodle.svg'} fill alt={"doodle"} />

                        </div>
                    </div>
                    <div className="hidden sm:block absolute left-60  top-16">
                        <div className="w-60 select-none h-60 relative rotate-24" >
                            <Image src={"/images/hero-star.svg"} alt="hero-star" className="absolute" fill />
                        </div>
                    </div>
                </div>

                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pt-10 sm:pt-16 md:pt-24">
                    <div className="relative">
                        <h1 className={`absolute left-[3px] top-[2px] sm:left-[4px] sm:top-[3px] text-center select-none text-4xl sm:text-6xl md:text-8xl lg:text-9xl leading-none tracking-[2px] text-[#1a1209] ${rubiks_Wet_Paint.className}`}>KINTSUGI</h1>
                        <h1 className={`relative select-none text-center text-4xl sm:text-6xl md:text-8xl lg:text-9xl -translate-x-1 leading-none tracking-[2px] text-[#f0c14d] ${rubiks_Wet_Paint.className}  [-webkit-text-stroke:0.7px_#1a1209]`}>KINTSUGI</h1>
                    </div>
                    <p className="mt-2 sm:mt-4 font-caveat italic text-center text-xs sm:text-sm tracking-wide text-[#c7a653] font-bold select-none"> 金継ぎ - break it. fix it. ship it.</p>
                </div>
                <div className="hidden sm:block w-12 h-6 select-none absolute top-38 left-60 -rotate-40">
                    <Image src={'/images/doodle2.svg'} alt="doodle2" fill className="absolute" />
                </div>
            </div>
            <div className="w-full max-w-[860px] flex-col sm:flex-row -translate-y-4 sm:-translate-y-8 md:-translate-y-12 relative items-center text-center flex border-2 py-6 px-6 gap-4 border-dashed bg-[#2a1a08] border-[#c9a030] shadow-[3px_5px_0_rgba(26,18,9,0.18)] rounded-2xl" >
                <div className="hidden md:block absolute left-80 -rotate-2 pointer-events-none -top-4 z-2 border-1 w-30 h-8 border-[#d2b432] bg-[#FFF4968A]" />
                {!session && !isPending && !authDisabled && (
                    <>
                        <input type="text" required placeholder="enter your email..." className={`bg-[#3a3128] border-[1px] rounded-xl px-4 py-4 items-center justify-center text-[#f5e4b0]  outline-none text-xl font-light ${kalam.className} w-full`} />

                        <button
                            onClick={async () => {
                                await authClient.signIn.oauth2({
                                    providerId: "hackclub",
                                    callbackURL: "/auth/callback",
                                });
                            }} className={`${kalam.className} text-center items-center justify-center flex gap-2 text-[#2a1a08] cursor-pointer hover:-translate-y-1 transition-all duration-300 ease-in border-[2px] border-[#1a1209] bg-[#e8dfa0] h-full w-full sm:w-auto py-4 px-4 rounded-xl text-lg`}>
                            <span>Start</span>
                            <span>
                                <MoveRight size={24} strokeWidth={1} />
                            </span>
                        </button>
                    </>
                )}
                {session && !isPending && (
                    <Link className={`${kalam.className} w-full text-2xl sm:text-3xl py-2 font-semibold uppercase rounded-2xl border-4 border-dashed border-[#1a1209] text-center items-center justify-center flex gap-2 text-[#2a1a08] bg-[#e8dfa0] `} href={'/user'}>
                        Open Dashboard
                    </Link>
                )}
                {!session && !isPending && authDisabled && (
                    <p className={`${kalam.className} text-[#F5E4B0] text-lg flex justify-center items-center w-full`}>
                        Sign-ins are temporarily closed. Please check back soon.
                    </p>
                )}
                <div className="hidden sm:block w-[1.5px] -bottom-8 left-100 absolute h-[22px] bg-[#d4a017] -translate-y-2">
                    <div className="block w-[5px] h-[5px] rounded-full bg-[#d4a017] m-auto translate-y-[21px]" />
                </div>
            </div>
        </div>
    )
}
