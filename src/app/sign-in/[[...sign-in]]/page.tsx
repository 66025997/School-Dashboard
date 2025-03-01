"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

const LoginPage = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            const role = user?.publicMetadata.role ?? "dashboard";
            router.replace(`/${role}`);
        }
    }, [isLoaded, isSignedIn, user, router]);

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-blue-500">
            <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.3 }}
                className="text-center mb-6 text-white"
            >
                <h1 className="text-3xl font-bold">Welcome to School</h1>
                <p className="text-sm opacity-80">
                    &quot;Knowledge starts with a single click.&quot;
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white p-12 rounded-lg shadow-lg border border-gray-200"
            >
                <SignIn.Root>
                    <SignIn.Step name="start" className="flex flex-col gap-3">
                        <h1 className="text-xl font-bold flex items-center gap-2">
                            <Image src="/logo.png" alt="" width={24} height={24} />
                            School
                        </h1>
                        <h2 className="text-gray-400">Sign in to your account</h2>

                        <Clerk.GlobalError className="text-sm text-red-400" />

                        <Clerk.Field name="identifier" className="flex flex-col gap-2">
                            <Clerk.Label className="text-xs text-gray-500">Username</Clerk.Label>
                            <Clerk.Input
                                type="text"
                                required
                                className="p-2 rounded-md ring-1 ring-gray-300"
                            />
                            <Clerk.FieldError className="text-xs text-red-400" />
                        </Clerk.Field>

                        <Clerk.Field name="password" className="flex flex-col gap-2">
                            <Clerk.Label className="text-xs text-gray-500">Password</Clerk.Label>
                            <Clerk.Input
                                type="password"
                                required
                                className="p-2 rounded-md ring-1 ring-gray-300"
                            />
                            <Clerk.FieldError className="text-xs text-red-400" />
                        </Clerk.Field>

                        <SignIn.Action
                            submit
                            className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] transition hover:bg-blue-600"
                        >
                            Sign In
                        </SignIn.Action>
                    </SignIn.Step>
                </SignIn.Root>
            </motion.div>
        </div>
    );
};

export default LoginPage;
