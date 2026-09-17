import GotQuestions from "../components/landing/Got-Questions";
import Hero from "../components/landing/Hero";
import HowKintsugiWorks from "../components/landing/How-Kintsugi-Works";
import PotTiers from "../components/landing/Pot-tiers";
import SignUpSection from "../components/landing/SignUpSection";

export default function homePage(){
    return(
    <main className="mx-12">
        <Hero />
        <HowKintsugiWorks />
        <PotTiers />
        {/* <PreviousHackathon /> */}
        <GotQuestions />
        <SignUpSection />
    </ main>
    )
}
