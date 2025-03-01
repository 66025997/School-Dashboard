// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// // 📌 **สัปดาห์ปัจจุบัน (จันทร์-ศุกร์)**
// const getCurrentWeekDays = () => {
//     const today = new Date();
//     const dayOfWeek = today.getDay();

//     const monday = new Date(today);
//     monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
//     monday.setHours(0, 0, 0, 0);

//     const days = [];
//     for (let i = 0; i < 5; i++) {
//         const date = new Date(monday);
//         date.setDate(monday.getDate() + i);
//         days.push(date.toISOString().split("T")[0]);
//     }
//     return days;
// };

// // 📌 **GET:** ดึงข้อมูล Attendance ของคลาสที่เลือก
// export async function GET(req: Request) {
//     try {
//         const { searchParams } = new URL(req.url);
//         const classId = searchParams.get("classId");

//         if (!classId) return NextResponse.json({ error: "Missing classId" }, { status: 400 });

//         const weekDays = getCurrentWeekDays();

//         const attendanceData = await prisma.attendance.findMany({
//             where: {
//                 student: {
//                     classId: parseInt(classId),
//                 },
//                 date: {
//                     gte: new Date(weekDays[0]),
//                     lte: new Date(weekDays[4]),
//                 },
//             },
//             include: { student: true },
//         });

//         const attendanceSummary: { [date: string]: { present: number; absent: number } } = {};
//         weekDays.forEach((date) => {
//             attendanceSummary[date] = { present: 0, absent: 0 };
//         });

//         attendanceData.forEach((record) => {
//             const date = record.date.toISOString().split("T")[0];
//             if (attendanceSummary[date]) {
//                 if (record.present) {
//                     attendanceSummary[date].present++;
//                 } else {
//                     attendanceSummary[date].absent++;
//                 }
//             }
//         });

//         const formattedData = weekDays.map((date) => ({
//             date,
//             present: attendanceSummary[date]?.present || 0,
//             absent: attendanceSummary[date]?.absent || 0,
//         }));

//         return NextResponse.json(formattedData);
//     } catch (error) {
//         console.error("Error fetching attendance data:", error);
//         return NextResponse.json({ error: "Failed to fetch attendance data" }, { status: 500 });
//     }
// }

// // 📌 **POST:** บันทึก Attendance ของนักเรียน
// export async function POST(req: Request) {
//     try {
//         const body = await req.json();
//         console.log("📩 Received Request Body:", body); // ✅ Debug Request Body

//         const { classId, students, lessonId } = body;

//         // ✅ เช็คว่าข้อมูลถูกส่งมาครบหรือไม่
//         if (!classId || !students || students.length === 0 || !lessonId) {
//             console.error("❌ Missing classId, students, or lessonId", { classId, students, lessonId });
//             return NextResponse.json({ error: "Missing classId, students, or lessonId" }, { status: 400 });
//         }

//         const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
//         console.log(`📅 Today: ${today}`);

//         // ✅ ตรวจสอบว่ามีนักเรียนที่เช็คชื่อไปแล้วหรือไม่
//         const existingRecords = await prisma.attendance.findMany({
//             where: {
//                 studentId: { in: students.map((s: any) => s.id) },
//                 lessonId: lessonId,
//                 date: new Date(today),
//             },
//         });

//         console.log(`🔍 Existing Records: ${existingRecords.length}`);

//         const existingStudentIds = new Set(existingRecords.map((record) => record.studentId));

//         const attendanceData = students
//             .filter((student: any) => !existingStudentIds.has(student.id))
//             .map((student: any) => ({
//                 date: new Date(today),
//                 present: student.present,
//                 studentId: student.id,
//                 lessonId: lessonId,
//             }));

//         console.log(`📝 Attendance to be inserted:`, attendanceData);

//         if (attendanceData.length > 0) {
//             await prisma.attendance.createMany({
//                 data: attendanceData,
//             });
//             console.log("✅ Attendance recorded successfully!");
//         } else {
//             console.log("⚠️ No new attendance records to insert.");
//         }

//         return NextResponse.json({ message: "Attendance recorded successfully!" });
//     } catch (error) {
//         console.error("❌ Error recording attendance:", error);
//         return NextResponse.json({ error: "Failed to record attendance", details: (error as Error).message }, { status: 500 });
//     }
// }
