"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
    const { user } = useUser();
    const router = useRouter();

    return (
        <div className="flex items-center justify-between p-4 bg-slate-50">
            {/* ICONS AND USER */}
            <div className="flex items-center gap-8 justify-end w-full">
                <div 
                    className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative"
                    onClick={() => router.push("/list/announcements")}
                >
                    <Image src="/announcement.png" alt="Announcements" width={20} height={20} />
                    <div className="absolute -top-1 -right-2 w-2 h-2 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs"></div>
                </div>

                <div className="flex flex-col">
                    <span className="text-xs leading-3 font-bold">{user?.firstName}</span>
                    <span className="text-[12px] text-gray-500 text-right">{user?.publicMetadata?.role as string}</span>
                </div>
                <div>
                    <UserButton />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
