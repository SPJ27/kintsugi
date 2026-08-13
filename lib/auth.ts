import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { genericOAuth } from "better-auth/plugins";

import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  // Keep Better Auth on the same public origin used by the OAuth callback.
  // The project configures this as BETTER_AUTH_URL, not BASE_URL.
  baseURL: process.env.BETTER_AUTH_URL,

  user: {
    additionalFields: {
      verificationStatus: { type: "string" },
      slackId: { type: "string" },
      pots: { type: "number", defaultValue: 0 },
      role: { type: "string[]", defaultValue: ["member"] },
      hackatimeLinked: { type: "boolean", defaultValue: false },
      slug: { type: "string" },
    },
  },

  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "hackclub",
          discoveryUrl:
            "https://auth.hackclub.com/.well-known/openid-configuration",
          clientId: process.env.HACKCLUB_CLIENT_ID!,
          clientSecret: process.env.HACKCLUB_CLIENT_SECRET!,
          scopes: [
            "openid",
            "profile",
            "email",
            "verification_status",
            "slack_id",
          ],
          overrideUserInfo: true, 
             mapProfileToUser: (profile) => {
            return {
              name: profile.slack_id ?? profile.email?.split("@")[0] ?? "user",
              email: profile.email,
              emailVerified: profile.email_verified,
              slackId: profile.slack_id,
              verificationStatus: profile.verification_status,
            };
          },
        },
      ],
    }),
  ],
});
