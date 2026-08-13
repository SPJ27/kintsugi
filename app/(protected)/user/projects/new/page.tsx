import { Kalam } from "next/font/google"
import ProjectForm from "./ProjectForm"

const kalam = Kalam({
    subsets : ['latin'],
    weight : ['300', '400', '700']
})
export default function page(){
    return(
      <main className={`${kalam.className}`}>
        <div className="text-2xl font-bold text-[#2A1A08]">
            Create a Project            
        </div>
        <p className="text-[#2A1A08]/60 text-xl font-medium">Add Your Project Details here</p>
        <div className="mt-4">
            <ProjectForm />
        </div>
      </main>  
    )
}