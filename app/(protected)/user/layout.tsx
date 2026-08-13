import { requireAuth } from "@/lib/auth-guard";
import UserLayoutClient from "./components/UserLayoutClient";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await requireAuth();

    return (
        <UserLayoutClient displayName={session.name ?? "User"}>
            {children}
        </UserLayoutClient>
    );
}
