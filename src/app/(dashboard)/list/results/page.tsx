{/* ทำไว้เผื่อเพิ่มเติมฟีเจอร์ผลลัพธ์ */}
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import React from "react";
import { ITEM_PER_PAGE } from "@/lib/settings";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import FormContainer from "@/components/FormContainer";

const { userId, sessionClaims } = await auth();
const role = (sessionClaims?.metadata as { role?: string })?.role;
const currentUserId = userId;

type ResultList = {
    id: number;
    title: string;
    studentName: string;
    studentSurname: string;
    teacherName: string;
    teacherSurname: string;
    score: number;
    className: string;
    startTime: Date;
};

const columns = [
    {
        header: "Title",
        accessor: "title",
        className: "",
    },
    {
        header: "Student",
        accessor: "student",
    },
    {
        header: "Score",
        accessor: "score",
        className: "hidden md:table-cell",
    },
    {
        header: "Teacher",
        accessor: "teacher",
        className: "hidden md:table-cell",
    },
    {
        header: "Class",
        accessor: "class",
    },
    {
        header: "Date",
        accessor: "date",
        className: "hidden md:table-cell",
    },
    ...(role === "admin" || role === "teacher"
        ? [
            {
                header: "Actions",
                accessor: "actions",
                className: "",
            },
        ]
        : []),
];

const renderRow = (item: ResultList) => (
    <tr
        key={item.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-NPurpleLight"
    >
        <td className="flex items-center gap-4 p-4">{item.title}</td>
        <td>{item.studentName + " " + item.studentSurname}</td>
        <td className="hidden md:table-cell">{item.score}</td>
        <td className="hidden md:table-cell">
            {item.teacherName + " " + item.teacherSurname}
        </td>
        <td className="hidden md:table-cell">{item.className}</td>
        <td className="hidden md:table-cell">
            {new Intl.DateTimeFormat("en-US").format(item.startTime)}
        </td>
        <td>
            <div className="flex items-center gap-2">
                {(role === "admin" || role === "teacher") && (
                    <>
                        <FormContainer table="result" type="update" data={item} />
                        <FormContainer table="result" type="delete" id={item.id} />
                    </>
                )}
            </div>
        </td>
    </tr>
);

const ResultListPage = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const { page, ...queryParams } = await searchParams;
    const p = page ? parseInt(page) : 1;

    // URL  PARAMS CONDITION

    const query: Prisma.ResultWhereInput = {};

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "studentId":
                        query.studentId = value;
                        break;
                    case "search":
                        query.OR = [
                            { exam: { title: { contains: value, mode: "insensitive" } } },
                            { student: { name: { contains: value, mode: "insensitive" } } },
                        ];
                        break;
                    default:
                        break;
                }
            }
        }
    }

    //ROLE CONDITIONS

    switch (role) {
        case "admin":
            break;
        case "teacher":
            query.OR = [
                { exam: { lesson: { teacherId: currentUserId! } } },
                { assignment: { lesson: { teacherId: currentUserId! } } },
            ];
            break;
        case "student":
            query.studentId = currentUserId!;
            break;
        case "parent":
            query.student = {
                parentId: currentUserId!,
            };
            break;
        default:
            break;
    }

    const [dataRes, count] = await prisma.$transaction([
        prisma.result.findMany({
            where: query,
            include: {
                student: { select: { name: true, surname: true } },
                exam: {
                    include: {
                        lesson: {
                            select: {
                                class: { select: { name: true } },
                                teacher: { select: { name: true, surname: true } },
                            },
                        },
                    },
                },
                assignment: {
                    include: {
                        lesson: {
                            select: {
                                class: { select: { name: true } },
                                teacher: { select: { name: true, surname: true } },
                            },
                        },
                    },
                },
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.result.count({ where: query }),
    ]);

    const data = dataRes.map((item) => {
        const assesment = item.exam || item.assignment;
        if (!assesment) return null;

        const isExam = "startTime" in assesment;

        return {
            id: item.id,
            title: assesment.title,
            studentName: item.student.name,
            studentSurname: item.student.surname,
            teacherName: assesment.lesson.teacher.name,
            teacherSurname: assesment.lesson.teacher.surname,
            score: item.score,
            className: assesment.lesson.class.name,
            startTime: isExam ? assesment.startTime : assesment.dueDate,
        };
    });

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg text-semibold">All Result</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-NYellow">
                            <Image src="/filter.png" alt="" width={14} height={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-NYellow">
                            <Image src="/sort.png" alt="" width={14} height={14} />
                        </button>
                        {role === "admin" ||
                            (role === "teacher" && (
                                <FormContainer table="result" type="create" />
                            ))}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={data} />
            {/* PAGINTATION */}
            <Pagination page={p} count={count} />
        </div>
    );
};

export default ResultListPage;