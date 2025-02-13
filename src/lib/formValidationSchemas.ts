import { z } from "zod";

// ✅ Subject Schema (รายวิชา)
export const subjectSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, { message: "Subject name is required!" }),
    teachers: z.array(z.string()).optional(), // Teacher IDs
});
export type SubjectSchema = z.infer<typeof subjectSchema>;

// ✅ Class Schema (ห้องเรียน)
export const classSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, { message: "Class name is required!" }),
    capacity: z.coerce.number().min(1, { message: "Capacity is required!" }),
    gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
    supervisorId: z.coerce.string().optional(),
});
export type ClassSchema = z.infer<typeof classSchema>;

// ✅ Teacher Schema (ครู)
export const teacherSchema = z.object({
    id: z.string().optional(),
    username: z.string().min(3).max(20, { message: "Username must be 3-20 characters!" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters!" }).optional().or(z.literal("")),
    name: z.string().min(1, { message: "First name is required!" }),
    surname: z.string().min(1, { message: "Last name is required!" }),
    email: z.string().email({ message: "Invalid email!" }).optional().or(z.literal("")),
    phone: z.string().optional(),
    address: z.string(),
    img: z.string().optional(),
    bloodType: z.string().min(1, { message: "Blood Type is required!" }),
    birthday: z.coerce.date({ message: "Birthday is required!" }),
    sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
    subjects: z.array(z.string()).optional(), // Subject IDs
});
export type TeacherSchema = z.infer<typeof teacherSchema>;

// ✅ Student Schema (นักเรียน)
export const studentSchema = z.object({
    id: z.string().optional(),
    username: z.string().min(3).max(20, { message: "Username must be 3-20 characters!" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters!" }).optional().or(z.literal("")),
    name: z.string().min(1, { message: "First name is required!" }),
    surname: z.string().min(1, { message: "Last name is required!" }),
    email: z.string().email({ message: "Invalid email!" }).optional().or(z.literal("")),
    phone: z.string().optional(),
    address: z.string(),
    img: z.string().optional(),
    bloodType: z.string().min(1, { message: "Blood Type is required!" }),
    birthday: z.coerce.date({ message: "Birthday is required!" }),
    sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
    gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
    classId: z.coerce.number().min(1, { message: "Class is required!" }),
    parentId: z.string().min(1, { message: "Parent ID is required!" }),
});
export type StudentSchema = z.infer<typeof studentSchema>;

// ✅ Parent Schema (ผู้ปกครอง)
export const parentSchema = z.object({
    id: z.string().optional(),
    username: z.string().min(3).max(20, { message: "Username must be 3-20 characters!" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters!" }).optional().or(z.literal("")),
    name: z.string().min(1, { message: "First name is required!" }),
    surname: z.string().min(1, { message: "Last name is required!" }),
    email: z.string().email({ message: "Invalid email!" }).optional().or(z.literal("")),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits!" }),
    address: z.string(),
    img: z.string().optional(),
    students: z.array(z.string()).optional(), // Student IDs
});
export type ParentSchema = z.infer<typeof parentSchema>;

// ✅ Attendance Schema (การเข้าเรียน)
export const attendanceSchema = z.object({
    id: z.coerce.number().optional(),
    date: z.coerce.date({ message: "Date is required!" }),
    present: z.boolean(),
    studentId: z.string().min(1, { message: "Student is required!" }),
});
export type AttendanceSchema = z.infer<typeof attendanceSchema>;

// ✅ Announcement Schema (ประกาศ)
export const announcementSchema = z.object({
    id: z.coerce.number().optional(),
    title: z.string().min(1, { message: "Title is required!" }),
    description: z.string().min(1, { message: "Provide a description!" }),
    date: z.coerce.date({ message: "Date is required!" }),
    classId: z.coerce.number({ message: "Class is required!" }).optional(),
});
export type AnnouncementSchema = z.infer<typeof announcementSchema>;

// ✅ Event Schema (กิจกรรม)
export const eventSchema = z.object({
    id: z.coerce.number().optional(),
    title: z.string().min(1, { message: "Title is required!" }),
    description: z.string().min(1, { message: "Provide a description!" }),
    startTime: z.coerce.date({ message: "Start time is required!" }),
    endTime: z.coerce.date({ message: "End time is required!" }),
    classId: z.coerce.number({ message: "Class is required!" }).optional(),
});
export type EventSchema = z.infer<typeof eventSchema>;
