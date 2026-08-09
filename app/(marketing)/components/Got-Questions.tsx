import { Kalam } from "next/font/google"

const kalam = Kalam({
    subsets : ['latin'],
    weight : ['300', '400', '700']
})
export default function GotQuestions(){
    return(
        <div className="flex min-h-[80vh]">
                        <div className="flex gap-2 flex-col items-center w-full">
                <h1 className={`${kalam.className} text-[#2a1a08] text-4xl font-bold`}>Got Questions?</h1>
                <p className={`text-lg ${kalam.className} text-[#ac9453]`}>Click the Pot to get assisted</p>
            </div>
        </div>
    )
}