"use client"
import { Kalam } from "next/font/google"
import Sticker from "./StickerComponent"
import { authClient } from "@/lib/auth-client"

const kalam = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
})
export default function SignUpSection() {
    const { data: session, error, isPending } = authClient.useSession();
    return (
        <div className="flex my-12">
            <div className="bg-[#2A1A08] relative items-center flex flex-col lg:flex-row justify-between py-6 gap-8 border-4 border-dashed border-[#c9a030] w-full mx-0 sm:mx-2 lg:mx-8 px-4 sm:px-6 lg:px-8 rounded-4xl group-hover:scale-[101%] transition-all duration-300">
                <div className="flex flex-col gap-4 w-full lg:w-1/2">
                    <h1 className={`${kalam.className} text-left w-full text-[#c9a030] text-2xl sm:text-3xl font-bold`}>Login</h1>
                    <input type="text" placeholder="enter your email.." className={`bg-[#3a3128] border-[1px] rounded-xl px-4 py-4 items-center justify-center text-[#f5e4b0] outline-none text-lg sm:text-xl font-light ${kalam.className} w-full`} />

                    {!session && !isPending && (
                    <button onClick={async () => {
                        await authClient.signIn.oauth2({
                            providerId: "hackclub",
                            callbackURL: "/auth/callback",
                        });
                    }} className={`${kalam.className} cursor-pointer w-full bg-[#F5E4B0] py-4 text-xl sm:text-2xl rounded-xl `}>Sign up
                    </button>
                   )}
                    <p className={`text-[#F5E4B0] text-base sm:text-lg ${kalam.className}`}>By signing in you ensure you are under 18, not banned from hackclub and follow hackclub policies.</p>
                </div>
                <div className="relative w-full lg:w-auto flex justify-center">
                    <Sticker />
                </div>
            </div>
        </div>
    )
}