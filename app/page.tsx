"use client";

import { authClient } from "@/lib/auth-client";

const Page = () => {
  const { data: session, isPending, error } = authClient.useSession();

  console.log(session?.user);

  return (
    <div>
      {isPending && <h1>Loading...</h1>}

      {error && <p>Error loading session.</p>}

      {session && <h1>{session.user.name}</h1>}

      {!session && !isPending && (
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

      {session && !isPending && (
        <button
          onClick={async () => {
            await authClient.signOut();
          }}
        >
          Logout
        </button>
      )}

      {session && (
        <a href="/api/hackatime/connect">
          <button>Link Hackatime</button>
        </a>
      )}

    
    </div>
  );
};

export default Page;