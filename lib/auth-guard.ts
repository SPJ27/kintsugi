import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers"
import { cache } from "react";
import { getHackatimeProjects } from "./hackatime";

const SLACK_TOKEN = process.env.SLACK_BOT_TOKEN;

interface SlackProfile {
    displayName: string;
    realName: string;
    image?: string;
}

const getSlackProfile = (async (slackUserId: string): Promise<SlackProfile | null> => {
    if (!slackUserId || !SLACK_TOKEN) return null;

    try {
        const res = await fetch(
            `https://slack.com/api/users.profile.get?user=${slackUserId}`,
            {
                headers: { Authorization: `Bearer ${SLACK_TOKEN}` },
                cache: "no-store",
            }
        );

        const data = await res.json();

        if (!data.ok) {
            console.error("Slack profile fetch failed:", data.error);
            return null;
        }
        return {
            displayName: data.profile.display_name || data.profile.real_name,
            realName: data.profile.real_name,
            image: data.profile.image_192,
        };
    } catch (err) {
        console.error("Slack profile fetch error:", err);
        return null;
    }
});

const getSession = cache(async () => {
    return auth.api.getSession({ headers: await headers() });
});

export async function requireAuth() {
    const session = await getSession();

    if (!session) {
        redirect('/');
    }
    const slackProfile = session.user.slackId
        ? await getSlackProfile(session.user.slackId)
        : null;
    
    console.log({
        ...session,
        user: {
            ...session.user,
            slackProfile,
        },
    })
    return {
        ...session,
        user: {
            ...session.user,
            slackProfile,
        },
    };
}

export async function requireRole(role: string) {
    const session = await requireAuth();

    if (!session.user.role?.includes(role)) {
        redirect('/');
    }

    return session;
}

export async function requireAnyRole(roles: string[]) {
    const session = await requireAuth();
    const hasRole = roles.some((role) => session.user.role?.includes(role));
    if (!hasRole) {
        redirect('/');
    }
    return session;
}