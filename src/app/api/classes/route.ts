import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const classes = await prisma.class.findMany({
            select: {
                id: true,
                name: true,
                capacity: true,
                _count: {
                    select: { students: true },
                },
                students: {
                    select: { sex: true },
                },
            },
        });

        const formattedClasses = classes.map((cls) => {
            const boys = cls.students.filter((s) => s.sex === "MALE").length;
            const girls = cls.students.filter((s) => s.sex === "FEMALE").length;

            return {
                id: cls.id,
                name: cls.name,
                studentCount: cls._count.students,
                boys,
                girls,
                capacity: cls.capacity || 0, // ถ้า capacity เป็น null ให้ใช้ 0
            };
        });

        return NextResponse.json({ classes: formattedClasses });
    } catch (error) {
        console.error("Error fetching classes:", error);
        return NextResponse.json({ error: "Failed to fetch classes" }, { status: 500 });
    }
}
