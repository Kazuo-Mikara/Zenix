'use client'
import React, { use } from 'react'
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import BreadCrumbsNavigation from '../components/breadCrumbs';
import { usePathname } from 'next/navigation';

const adminRootLayout = ({ children }) => {
    const pathname = usePathname()
    const segments = pathname.split('/')
    return (
        <div className="min-h-screen flex bg-gray-50">
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0">
                <Navbar />
                {segments.length > 2 ?
                    < BreadCrumbsNavigation /> : ''
                }
                <div className="flex flex-row lg:flex-row flex-1 min-w-0">
                    {children}
                </div>
            </div>
            {/* Overlay for mobile sidebar */}
            {/* {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )} */}
        </div>
    )
}

export default adminRootLayout