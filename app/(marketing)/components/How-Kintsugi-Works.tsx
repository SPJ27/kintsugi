import { Kalam } from "next/font/google"

const kalam = Kalam({
    subsets: ['latin'],
    weight: ["300", "400", "700"]
})
export default function HowKintsugiWorks() {
    const Cards = [
        {
            id: 1,
            icon: "✎",
            title: "Find It",
            description: "Find some broken things, fix them and SHIP it. Every SHIP Counts.",
            tag: "bugs + issues"
        },
        {
            id: 2,
            icon: "✐",
            title: "Fix It",
            description: "Patch up them Beautifully. Make it better than it was ever that's the KINTSUGI way, One ship = 1 Pot Fix.",
            tag: "Code+hours+commits"
        },
        {
            id: 3,
            icon: '⇧',
            title: "Ship it",
            description: "Ship your project, We reward you your pots.",
            tag: "Code + Submit"
        },
        {
            id: 4,
            icon: "★",
            title: "Grind & Earn",
            description: "Stack shiny pots by shipping and reedeem them for rewards and EVENT TICKETthen show off. 金継ぎ forever.",
            tag: "Pots and Prizes"
        }
    ]
    return (
        <div className="flex flex-col gap-4 min-h-screen">
            <div className="flex gap-2 flex-col items-center w-full">
                <h1 className={`${kalam.className} text-[#2a1a08] text-4xl font-bold`}>How KINTSUGI Works?</h1>
                <p className={`text-lg ${kalam.className} text-[#ac9453]`}>Break it. Fix it. Ship it.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 place-items-center xl:grid-cols-4 gap-4 mt-20 justify-center items-center">
                {Cards.map((card) => (
                    <div key={card.id} className="w-80 col-span-1 cursor-grab px-6 items-center justify-between py-12 border-4 border-dashed rounded-3xl h-120 bg-[#2a1a08] border-[#c9a030] transition-all duration-300  hover:shadow-[8px_10px_0_rgba(26,18,9,0.18)] hover:-rotate-2 hover:-translate-y-2">
                        <div className={`${kalam.className} flex justify-between h-full flex-col gap-4 text-[#FDF0C2]`}>
                            <div className="flex gap-2 text-4xl">
                                <div>{card.icon}</div>
                                <div>{card.title}</div>
                            </div>
                            <div className="text-2xl font-light">{card.description}</div>
                            <div className="text-lg bg-[#3d2A08] w-fit px-2 py-2 rounded-full text-[#c9a030]">{card.tag}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}