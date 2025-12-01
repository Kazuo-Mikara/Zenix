'use client'
import React, { use, useState } from 'react'
import Sidebar from '../components/sidebar1';
import Navbar from '../components/navbar';
import BreadCrumbsNavigation from '../components/breadCrumbs';
import { usePathname } from 'next/navigation';
import { AdminAuthProvider } from '@/utils/(admin)/AuthContext';
const adminRootLayout1 = ({ children, userAnalytics, userTimeline }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };
    const pathname = usePathname()
    const segments = pathname.split('/')
    const isDashboardPage = pathname === '/admin_dashboard'
    const isAuthPage = pathname === '/admin_dashboard/auth/login' || pathname === '/admin_dashboard/auth/register'
    return (
        <AdminAuthProvider>
            <div className=" flex flex-col bg-gray-50 ">
                <div className='sticky top-0 z-50'>
                    {isAuthPage ? '' : <Navbar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />}
                    {segments.length > 2 && !isAuthPage ?
                        < BreadCrumbsNavigation /> : ''
                    }
                </div>

                <div className="flex flex-row mx-5 flex-1">
                    <Sidebar isHidden={isExpanded} />
                    <div className='flex flex-col w-full '>
                        {children}
                        {isDashboardPage && (
                            <div className="grid grid-cols-2 p-2  rounded-xl shadow-lg border border-gray-100">
                                {userAnalytics}
                                {userTimeline}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminAuthProvider>
    )
}
export default adminRootLayout1
{/* Overlay for mobile sidebar */ }
{/* {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )} */}