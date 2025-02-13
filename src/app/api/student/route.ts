import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: { url: string | URL; }) {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");

    if (!type || !id) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    let subjectsData: any[] = [];

    if (type === "teacherId") {
        subjectsData = await prisma.subject.findMany({
            where: {
                teachers: {
                    some: {
                        id: id,
                    },
                },
            },
            select: {
                name: true,
            },
        });
    } else if (type === "classId") {
        const classInfo = await prisma.class.findUnique({
            where: { id: Number(id) },
            select: {
                gradeId: true,
            },
        });

        if (classInfo) {
            subjectsData = await prisma.subject.findMany({
                where: {
                    classes: {
                        some: {
                            id: Number(id),
                        },
                    },
                },
                select: {
                    name: true,
                },
            });
        }
    }

    return NextResponse.json(subjectsData);
}
