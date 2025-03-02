"use client";

import React, { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import Content from "@/components/webpage/Content";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Webpage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isSignedIn, isLoaded: userLoaded, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (userLoaded && isSignedIn) {
      const role = user?.publicMetadata.role ?? "dashboard";
      router.replace(`/${role}`);
    }
  }, [userLoaded, isSignedIn, user, router]);

  const handleLoad = () => {
    setTimeout(() => setIsLoaded(true), 600);
  };

  return (
    <div className="relative w-screen h-screen bg-gray-900">
      <div className="relative w-full h-full">
        <Spline
          scene="https://prod.spline.design/Y1lHTokbX9kL9nCm/scene.splinecode"
          onLoad={handleLoad}
        />
      </div>

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <p className="text-white text-xl font-semibold animate-pulse">Loading...</p>
        </div>
      )}

      {isLoaded && (
        <>
          <div
            className="absolute top-10 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-center pointer-events-none"
          >
            <h1 className="text-[50px] font-extrabold leading-snug drop-shadow-lg">
              <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent">
                WELCOME TO
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent">
                School Dashboard
              </span>
            </h1>
          </div>

          <div
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 pointer-events-auto" 
          >
            <Link href="/sign-in">
              <button className="px-12 py-4 text-lg font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition duration-300">
                SIGN IN
              </button>
            </Link>
          </div>

        </>
      )}
      <Content></Content>
    </div>
  );
}
