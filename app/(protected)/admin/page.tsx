import { requireRole } from "@/lib/auth-guard";
import Link from "next/link";

export default async function page(){
    const session = await requireRole("admin");
    return(
        <main>
            <h1>You are logged in as an admin Yay</h1>
            <p>Welcome, {session.name}</p>
            <div className="flex flex-col gap-4">
                <Link href={'/user'}>Go To User Dash</Link>
                <Link href={'/reviewer'}>Go To reviewer</Link>
            </div>
        </main>
    )
}