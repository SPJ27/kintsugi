import Doodle from "./Doodle";
import CoffeRing from "./CoffeeRing";
import FloatingCards from "./FloatingCards";
import FloatingLayer from "./FloatingLayer";
import LeftBar from "./LeftBar";
import NoteBookLines from "./NotebookLines";
import PaperNoise from "./PaperNoise";

export default function (){
    return(
        <div className="fixed inset-0 -z-50 overflow-hidden bg-[#fdf0c2]">
        <PaperNoise />
        {/* <NoteBookLines /> */}
        <CoffeRing bottom="15%"

right="5%"

rotate={-12}

size={90}
 />
        <FloatingLayer />
        <Doodle />
        <FloatingCards />
        <LeftBar />
        </div>
    )
}