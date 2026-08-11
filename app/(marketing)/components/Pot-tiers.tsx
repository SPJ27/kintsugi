import { Kalam } from "next/font/google"
import Image from "next/image"

const kalam = Kalam({
    subsets: ['latin'],
    weight: ["300", "400", "700"]
})
export default function PotTiers() {
    const Cards = [
        {
            id: 1,
            icon: "✦",
            image: "/pots/silver.png",
            title: "1 Silver Pots",
            description: "Work on a real problem for 10+ hours.. Log em properly.Commit regularly.",
            tags: "10hrs"
        },
        {
            id: 2,
            icon: "✦",
            image: '/pots/bronze.png',
            title: "1 Bronze Pots",
            description: "Work on a general project for any amount of hours. Get one pot for each hour you code.",
            tags: "general"
        },
        {
            id: 3,
            icon: "✦✦",
            image: "/pots/silver.png",
            title: "2 Silver Pots",
            description: "People actually use it. HC Staff and community really like it.Solves it for many not just you.",
            tags: "Community loved"
        },
        {
            id: 4,
            icon: "✦",
            image: "/pots/golden.png",
            title: "1 Gold Pots",
            description: "Well made ProjectGood storytelling and visible efforts Something which blows up our socks.Not just basic webpage.",
            tags: "Full Stack"
        },
        {
            id: 5,
            icon: "✦✦✦",
            image: "/pots/silver.png",
            title: "3 Silver Pots",
            description: "30+ logged hours, Qualifies previous silver tiers.",
            tags: "30 hrs grind",
        },
        {
            id: 6,
            image: "/images/event-ticket.png",
            title: "Hackathon Ticket ✈️",
            description: "Work on a general project for 50 hours The rarest Tier.金継ぎ master..",
            tags: "50hrs. ELITE HACKATHON",
        },
    ]

    return (
        <div className="flex flex-col gap-4 min-h-screen py-8 sm:py-12">
            <div className="flex gap-2 flex-col items-center w-full">
                <h1 className={`${kalam.className} text-[#2a1a08] text-3xl sm:text-4xl font-bold`}>Pot tiers</h1>
                <p className={`text-base sm:text-lg ${kalam.className} text-[#ac9453]`}>The more you fix,the Shinier your pot</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 w-full">
                {Cards.map((card) => (
                    <div key={card.id} className="w-full max-w-[26rem] mx-auto min-h-[280px] rounded-4xl bg-[#2A1A08] px-6 py-6 justify-between border-4 border-[#c9a030] border-dashed flex flex-col gap-2 cursor-grab transition-all duration-300 hover:scale-[101%] hover:shadow-[3px_8px_0_rgba(26,18,9,0.18)] hover:-translate-y-2">
                        <div className="select-none">
                           <Image src={card.image} alt={card.title} width={120} height={120} /> 
                        </div>
                        <div className={`flex gap-2 text-[#F5E4B0] font-medium text-xl sm:text-2xl ${kalam.className}`}>
                            <div>{card.icon}</div>
                            <div>{card.title}</div>
                        </div>
                        <div className={`text-[#A3926D] text-lg sm:text-xl ${kalam.className}`}>
                            {card.description}
                        </div>
                        <div className={`${kalam.className} bg-[#3d2A08] w-fit text-lg sm:text-xl px-4 py-2 rounded-3xl items-center text-center justify-center flex text-[#c9a030]`}>
                            {card.tags}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}