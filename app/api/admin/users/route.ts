import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { db } from "@/db";
import { getSlackProfile } from "@/lib/auth-guard";

function safeCompare(a: string, b: string): boolean {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) return false;
    return timingSafeEqual(bufA, bufB);
}

export async function GET(request: NextRequest) {
    const adminKey = process.env.ADMIN_KEY;
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminKey || !adminSecret) {
        return NextResponse.json(
            { success: false, error: "Server misconfigured: missing admin credentials" },
            { status: 500 }
        );
    }

    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
        return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
        );
    }

    const token = authHeader.slice(7);
    const [providedKey, providedSecret] = token.split(":");

    if (
        !providedKey ||
        !providedSecret ||
        !safeCompare(providedKey, adminKey) ||
        !safeCompare(providedSecret, adminSecret)
    ) {
        return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
        );
    }

    const users = await db.query.user.findMany();
    const query = request.nextUrl.searchParams.get("query")?.toLowerCase() ?? "";

    const slackProfiles = await Promise.all(
        users.map((user) =>
            user.slackId ? getSlackProfile(user.slackId) : Promise.resolve(null)
        )
    );

    const profileById = new Map(
        users.map((user, i) => [user.id, slackProfiles[i]])
    );

    const filteredUsers = query
        ? users.filter((user) => {
            const profile = profileById.get(user.id);
            const haystack = [
                user.email,
                user.slackId,
                user.id,
                profile?.name,
                ...user.role,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();
            return haystack.includes(query);
        })
        : users;
    const usersWithProfiles = filteredUsers.map((user) => {
        const profile = profileById.get(user.id);
        return {
            ...user,
            name: profile?.name ?? user.name,
            image: profile?.image ?? user.image,
        };
    });
    return NextResponse.json({ success: true, usersWithProfiles });
}