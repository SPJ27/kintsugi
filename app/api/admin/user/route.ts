import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { db } from "@/db";
import { getSlackProfile } from "@/lib/auth-guard";
import { eq } from "drizzle-orm";
import { user } from "@/db/schema";

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

    
}