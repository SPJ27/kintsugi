import { createNewProject } from "@/actions/projects";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const form = await req.formData()
    const res = await createNewProject(form)
    return NextResponse.json(res)
}