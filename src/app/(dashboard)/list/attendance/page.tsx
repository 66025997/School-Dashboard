"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// จำลอง API (ให้ใช้ API จริงแทนที่ fetchData ด้านล่าง)
const fetchClasses = async () => {
    return [
        { id: 1, name: "Class 1A" },
        { id: 2, name: "Class 2B" },
        { id: 3, name: "Class 3C" },
    ];
};

const fetchStudentsByClass = async (classId: number) => {
    const allStudents = {
        1: [
            { id: "s1", name: "Alice Johnson" },
            { id: "s2", name: "Bob Smith" },
        ],
        2: [
            { id: "s3", name: "Charlie Brown" },
            { id: "s4", name: "David Wilson" },
        ],
        3: [
            { id: "s5", name: "Emma Davis" },
            { id: "s6", name: "Frank Thomas" },
        ],
    };
    return allStudents[classId] || [];
};

const AttendancePage = () => {
    const [classes, setClasses] = useState<{ id: number; name: string }[]>([]);
    const [selectedClass, setSelectedClass] = useState<number | null>(null);
    const [students, setStudents] = useState<{ id: string; name: string }[]>([]);
    const [attendance, setAttendance] = useState<{ [key: string]: boolean }>({});

    // โหลดข้อมูลคลาส
    useEffect(() => {
        const loadClasses = async () => {
            const classData = await fetchClasses();
            setClasses(classData);
            if (classData.length > 0) setSelectedClass(classData[0].id);
        };
        loadClasses();
    }, []);

    // โหลดนักเรียนเมื่อเลือกคลาส
    useEffect(() => {
        if (selectedClass) {
            const loadStudents = async () => {
                const studentData = await fetchStudentsByClass(selectedClass);
                setStudents(studentData);

                // ตั้งค่าเช็คชื่อเริ่มต้นเป็น false
                const initialAttendance = studentData.reduce((acc, student) => {
                    acc[student.id] = false;
                    return acc;
                }, {} as { [key: string]: boolean });

                setAttendance(initialAttendance);
            };
            loadStudents();
        }
    }, [selectedClass]);

    // อัปเดตสถานะการเช็คชื่อ
    const handleAttendanceChange = (studentId: string) => {
        setAttendance((prev) => ({
            ...prev,
            [studentId]: !prev[studentId],
        }));
    };

    // บันทึกข้อมูลการเช็คชื่อ
    const handleSaveAttendance = async () => {
        try {
            console.log("Saving Attendance:", attendance);
            toast.success("Attendance saved successfully!");
        } catch (error) {
            console.error("Failed to save attendance", error);
            toast.error("Failed to save attendance!");
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Attendance Check</h1>

            {/* Dropdown เลือกคลาส */}
            <label className="block text-lg font-medium mb-2">Select Class</label>
            <select
                value={selectedClass || ""}
                onChange={(e) => setSelectedClass(Number(e.target.value))}
                className="w-full p-2 border rounded-md mb-4"
            >
                {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                        {cls.name}
                    </option>
                ))}
            </select>

            {/* ตารางเช็คชื่อ */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Student Name</th>
                        <th className="border p-2 text-center">Present</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id} className="border">
                            <td className="border p-2">{student.name}</td>
                            <td className="border p-2 text-center">
                                <input
                                    type="checkbox"
                                    checked={attendance[student.id] || false}
                                    onChange={() => handleAttendanceChange(student.id)}
                                    className="w-5 h-5"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ปุ่มบันทึก */}
            <button
                onClick={handleSaveAttendance}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
            >
                Save Attendance
            </button>
        </div>
    );
};

export default AttendancePage;
