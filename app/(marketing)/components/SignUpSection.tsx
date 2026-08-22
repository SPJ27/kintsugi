"use client"
import { Kalam } from "next/font/google"
import Sticker from "./StickerComponent"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { Loader2, MoveRight } from "lucide-react"

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
                            <button
                                disabled={loading}
                                onClick={async () => {
                                    try {
                                        setLoading(true)
                                        await authClient.signIn.oauth2({
                                            providerId: "hackclub",
                                            callbackURL: "/auth/callback",
                                        });
                                    } catch (error) {
                                        toast.error("Failed to sign in. Please try again");
                                        setLoading(false)
                                    }
                                }} className={`${kalam.className} group hover:scale-95 tracking-widest cursor-pointer transition-all duration-300 w-full text-3xl py-2 font-semibold uppercase rounded-2xl border-4 border-dashed border-[#1a1209] text-center items-center justify-center flex gap-2 text-[#2a1a08] bg-[#e8dfa0] `}>
                                {loading ? (
                                    <>
                                        <span className="flex justify-center items-center w-full h-full text-center">
                                            <Loader2 className="animate-spin" size={48} strokeWidth={2.5} />
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="translate-y-[0.5px]">Start</span>
                                        <span>
                                            <MoveRight className="group-hover:translate-x-1 transition-all duration-300" size={40} strokeWidth={2.5} />
                                        </span>
                                    </>
                                )}

                            </button>
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