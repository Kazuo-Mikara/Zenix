"use client"
import React from 'react'
import NavBar from './home/components/NavBar'
import Footer from './home/components/Footer'

import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
export default function PlatformLayout({ children }) {
    const pathname = usePathname();
    return (
        <>

            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
                <NavBar />
                <main className="w-full mx-auto p-4 z-0">
                    {children}
                </main>
                <Footer />

            </div >

            <Toaster position="top-center" />
        </>
    )
}
