import Doodles from "./Doodles"

const icons = [
    'star.svg',
    'random-doodle.svg',
    'spark.svg',
]

const doodles = Array.from({length : 20}).map((_,i)=>({
    id : i,
    src : `/images/${icons[Math.floor(Math.random() * icons.length)]}`,
    top :  `${Math.random() * 90}%`,
    left :  `${Math.random() * 90}%`,
    rotation : Math.random() * 40 -20,
    opacity : 0.08 + Math.random() * 0.12,
    size : 20 + Math.random() * 20,
}))
export default function Doodle(){
    return(
    <>
    {doodles.map((doodle)=>(
        <Doodles key={doodle.id} {...doodle} />
    ))}
    </>)
}