{/* พักการทำฟีเจอร์นี้ก่อน */}

// "use client";

// import { useState, useEffect } from "react";
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
// } from "recharts";

// // (จันทร์-ศุกร์)
// const getCurrentWeekDays = () => {
//     const today = new Date();
//     const dayOfWeek = today.getDay();

//     const monday = new Date(today);
//     monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

//     const days = [];
//     const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri"];
//     for (let i = 0; i < 5; i++) {
//         const date = new Date(monday);
//         date.setDate(monday.getDate() + i);
//         days.push({ date: date.toISOString().split("T")[0], short: dayNames[i] }); // { "date": "YYYY-MM-DD", "short": "Mon" }
//     }
//     return days;
// };

// const AttendanceChart = () => {
//     const [selectedClass, setSelectedClass] = useState("");
//     const [classes, setClasses] = useState<{ id: number; name: string }[]>([]);
//     const [chartData, setChartData] = useState<{ date: string; present: number; absent: number }[]>([]);

//     useEffect(() => {
//         const fetchClasses = async () => {
//             const res = await fetch("/api/classes");
//             const data = await res.json();
//             setClasses(data);
//             if (data.length > 0) {
//                 setSelectedClass(data[0].id.toString());
//             }
//         };
//         fetchClasses();
//     }, []);

//     useEffect(() => {
//         if (selectedClass) {
//             const fetchAttendance = async () => {
//                 const weekDays = getCurrentWeekDays();
//                 const res = await fetch(`/api/attendance?classId=${selectedClass}`);
//                 const data = await res.json();

//                 const filteredData = weekDays.map(day => {
//                     const found = data.find((entry: any) => entry.date === day.date);
//                     return {
//                         date: day.short,
//                         present: found ? found.present : 0,
//                         absent: found ? found.absent : 0,
//                     };
//                 });

//                 setChartData(filteredData);
//             };
//             fetchAttendance();
//         }
//     }, [selectedClass]);

//     return (
//         <div className="bg-white p-6 rounded-md shadow-md">
//             {/* Dropdown */}
//             <label className="block text-lg font-medium mb-2">Select a class</label>
//             <select
//                 className="w-full p-2 border rounded-md mb-4"
//                 value={selectedClass}
//                 onChange={(e) => setSelectedClass(e.target.value)}
//             >
//                 {classes.map((cls) => (
//                     <option key={cls.id} value={cls.id}>
//                         {cls.name}
//                     </option>
//                 ))}
//             </select>

//             {/* Chart */}
//             <ResponsiveContainer width="100%" height={280}>
//                 <BarChart width={500} height={250} data={chartData} barSize={40}>
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
//                     <XAxis dataKey="date" axisLine={false} tick={{ fill: "#4B5563" }} tickLine={false} />
//                     <YAxis axisLine={false} tick={{ fill: "#4B5563" }} tickLine={false} />
//                     <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }} />
//                     <Legend align="left" verticalAlign="top" wrapperStyle={{ paddingTop: "10px", paddingBottom: "20px" }} />
//                     <Bar dataKey="present" fill="#B9E5FF" legendType="circle" radius={[10, 10, 0, 0]} />
//                     <Bar dataKey="absent" fill="#FFE5AE" legendType="circle" radius={[10, 10, 0, 0]} />
//                 </BarChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// export default AttendanceChart;
