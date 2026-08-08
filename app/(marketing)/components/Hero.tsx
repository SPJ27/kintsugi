import { MoveRight } from "lucide-react";
import { Kalam } from "next/font/google";
import Image from "next/image";
const kalam = Kalam({
    subsets: ['latin'],
    weight: ["300", "400", "700"]
})
export default function Hero() {

    return (
        <div className="flex flex-col gap-12 relative min-h-screen justify-center items-center text-center ">
            <div className="relative -rotate-2 hover:scale-[104%] hover:rotate-0 transition-all duration-300 mx-auto max-w-6xl rounded-[55px] border-[4px] shadow-[3px_5px_0_rgba(26,18,9,0.18)] border-[#24221C] bg-[#e8b93f]  p-4">
                <div className="absolute left-80 -rotate-2 pointer-events-none -top-6 z-2 border-1 w-30 h-8 border-[#d2b432] bg-[#FFF4968A]" />

                <div className="relative h-[380px] overflow-hidden w-200 rounded-[45px] border-[3px] bg-[#fff9e8] border-[#24221C] ">
                    <div className=" absolute left-10 top-16 h-32 w-56 rounded-md rotate-[-8deg] border-2 border-[#24221c] bg-[#fffdf5] shadow-[2px_3px_0_rgba(0,0,0,0.15)]">
                        <div className="absolute left-10 top-8 h-12 w-20 rotate-[-12deg]  rounded-full">
                            <Image src={'/images/doodle.svg'} fill alt={"doodle"} />
                        </div>
                    </div>
                    <div className=" absolute left-28 top-8 h-28 w-48 rounded-md rotate-[4deg] border-2 border-[#24221c] bg-[#fffdf5] shadow-[2px_3px_0_rgba(0,0,0,0.15)]" />
                    <div className=" absolute left-74 top-10 h-32 w-48 rounded-md rotate-[12deg] border-2 border-[#24221c] bg-[#fffdf5] shadow-[2px_3px_0_rgba(0,0,0,0.15)]">
                        <div className="absolute left-10 top-16 h-12 w-12 rotate-[10deg] rounded-full">
                            <Image src={'/images/doodle.svg'} fill alt={"doodle"} />

                        </div>
                    </div>
                    <div className=" absolute right-52 top-8 h-32 w-48 rounded-md rotate-[4deg] border-2 border-[#24221c] bg-[#fffdf5] shadow-[2px_3px_0_rgba(0,0,0,0.15)]" />
                    <div className=" absolute right-18 top-14 h-28 w-44 rounded-md rotate-[4deg] border-2 border-[#24221c] bg-[#fffdf5] shadow-[2px_3px_0_rgba(0,0,0,0.15)]">
                        <div className="absolute left-10 top-16 h-12 w-16 rotate-[-12deg] rounded-full">
                            <Image src={'/images/doodle.svg'} fill alt={"doodle"} />
                        </div>
                    </div>

                    <div className=" absolute left-22 bottom-18 h-32 w-48 rounded-md rotate-[14deg] border-2 border-[#24221c] bg-[#fffdf5] shadow-[2px_3px_0_rgba(0,0,0,0.15)]">
                        <div className="absolute right-10 bottom-16 h-12 w-12 rotate-[10deg] rounded-full">
                                                        <Image src={'/images/doodle.svg'} fill alt={"doodle"} />

                        </div>
                    </div>
                    <div className=" absolute right-22 bottom-18 h-32 w-50 rounded-md rotate-[-14deg] border-2 border-[#24221c] bg-[#fffdf5] shadow-[2px_3px_0_rgba(0,0,0,0.15)]">
                        <div className="absolute left-10 bottom-16 h-12 w-12 rotate-[10deg] rounded-full">
                            <Image src={'/images/doodle.svg'} fill alt={"doodle"} />

                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pt-24">
                    <h1 className="select-none text-center text-[72px] font-black leading-none tracking-[-5px] text-[#efbd3e]  [-webkit-text-stroke:3px_#24221c] drop-shadow-[5px_7px_0_#24221c] ">KINTSUGI</h1>
                    <p className="mt-4 font-caveat italic text-center text-sm tracking-wide text-[#c7a653] font-bold"> 金継ぎ - break it. fix it. ship it.</p>
                </div>

            </div>
            <div className="w-200 relative items-center text-center flex border-2 py-6 px-6 gap-4 border-dashed bg-[#2a1a08] border-[#c9a030] shadow-[3px_5px_0_rgba(26,18,9,0.18)] rounded-2xl" >
                <div className="absolute left-80 -rotate-2 pointer-events-none -top-4 z-2 border-1 w-30 h-8 border-[#d2b432] bg-[#FFF4968A]" />
                <input type="text" placeholder="enter your email..." className={`bg-[#3a3128] border-[1px] rounded-xl px-4 py-4 items-center justify-center text-[#f5e4b0]  outline-none text-xl font-light ${kalam.className} w-full`} />
                <button className={`${kalam.className} text-center items-center justify-center flex gap-2 text-[#2a1a08] cursor-pointer hover:-translate-y-1 transition-all duration-300 ease-in border-[2px] border-[#1a1209] bg-[#e8dfa0] h-full py-4 px-4 rounded-xl text-lg`}>
                    <span>Start</span>
                    <span>
                        <MoveRight size={24} strokeWidth={1} />
                    </span>
                </button>
                <div className="w-[1.5px] -bottom-8 left-100 absolute h-[22px] bg-[#d4a017] -translate-y-2">
                    <div className="block w-[5px] h-[5px] rounded-full bg-[#d4a017] m-auto translate-y-[21px]" />
                </div>
            </div>
        </div>
    )
}