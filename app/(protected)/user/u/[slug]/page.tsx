import { db } from "@/db";
import { user } from "@/db/schema";
import { requireRole } from "@/lib/auth-guard"
import { eq } from "drizzle-orm";
import Link from 'next/link';
import { notFound } from "next/navigation";

export default async function page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const profile = await db.query.user.findFirst({
        where: eq(user.slug, slug)
    })
    if (!profile) {
        notFound();
    }
    return (
        <main>
            <h1>You are logged in as an User Yay</h1>
            <p>Welcome, {profile.name}</p>
            <div className="flex flex-col gap-2">
                <Link href={'/admin'}>Admin</Link>
                <Link href={'/reviewer'}>Reviewer</Link>
            </div>
        </main >
    )
}