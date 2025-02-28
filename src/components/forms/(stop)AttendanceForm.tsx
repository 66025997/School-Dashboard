// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// const AttendanceForm = () => {
//     const [selectedClass, setSelectedClass] = useState("");
//     const [students, setStudents] = useState<{ id: string; name: string; present: boolean }[]>([]);
//     const [classes, setClasses] = useState<{ id: number; name: string }[]>([]);
//     const router = useRouter();

//     // ดึงข้อมูลคลาสจากฐานข้อมูล
//     useEffect(() => {
//         const fetchClasses = async () => {
//             const res = await fetch("/api/classes");
//             const data = await res.json();
//             setClasses(data);
//         };
//         fetchClasses();
//     }, []);

//     // ดึงรายชื่อนักเรียนเมือเลือกคลาส
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

//         alert("Attendance saved!");
//         router.refresh();
//     };

//     return (
//         <div className="bg-white p-6 rounded-md shadow-md">
//             <h1 className="text-xl font-semibold mb-4">Check Attendance</h1>

//             {/* เลือกคลาส */}
//             <label className="block mb-2">Select Class:</label>
//             <select
//                 className="w-full p-2 border rounded-md mb-4"
//                 value={selectedClass}
//                 onChange={(e) => setSelectedClass(e.target.value)}
//             >
//                 <option value="">-- Select Class --</option>
//                 {classes.map((cls) => (
//                     <option key={cls.id} value={cls.id}>
//                         {cls.name}
//                     </option>
//                 ))}
//             </select>

//             {/* แสดงรายชื่อนักเรียน */}
//             {selectedClass && (
//                 <form onSubmit={handleSubmit}>
//                     <table className="w-full border-collapse border">
//                         <thead>
//                             <tr className="bg-gray-100">
//                                 <th className="p-2 border">Student Name</th>
//                                 <th className="p-2 border">Present</th>
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
//                         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
//                     >
//                         Submit Attendance
//                     </button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default AttendanceForm;
