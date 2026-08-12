import { requireRole } from "@/lib/auth-guard"
import Link from 'next/link';

export default async function page() {
    const session = await requireRole('reviewer');
    console.log(session)
    return (
        <main>
            <h1>You are logged in as an Reviewer Yay</h1>
            <p>Welcome, {session.name}</p>
            <div className="flex flex-col gap-2">
                <Link href={'/admin'}>Admin</Link>
                <Link href={'/user'}>User</Link>
            </div>
        </main >
    )
}