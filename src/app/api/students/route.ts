import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const classId = url.searchParams.get("classId");

    if (!classId) return NextResponse.json([]);

    const students = await prisma.student.findMany({
        where: { classId: parseInt(classId) },
        select: { id: true, name: true },
    });

    return NextResponse.json(students);
}
