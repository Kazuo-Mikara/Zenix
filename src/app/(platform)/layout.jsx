"use client"
import React from 'react'
import NavBar from './home/components/NavBar'
import Footer from './home/components/Footer'
import { UserAuthProvider } from "@/utils/(user)/UserAuthContext";
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
export default function PlatformLayout({ children }) {
    const pathname = usePathname();
    return (
        <>
            <UserAuthProvider>
                <div className=" bg-gray-50">
                    {
                        pathname !== "/auth/login" && pathname !== "/auth/signup" &&
                        <NavBar />
                    }
                    <main className="w-full mx-auto p-4 z-0">

                        {children}
                    </main>
                    <Footer />

                </div >
            </UserAuthProvider>
            <Toaster position="top-center" />
        </>
    )
}
