import CoffeRing from "./CoffeeRing";
import Doodles from "./Doodles";
import FloatingLines from "./FloatingLines";
import NoteBookLines from "./NotebookLines";
import PaperNoise from "./PaperNoise";

export default function (){
    return(
        <div className="fixed inset-0 -z-50 overflow-hidden bg-[#fdf0c2]">
        <PaperNoise />
        <NoteBookLines />
        <CoffeRing bottom="15%"

right="5%"

rotate={-12}

size={90}
 />
        <FloatingLines />
        <Doodles />
        </div>
    )
}