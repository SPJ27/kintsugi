import { requireRole } from "@/lib/auth-guard";
import Link from "next/link";

export default async function page() {
  const session = await requireRole("member");
  return (
    <main>
      <h1>You are logged in as an user Yay</h1>
      <p>Welcome, {session.user.name}</p>
      <div className="flex flex-col gap-2">
        {session?.user.role.map(
          (role, i) =>
            role !== "member" && role !== "superAdmin" && (<Link key={i} href={`/${role}`}>{role}</Link>)
        )}
      </div>
    </main>
  );
}
