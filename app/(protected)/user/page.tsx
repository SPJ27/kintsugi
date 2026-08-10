import { requireRole } from "@/lib/auth-guard"
import Link from 'next/link';

export default async function page() {
    const session = await requireRole('member');
    return (
        <main>
            <h1>You are logged in as an user Yay</h1>
            <p>Welcome, {session.user.name}</p>
            <div className="flex flex-col gap-2">
                <Link href={'/admin'}>Admin</Link>
                <Link href={'/reviewer'}>Reviewer</Link>
            </div>
        </main >
    )
}