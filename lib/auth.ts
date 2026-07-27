import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { genericOAuth } from "better-auth/plugins";
import { db } from "./db";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),

    secret: process.env.BETTER_AUTH_SECRET!,

    baseURL: process.env.BETTER_AUTH_URL!,

    plugins: [
        genericOAuth({
            config: [
                {
                    providerId: "hackclub",

                    discoveryUrl:
                        "https://auth.hackclub.com/.well-known/openid-configuration",

                    clientId: process.env.HACKCLUB_CLIENT_ID!,

                    clientSecret:
                        process.env.HACKCLUB_CLIENT_SECRET!,

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