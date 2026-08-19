export default function page(){
    return(
        <div className="flex flex-col relative justify-center items-center h-screen">
            <div>
                <video src={'/images/loading.webm'} autoPlay loop muted playsInline />
            </div>
            <div className={`absolute text-9xl font-bold [text-stroke:4px_black] [-webkit-text-stroke:4px_black] text-[#c9a030] animate-wiggle`}> 404</div>
            <div>
                <a href={'/user/projects'}  className="px-12 mt-4 shadow-[3px_5px_0_rgba(26,18,9,0.18)] gap-4 py-4 flex cursor-pointer border-[#c9a030] font-medium justify-center text-[#c9a030] items-center bg-[#2A1A08] border-4 border-dashed rounded-2xl uppercase text-4xl">Back to Home</a>
            </div>
        </div>
    )
}