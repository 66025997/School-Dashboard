"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AttendanceChart from "./AttendanceChart";

const AttendanceChartContainer = () => {
    const [attendanceData, setAttendanceData] = useState<{ name: string; present: number; absent: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/attendance");
                const data = await res.json();

                // ตรวจสอบว่า API ส่ง error หรือไม่
                if (data.error) {
                    console.error("Error fetching attendance data:", data.error);
                    return;
                }

                // Process Data
                const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
                const attendanceMap: { [key: string]: { present: number; absent: number } } = {
                    Mon: { present: 0, absent: 0 },
                    Tue: { present: 0, absent: 0 },
                    Wed: { present: 0, absent: 0 },
                    Thu: { present: 0, absent: 0 },
                    Fri: { present: 0, absent: 0 },
                };

                data.forEach((item: { date: string; present: boolean }) => {
                    const itemDate = new Date(item.date);
                    const dayOfWeek = itemDate.getDay();

                    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
                        const dayName = daysOfWeek[dayOfWeek - 1];

                        if (item.present) {
                            attendanceMap[dayName].present += 1;
                        } else {
                            attendanceMap[dayName].absent += 1;
                        }
                    }
                });

                const formattedData = daysOfWeek.map((day) => ({
                    name: day,
                    present: attendanceMap[day].present,
                    absent: attendanceMap[day].absent,
                }));

                setAttendanceData(formattedData);
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bg-white rounded-lg p-4 h-full">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Attendance</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20} />
            </div>
            <AttendanceChart data={attendanceData} />
        </div>
    );
};

export default AttendanceChartContainer;
