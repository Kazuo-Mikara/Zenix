'use client'
import React, { use, useState } from 'react'
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import BreadCrumbsNavigation from '../components/breadCrumbs';
import { usePathname } from 'next/navigation';
import { AdminAuthProvider } from '@/utils/(admin)/AuthContext';
const adminRootLayout = ({ children }) => {
    const [isHidden, setIsHidden] = useState(false);
    const toggleSidebar = () => {
        setIsHidden(!isHidden);
        console.log(isHidden ? "hidden" : "visible")
    };
    const pathname = usePathname()
    const segments = pathname.split('/')
    const isDashboardPage = pathname === '/admin_dashboard'
    const isAuthPage = pathname === '/admin_dashboard/auth/login' || pathname === '/admin_dashboard/auth/register'
    return (
        <div class="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
            <div class="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                <div class="flex h-full w-full grow">
                    {/* Sidebar */}
                    {isAuthPage ? '' : <Sidebar hidden={isHidden} />}
                    {/* Main Content */}
                    <div className="flex flex-col h-full w-full">
                        <AdminAuthProvider>
                            <main class="flex-1">
                                {isAuthPage ? '' : <Navbar isHidden={isHidden} toggleSidebar={toggleSidebar} />}
                                {segments.length > 2 && !isAuthPage ?
                                    < BreadCrumbsNavigation /> : ''
                                }
                                {children}
                            </main>
                        </AdminAuthProvider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default adminRootLayout