import { Kalam } from "next/font/google"

const kalam = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
})
export default function SignUpSection() {
    return (
        <div className="flex my-12">
            <div className="bg-[#2A1A08] relative items-center  flex-col flex justify-between  py-6  gap-4  border-4 border-dashed border-[#c9a030] w-full mx-8 px-6 rounded-4xl group-hover:scale-102 transition-all duration-300">
                <h1 className={`${kalam.className} text-left w-full text-[#c9a030] text-2xl font-bold`}>Login</h1>
                <input type="text" placeholder="enter your email.." className={`bg-[#3a3128] border-[1px] rounded-xl px-4 py-4 items-center justify-center text-[#f5e4b0]  outline-none text-xl font-light ${kalam.className} w-full`} />
                <button className={`${kalam.className} w-full bg-[#F5E4B0] py-4 text-2xl rounded-xl `}>Sign up</button>
                <p className={`text-[#F5E4B0] text-lg ${kalam.className}`}>By signing in you ensure you are under 18 ,not banned from hackclub and follow hackclub policies.</p>
            </div>
        </div>
    )
}