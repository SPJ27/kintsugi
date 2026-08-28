import { Podcast, User2Icon } from "lucide-react"
import { Kalam } from "next/font/google"

const kalam = Kalam({
    subsets : ['latin'],
    weight : ['300','400', '700']
})
export default function page(){    
    return(
        <div className="flex items-center justify-center h-full text-center">
            <div className="bg-[#24221C] text-[#c9a030] py-4 px-6 items-center text-center justify-center gap-4 flex flex-col border-4 border-dashed border-[#c9a030] rounded-2xl">
                <div>
                    <Podcast size={64} />
                </div>
                <div className={`text-2xl text-[#c9a030] ${kalam.className}`}>Nothing to show here at the moment</div>
            </div>
        </div>
    )
}