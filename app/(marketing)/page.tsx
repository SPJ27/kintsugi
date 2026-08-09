import GotQuestions from "./components/Got-Questions";
import Hero from "./components/Hero";
import HowKintsugiWorks from "./components/How-Kintsugi-Works";
import PotTiers from "./components/Pot-tiers";
import PreviousHackathon from "./components/PreviousHackathon";
import SignUpSection from "./components/SignUpSection";

export default function homePage(){
    return(
    <main className="mx-12">
        <Hero />
        <HowKintsugiWorks />
        <PotTiers />
        <PreviousHackathon />
        <GotQuestions />
        <SignUpSection />
    </ main>
    )
}

// "use client";
// import { authClient } from "@/lib/auth-client";

// const page = () => {
//   const { data: session, isPending, error } = authClient.useSession();
//   console.log(session?.user)
//   return (
//     // <div>
//     //   {isPending && <h1>Loading...</h1>}
//     //   {session && <h1>{session.user.name}</h1>}
//     //   {!session && !isPending && <button
//     //     onClick={async () => {
//     //       await authClient.signIn.oauth2({
//     //         providerId: "hackclub",
//     //         callbackURL: "/auth/callback",
//     //       });
//     //     }}
//     //   >
//     //     Login
//     //   </button>}
//     //   {session && !isPending && <button
//     //     onClick={async () => {
//     //       await authClient.signOut()
//     //     }}
//     //   >
//     //     Logout
//     //   </button>}
//     // </div>
//     <div>
      
//     </div>
//   );
// };


// export default page;
