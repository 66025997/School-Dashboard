"use client";  // ระบุให้คอมโพเนนต์นี้ทำงานในฝั่งไคลเอนต์

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export function App() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);  // ทำให้แอปเรนเดอร์หลังจากการ hydrate
    }, []);

    if (!isClient) return null;  // รอจนกว่าแอปจะทำงานในฝั่งไคลเอนต์

    return (
        <h1>This is never prerendered</h1>
    );
}

const Webpage = () => {
    const { isSignedIn, user } = useUser();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);  // ทำให้แน่ใจว่าเรนเดอร์ในฝั่งไคลเอนต์
    }, []);

    useEffect(() => {
        if (isSignedIn && isClient) {
            const role = user?.publicMetadata.role;
            if (role) {
                router.push(`/${role}`);  // นำผู้ใช้ไปยังหน้า dashboard ตามบทบาท
            }
        }
    }, [isSignedIn, user, router, isClient]);

    if (!isClient) return null;  // รอจนกว่าแอปจะทำงานในฝั่งไคลเอนต์

    return (
        <div suppressHydrationWarning={true}>
            <h1>ยินดีต้อนรับสู่แอปของเรา!</h1>
            <p>คำอธิบายเกี่ยวกับการใช้งานแอป แอปนี้ทำอะไรและใช้งานยังไง</p>
            <p>
                หากคุณยังไม่ได้ล็อกอิน, กรุณา <Link href="/sign-in">เข้าสู่ระบบ</Link>
            </p>
        </div>
    );
};

export default Webpage;
