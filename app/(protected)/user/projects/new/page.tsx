import { Kalam } from "next/font/google"
import ProjectForm from "./components/ProjectForm"

const kalam = Kalam({
    subsets : ['latin'],
    weight : ['300', '400', '700']
})
export default function page(){
    return(
      <main className={`${kalam.className} w-full h-[89.09vh] overflow-y-auto flex flex-col items-center bg-[#2A1A08] px-12 py-5 rounded-3xl border-12 border-[#c9a030]`}>
        <div className="text-4xl mx-auto font-bold">
            Create a Project     
        </div>
        <p className="text-[#2A1A08]/60 text-xl font-medium">Add Your Project Details here</p>
        <div className="mt-4 flex flex-col items-center text-center">
            <ProjectForm />
        </div>
      </main>  
    )
}