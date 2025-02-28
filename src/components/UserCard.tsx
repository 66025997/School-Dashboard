import prisma from "@/lib/prisma";
import Image from "next/image";
import { FaUserGraduate, FaChalkboardTeacher, FaUsers, FaUserShield } from "react-icons/fa";

const UserCard = async ({
    type,
}: {
    type: "admin" | "teacher" | "student" | "parent";
}) => {
    const modelMap: Record<typeof type, any> = {
        admin: prisma.admin,
        teacher: prisma.teacher,
        student: prisma.student,
        parent: prisma.parent,
    };

    const data = await modelMap[type].count();

    // Map icon for each user type
    const iconMap = {
        student: <FaUserGraduate className="text-blue-400 text-4xl" />,
        teacher: <FaChalkboardTeacher className="text-pink-300 text-4xl" />,
        parent: <FaUsers className="text-indigo-400 text-4xl" />,
        admin: <FaUserShield className="text-gray-500 text-4xl" />,
    };

    return (
        <div className="rounded-xl odd:bg-NPurple even:bg-NYellow p-2 flex items-center gap-4 w-full max-w-[200px] h-[100px] shadow-md transition-transform hover:scale-105">
            <div className="p-4 bg-white rounded-full shadow-sm">
                {iconMap[type]}
            </div>
            <div>
                <h1 className="text-3xl font-bold text-gray-900">{data}</h1>
                <h2 className="capitalize text-md font-medium text-gray-600">{type}s</h2>
            </div>
        </div>
    );
};

export default UserCard;
