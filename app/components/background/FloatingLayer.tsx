import FloatingDecoration from "./FloatingDecoration";

export default function FloatingLayer() {
    return (
        <>
            <FloatingDecoration top="10%" left="8%" rotation={12}>
                <p className="font-caveat text-xl text-[#623F24] italic">FIT IT</p>
            </FloatingDecoration>
            <FloatingDecoration top="30%" left="8% " rotation={-10}>
                <p className="font-caveat text-xl text-[#623F24] italic">金継ぎ</p>
            </FloatingDecoration>
            <FloatingDecoration bottom="50%" left="8%" rotation={-3}>
                <p className="font-caveat text-xl text-[#623F24] italic">SHIP IT</p>
            </FloatingDecoration>
                        <FloatingDecoration bottom="30%" left="8%" rotation={12}>
               <p className="font-caveat text-xl  italic text-[#623F24]">open src</p>
            </FloatingDecoration>
                        <FloatingDecoration bottom="10%" left="8%" rotation={-6}>
             <p className="font-caveat text-xl text-[#623F24] italic">★ hc</p>
            </FloatingDecoration>
        </>
    )
}
