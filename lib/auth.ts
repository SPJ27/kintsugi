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

  baseURL: "http://localhost:3000",

  user: {
    additionalFields: {
      verificationStatus: {
        type: "string",
      },
      slackId: {
        type: "string",
      },
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
        },
      ],
    }),
  ],
});