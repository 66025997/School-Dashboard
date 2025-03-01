{/* หยุดการทำฟีเจอร์นี้ก่อน */}

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// const AttendancePage = () => {
//     const [selectedClass, setSelectedClass] = useState("");
//     const [students, setStudents] = useState<{ id: string; name: string; present: boolean }[]>([]);
//     const [classes, setClasses] = useState<{ id: number; name: string }[]>([]);
//     const router = useRouter();

//     // ดึงข้อมูลคลาสจาก API
//     useEffect(() => {
//         const fetchClasses = async () => {
//             const res = await fetch("/api/classes");
//             const data = await res.json();
//             setClasses(data);
//         };
//         fetchClasses();
//     }, []);

//     useEffect(() => {
//         if (selectedClass) {
//             const fetchStudents = async () => {
//                 const res = await fetch(`/api/students?classId=${selectedClass}`);
//                 const data = await res.json();
//                 setStudents(data.map((s: any) => ({ ...s, present: true })));
//             };
//             fetchStudents();
//         }
//     }, [selectedClass]);

//     const handleSubmit = async (e: any) => {
//         e.preventDefault();
//         await fetch("/api/attendance", {
//             method: "POST",
//             body: JSON.stringify({ classId: selectedClass, students }),
//             headers: { "Content-Type": "application/json" },
//         });

//         alert("✅ Attendance saved successfully!");
//         router.refresh();
//     };

//     return (
//         <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md">
//             <h1 className="text-2xl font-semibold mb-4">📌 Check Attendance</h1>

//             <label className="block text-lg font-medium mb-2">Select a class:</label>
//             <select
//                 className="w-full p-2 border rounded-md mb-4"
//                 value={selectedClass}
//                 onChange={(e) => setSelectedClass(e.target.value)}
//             >
//                 <option value="">-- choose class --</option>
//                 {classes.map((cls) => (
//                     <option key={cls.id} value={cls.id}>
//                         {cls.name}
//                     </option>
//                 ))}
//             </select>

//             {selectedClass && (
//                 <form onSubmit={handleSubmit}>
//                     <table className="w-full border-collapse border rounded-md shadow-md">
//                         <thead>
//                             <tr className="bg-gray-100 text-gray-600">
//                                 <th className="p-2 border">🧐 ชื่อนักเรียน</th>
//                                 <th className="p-2 border text-center">👍🏻 มาเรียน</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {students.map((student, index) => (
//                                 <tr key={student.id} className="text-center">
//                                     <td className="p-2 border">{student.name}</td>
//                                     <td className="p-2 border">
//                                         <input
//                                             type="checkbox"
//                                             checked={student.present}
//                                             onChange={() =>
//                                                 setStudents((prev) =>
//                                                     prev.map((s, i) =>
//                                                         i === index ? { ...s, present: !s.present } : s
//                                                     )
//                                                 )
//                                             }
//                                         />
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                     <button
//                         type="submit"
//                         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//                     >
//                         ✅ บันทึกการเช็คชื่อ
//                     </button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default AttendancePage;
