"use client";
import { authClient } from "@/lib/auth-client";

const page = () => {
  const {data: session, isPending, error} = authClient.useSession()
  console.log(session)
  return (
    <div>
      {isPending && <h1>Loading...</h1>}
      {session && <h1>{session.user.name}</h1>}
      {!session && !isPending && <button
        onClick={async () => {
          await authClient.signIn.oauth2({
            providerId: "hackclub",
            callbackURL: "/auth/callback",
          });
        }}
      >
        Login
      </button>}
      {session && !isPending && <button
        onClick={async () => {
          await authClient.signOut()
        }}
      >
        Logout
      </button>}
    </div>
  );
};

export default page;
