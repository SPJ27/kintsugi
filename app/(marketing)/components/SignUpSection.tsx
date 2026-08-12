"use client"
import { Kalam } from "next/font/google"
import Sticker from "./StickerComponent"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const kalam = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
})
export default function SignUpSection() {
    const { data: session, error, isPending } = authClient.useSession();
    const [loading, setLoading] = useState(false);
    const authDisabled = process.env.NEXT_PUBLIC_AUTH_DISABLED === "true";
    return (
        <div className="flex my-12">
            <div className="bg-[#2A1A08] relative min-h-60 items-center flex justify-between  py-6  gap-12  border-4 border-dashed border-[#c9a030] w-full mx-8 px-6 rounded-4xl group-hover:scale-102 transition-all duration-300">
                <div className="flex flex-col gap-4 w-1/2">
                    <h1 className={`${kalam.className} text-left w-full text-[#c9a030] text-2xl font-bold`}>Login</h1>
                    {!session && !isPending && !authDisabled && (
                        <>
                            <input type="text" placeholder="enter your email.." className={`bg-[#3a3128] border-[1px] rounded-xl px-4 py-4 items-center justify-center text-[#f5e4b0]  outline-none text-xl font-light ${kalam.className} w-full`} />

                            <button onClick={async () => {
                                try {
                                    setLoading(true)
                                    await authClient.signIn.oauth2({
                                        providerId: "hackclub",
                                        callbackURL: "/auth/callback",
                                    })
                                } catch {
                                    toast.error("Failed to login")
                                }
                                finally {
                                    setLoading(false)
                                }
                            }} className={`${kalam.className} cursor-pointer w-full bg-[#F5E4B0] py-4 text-2xl rounded-xl `}>{loading ? (<Loader2 className="animate-spin" />) : "Sign up"}</button>
                            <p className={`text-[#F5E4B0] text-lg ${kalam.className}`}>By signing in you ensure you are under 18, not banned from hackclub and follow hackclub policies.</p>
                        </>
                    )}
                    {session && !isPending && !authDisabled && (
                        <Link className={`${kalam.className} w-full text-3xl py-2 font-semibold uppercase rounded-2xl border-4 border-dashed border-[#1a1209] text-center items-center justify-center flex gap-2 text-[#2a1a08] bg-[#e8dfa0] `} href={'/user'}>
                            Go to Dashboard
                        </Link>
                    )}
                    {!session && !isPending && authDisabled && (
                        <p className={`${kalam.className} text-[#F5E4B0] text-lg`}>
                            Sign-ins are temporarily closed. Please check back soon.
                        </p>
                    )}
                </div>
                <div className="relative">
                    <Sticker />
                </div>
            </div>
        </div>
    )
}