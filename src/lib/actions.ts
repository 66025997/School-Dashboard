"use server";

import { revalidatePath } from "next/cache";
import {
    ClassSchema,
    ExamSchema,
    LessonSchema,
    ParentSchema,
    StudentSchema,
    SubjectSchema,
    TeacherSchema,
    AssignmentSchema,
    AnnouncementSchema,
    EventSchema,
    ResultSchema,
} from "./formValidationSchemas";
import prisma from "./prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { Day, Prisma } from "@prisma/client";

type CurrentState = { success: boolean; error: boolean };

export const createSubject = async (
    currentState: CurrentState,
    data: SubjectSchema
) => {
    try {
        await prisma.subject.create({
            data: {
                name: data.name,
                teachers: {
                    connect: data.teachers.map((teacherId) => ({ id: teacherId })),
                },
            },
        });

        // revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateSubject = async (
    currentState: CurrentState,
    data: SubjectSchema
) => {
    try {
        await prisma.subject.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                teachers: {
                    set: data.teachers.map((teacherId) => ({ id: teacherId })),
                },
            },
        });

        // revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteSubject = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        await prisma.subject.delete({
            where: {
                id: parseInt(id),
            },
        });

        // revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createClass = async (
    currentState: CurrentState,
    data: ClassSchema
) => {
    try {
        await prisma.class.create({
            data,
        });

        // revalidatePath("/list/class");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateClass = async (
    currentState: CurrentState,
    data: ClassSchema
) => {
    try {
        await prisma.class.update({
            where: {
                id: data.id,
            },
            data,
        });

        // revalidatePath("/list/class");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteClass = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        await prisma.class.delete({
            where: {
                id: parseInt(id),
            },
        });

        // revalidatePath("/list/class");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createTeacher = async (
    currentState: CurrentState,
    data: TeacherSchema
) => {
    try {
        const resolvedClerkClient = await clerkClient();
        const user = await resolvedClerkClient.users.createUser({
            username: data.username,
            password: data.password,
            firstName: data.name,
            lastName: data.surname,
            publicMetadata: { role: "teacher" },
        });

        await prisma.teacher.create({
            data: {
                id: user.id,
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                sex: data.sex,
                birthday: data.birthday,
                subjects: {
                    connect: data.subjects?.map((subjectId: string) => ({
                        id: parseInt(subjectId),
                    })),
                },
            },
        });

        // revalidatePath("/list/teachers");
        return { success: true, error: false };
    } catch (err: any) {
        console.log(err.errors);
        return { success: false, error: true };
    }
};

export const updateTeacher = async (
    currentState: CurrentState,
    data: TeacherSchema
) => {
    if (!data.id) {
        return { success: false, error: true };
    }
    try {
        const resolvedClerkClient = await clerkClient();
        const user = await resolvedClerkClient.users.updateUser(data.id, {
            username: data.username,
            ...(data.password !== "" && { password: data.password }),
            firstName: data.name,
            lastName: data.surname,
        });

        await prisma.teacher.update({
            where: {
                id: data.id,
            },
            data: {
                ...(data.password !== "" && { password: data.password }),
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                sex: data.sex,
                birthday: data.birthday,
                subjects: {
                    set: data.subjects?.map((subjectId: string) => ({
                        id: parseInt(subjectId),
                    })),
                },
            },
        });
        // revalidatePath("/list/teachers");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteTeacher = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        const resolvedClerkClient = await clerkClient();
        await resolvedClerkClient.users.deleteUser(id);

        await prisma.teacher.delete({
            where: {
                id: id,
            },
        });

        // revalidatePath("/list/teachers");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createStudent = async (
    currentState: CurrentState,
    data: StudentSchema
) => {
    console.log(data);
    try {
        const classItem = await prisma.class.findUnique({
            where: { id: data.classId },
            include: { _count: { select: { students: true } } },
        });

        if (classItem && classItem.capacity === classItem._count.students) {
            return { success: false, error: true };
        }

        const resolvedClerkClient = await clerkClient();
        const user = await resolvedClerkClient.users.createUser({
            username: data.username,
            password: data.password,
            firstName: data.name,
            lastName: data.surname,
            publicMetadata: { role: "student" },
        });

        await prisma.student.create({
            data: {
                id: user.id,
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                sex: data.sex,
                birthday: data.birthday,
                gradeId: data.gradeId,
                classId: data.classId,
                parentId: data.parentId,
            },
        });

        // revalidatePath("/list/students");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateStudent = async (
    currentState: CurrentState,
    data: StudentSchema
) => {
    if (!data.id) {
        return { success: false, error: true };
    }
    try {
        const resolvedClerkClient = await clerkClient();
        const user = await resolvedClerkClient.users.updateUser(data.id, {
            username: data.username,
            ...(data.password !== "" && { password: data.password }),
            firstName: data.name,
            lastName: data.surname,
        });

        await prisma.student.update({
            where: {
                id: data.id,
            },
            data: {
                ...(data.password !== "" && { password: data.password }),
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                sex: data.sex,
                birthday: data.birthday,
                gradeId: data.gradeId,
                classId: data.classId,
                parentId: data.parentId,
            },
        });
        // revalidatePath("/list/students");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteStudent = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        const resolvedClerkClient = await clerkClient();
        await resolvedClerkClient.users.deleteUser(id);

        await prisma.student.delete({
            where: {
                id: id,
            },
        });

        // revalidatePath("/list/students");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const createExam = async (
    currentState: CurrentState,
    data: ExamSchema
) => {
    // const { userId, sessionClaims } = auth();
    // const role = (sessionClaims?.metadata as { role?: string })?.role;

    try {
        // if (role === "teacher") {
        //   const teacherLesson = await prisma.lesson.findFirst({
        //     where: {
        //       teacherId: userId!,
        //       id: data.lessonId,
        //     },
        //   });

        //   if (!teacherLesson) {
        //     return { success: false, error: true };
        //   }
        // }

        await prisma.exam.create({
            data: {
                title: data.title,
                startTime: data.startTime,
                endTime: data.endTime,
                lessonId: data.lessonId,
            },
        });

        // revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const updateExam = async (
    currentState: CurrentState,
    data: ExamSchema
) => {
    // const { userId, sessionClaims } = auth();
    // const role = (sessionClaims?.metadata as { role?: string })?.role;

    try {
        // if (role === "teacher") {
        //   const teacherLesson = await prisma.lesson.findFirst({
        //     where: {
        //       teacherId: userId!,
        //       id: data.lessonId,
        //     },
        //   });

        //   if (!teacherLesson) {
        //     return { success: false, error: true };
        //   }
        // }

        await prisma.exam.update({
            where: {
                id: data.id,
            },
            data: {
                title: data.title,
                startTime: data.startTime,
                endTime: data.endTime,
                lessonId: data.lessonId,
            },
        });

        // revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};

export const deleteExam = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;

    // const { userId, sessionClaims } = auth();
    // const role = (sessionClaims?.metadata as { role?: string })?.role;

    try {
        await prisma.exam.delete({
            where: {
                id: parseInt(id),
                // ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
            },
        });

        // revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};


/*** Announcement Functions ***/
export const createAnnouncement = async (
    currentState: CurrentState,
    data: AnnouncementSchema
) => {
    try {
        await prisma.announcement.create({
            data: {
                title: data.title,
                description: data.description,
                date: data.date,
                classId: data.classId,
            },
        });
        return { success: true, error: false };
    } catch (err) {
        console.error("Error creating announcement:", err);
        return { success: false, error: true };
    }
};

export const updateAnnouncement = async (
    currentState: CurrentState,
    data: AnnouncementSchema
) => {
    try {
        await prisma.announcement.update({
            where: { id: data.id },
            data: {
                title: data.title,
                description: data.description,
                date: data.date,
                classId: data.classId,
            },
        });
        return { success: true, error: false };
    } catch (err) {
        console.error("Error updating announcement:", err);
        return { success: false, error: true };
    }
};

export const deleteAnnouncement = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        await prisma.announcement.delete({ where: { id: parseInt(id) } });
        return { success: true, error: false };
    } catch (err) {
        console.error("Error deleting announcement:", err);
        return { success: false, error: true };
    }
};

/*** Event Functions ***/
export const createEvent = async (
    currentState: CurrentState,
    data: EventSchema
) => {
    try {
        await prisma.event.create({
            data: {
                title: data.title,
                description: data.description,
                startTime: data.startTime,
                endTime: data.endTime,
                classId: data.classId,
            },
        });
        return { success: true, error: false };
    } catch (err) {
        console.error("Error creating event:", err);
        return { success: false, error: true };
    }
};

export const updateEvent = async (
    currentState: CurrentState,
    data: EventSchema
) => {
    try {
        await prisma.event.update({
            where: { id: data.id },
            data: {
                title: data.title,
                description: data.description,
                startTime: data.startTime,
                endTime: data.endTime,
                classId: data.classId,
            },
        });
        return { success: true, error: false };
    } catch (err) {
        console.error("Error updating event:", err);
        return { success: false, error: true };
    }
};

export const deleteEvent = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        await prisma.event.delete({ where: { id: parseInt(id) } });
        return { success: true, error: false };
    } catch (err) {
        console.error("Error deleting event:", err);
        return { success: false, error: true };
    }
};

/*** Parent Functions ***/
export const createParent = async (
    currentState: CurrentState,
    data: ParentSchema
) => {
    try {
        const resolvedClerkClient = await clerkClient();
        const user = await resolvedClerkClient.users.createUser({
            username: data.username,
            password: data.password,
            firstName: data.name,
            lastName: data.surname,
            publicMetadata: { role: "parent" },
        });

        await prisma.parent.create({
            data: {
                id: user.id,
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone,
                address: data.address,
                students: {
                    connect: data.students?.map((studentId: string) => ({ id: studentId })),
                },
            },
        });

        return { success: true, error: false };
    } catch (err: any) {
        console.error("Error creating parent:", err);
        return { success: false, error: true };
    }
};

export const updateParent = async (
    currentState: CurrentState,
    data: ParentSchema
) => {
    if (!data.id) return { success: false, error: true };
    try {
        const resolvedClerkClient = await clerkClient();
        await resolvedClerkClient.users.updateUser(data.id, {
            username: data.username,
            ...(data.password !== "" && { password: data.password }),
            firstName: data.name,
            lastName: data.surname,
        });

        await prisma.parent.update({
            where: { id: data.id },
            data: {
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone,
                address: data.address,
                students: {
                    set: data.students?.map((studentId: string) => ({ id: studentId })),
                },
            },
        });
        return { success: true, error: false };
    } catch (err: any) {
        console.error("Error updating parent:", err);
        return { success: false, error: true };
    }
};

export const deleteParent = async (
    currentState: CurrentState,
    data: FormData
) => {
    const id = data.get("id") as string;
    try {
        const resolvedClerkClient = await clerkClient();
        await prisma.parent.delete({ where: { id } });
        await resolvedClerkClient.users.deleteUser(id);
        return { success: true, error: false };
    } catch (err: any) {
        console.error("Error deleting parent:", err);
        return { success: false, error: true, message: "Failed to delete parent" };
    }
};