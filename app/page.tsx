"use client";
import { authClient } from "@/lib/auth-client";

const page = () => {
  const { data: session, isPending, error } = authClient.useSession();
  console.log(session?.user)
  return (
    <div>
      {isPending && <h1>Loading...</h1>}
      {session && <h1>{session.user.name}</h1>}
      {session && !session.user.hackatimeLinked && (
        <a href="/api/hackatime/connect">
          <button>Link Hackatime</button>
        </a>
      )}
      {session && session.user.hackatimeLinked && (
        `Hackatime Already Linked`
      )}
      {!session && !isPending &&  (
        <button
          onClick={async () => {
            await authClient.signIn.oauth2({
              providerId: "hackclub",
              callbackURL: "/auth/callback",
            });
          }}
        >
          Login
        </button>
      )}
      {session && (
        <button
          onClick={async () => {
            await authClient.signOut();
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default page;
