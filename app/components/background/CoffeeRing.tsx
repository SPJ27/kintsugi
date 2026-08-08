interface CoffeeRingProps{
    top? : string;
    bottom? : string;
    left? : string;
    right? : string;
    rotate : number;
    size? : number;
}
export default function CoffeRing(
    {top, bottom, left, right, rotate =0, size = 100} : CoffeeRingProps
){
    return(
        <div 
        className="coffee-ring -rotate-12 scale-x-160"
        style={{top, bottom, left, right, width : size, height : size, transform :  `rotate(${rotate}deg)` }}
        />
    )
}