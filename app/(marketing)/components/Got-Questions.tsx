"use client"
import { Kalam } from "next/font/google"
import Image from "next/image"
import { useState } from "react"
const kalam = Kalam({
    subsets: ['latin'],
    weight: ['300', '400', '700']
})
export default function GotQuestions() {
    const questions = [
        {
            id: 1,
            question: 'What is Kintsugi?',
            answer: "A Hack Club YSWS where you fix a real problem you ran into-Broken tool, Bad UI/UX,Nonsense workflow- and ship it open source."
        },
        {
            id: 2,
            question: "What do I get?",
            answer: "Once your Project gets reviewed and approved, You can trade your pots for a real kintsugi repair kit - Gold powder,resin,and a broken ceramic bowl or other cute kintsugi stuffs. 金継ぎ for real.",
        },
        {
            id: 3,
            question: "Rules to follow?",
            answer: "No double dipping unless your program allows. AI is okay but up to 30%- Track time with Hackatime or lapse. Don't vibecode it.Real work Only."
        },
        {
            id: 4,
            question: "How can I track time?",
            answer: "Software development time is tracked using and hardware time is tracked through Lapse."
        },
        {
            id: 5,
            question: 'What kind of projects can I make?',
            answer: 'You can submit any kind of Software or Hardware related project! It can either be an automation or any game or any web or any bot and  anything related to software!.',
        },
        {
            id: 6,
            question: "Need more help?",
            answer: "Ask at #kintsugi-help on Slack. Read the full FAQs at #kintsugi Your question will surely be answered."
        },
    ]
    const [openId, setOpenId] = useState<number | null>(null);
    const toggleQuestion = (id: number) => {
        setOpenId(openId === id ? null : id)
    }
    return (
        <div className="flex min-h-[80vh] flex-col">
            <div className="flex gap-2 flex-col items-center w-full">
                <h1 className={`${kalam.className} text-[#2a1a08] text-3xl sm:text-4xl font-bold`}>Got Questions?</h1>
                <p className={`text-base sm:text-lg ${kalam.className} text-[#ac9453]`}>Click the Pot to get assisted</p>
            </div>
            <div className="flex justify-center transition-all duration-300 items-center flex-col gap-4 mx-2 sm:mx-8">
                {questions.map((question) => {
                    const isOpen = openId === question.id
                    return (
                        <div key={question.id} onClick={() => toggleQuestion(question.id)} className="bg-[#2A1A08] transition-all duration-300 w-full py-4 border-4 border-dashed border-[#c9a030] px-4 sm:px-8 lg:px-12 rounded-3xl cursor-pointer hover:-translate-y-[2px]">
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-12">
                                    <Image src={'/pots/bronze.png'} alt="bronze-pot" fill className="absolute object-contain" />
                                </div>
                                <div className={`${kalam.className} text-lg sm:text-xl text-[#ac9453] font-bold`}>{question.question}</div>
                            </div>
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}>
                                <div className={`text-base sm:text-lg text-[#F5E4B0] font-extralight ${kalam.className} ml-0 sm:ml-4 lg:ml-6`}>{question.answer}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}