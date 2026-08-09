'use client'
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex mx-8 justify-between mt-4">
            <div className="relative select-none w-36 h-20 -top-4 -left-8">
                <Image src='/images/flag-orpheus-top.svg' alt="flag-orpheus-top" fill className="absolute" />
            </div>
            <Link href={'https://rsvp.hackclub.community/kintsugi'} className="relative w-32 h-12 shadow-lg hover:scale-112 hover:-rotate-6 transition-all duration-300">
                <Image src={'/images/rsvp.png'} alt="rsvp-here" className="absolute" fill />
            </ Link>
        </nav>
    )
}