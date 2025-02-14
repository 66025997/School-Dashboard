import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // เชื่อมต่อกับ Prisma Client

export async function POST(request: Request) {
    try {
        const { attendance } = await request.json(); // รับข้อมูลจากฟอร์ม

        // ลูปข้อมูลและบันทึกการเข้าเรียน
        for (const studentId in attendance) {
            const status = attendance[studentId];
            await prisma.attendance.create({
                data: {
                    studentId: studentId,
                    status: status,
                    date: new Date(), // บันทึกวันที่
                },
            });
        }

        return NextResponse.json({ success: true }); // ส่งผลลัพธ์สำเร็จ
    } catch (error) {
        console.error("Error submitting attendance:", error);
        return NextResponse.json(
            { success: false, message: "Failed to submit attendance" },
            { status: 500 }
        );
    }
}
