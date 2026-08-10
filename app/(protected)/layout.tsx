import { requireAuth } from "@/lib/auth-guard"


export default async function ProtectedLayout({
    children
}: {
    children: React.ReactNode
}) {
    await requireAuth();
    return <>{children}</>
}