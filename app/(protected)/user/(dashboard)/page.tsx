import { requireRole } from "@/lib/auth-guard"
import Link from 'next/link';

export default async function page() {
    const session = await requireRole('member');
    return (
        <div className="">
            <h1>You are logged in as a user Yay</h1>
            <p>Welcome, {session.user.name}</p>
            <div className="flex flex-col gap-2">
            </div>
        </div>
    )
}