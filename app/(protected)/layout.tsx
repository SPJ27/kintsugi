import { requireAuth } from "@/lib/auth-guard";
import UserLayoutClient from "./user/components/UserLayoutClient";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await requireAuth();

    return (
        <UserLayoutClient displayName={session.name ?? "User"} roles={session.role ?? []}>
            {children}
        </UserLayoutClient>
    );
}
