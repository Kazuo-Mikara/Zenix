"use client"
import React from 'react'
import NavBar from './home/components/NavBar'
import Footer from './home/components/Footer'
import { UserAuthProvider } from "@/utils/(user)/UserAuthContext";
export default function PlatformLayout({ children }) {

    return (

        <UserAuthProvider>
            <div className=" bg-gray-50">
                <NavBar />
                <main className="w-full mx-auto p-4 z-0">
                    {children}
                </main>
                <Footer />
            </div >
        </UserAuthProvider>

    )
}
