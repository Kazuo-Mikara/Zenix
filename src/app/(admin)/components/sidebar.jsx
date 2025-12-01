'use client'
import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home, LayoutDashboard, Briefcase, Users, PieChart, Settings, Folder, LogOut, Book
} from 'lucide-react';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin_dashboard' },
    { icon: Users, label: 'User Management', href: '/admin_dashboard/users' },
    { icon: Book, label: 'Course Management', href: '/admin_dashboard/courses' },
    { icon: PieChart, label: 'Analytics & Reports', href: '/admin_dashboard/analytics_reports' },
    { icon: Folder, label: 'Content Library', href: '/admin_dashboard/content_library' },
    { icon: Settings, label: 'Announcements', href: '/admin_dashboard/announcements' },
    { icon: LogOut, label: 'System Settings', href: '/admin_dashboard/system_settings' }
];

const Sidebar = ({ hidden }) => {
    const pathname = usePathname() || ''
    const isActive = (p) => {
        const cleanPathname = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
        const cleanP = p === '/' ? '/' : p.replace(/\/$/, '');
        if (cleanPathname === cleanP) {
            return true;
        }
        if (p === '/admin_dashboard' && cleanPathname.startsWith('/admin_dashboard/')) {
            return false;
        }
        return cleanPathname.startsWith(cleanP + '/');
    };
    return (
        <aside className={`flex h-auto min-h-screen flex-col bg-white dark:bg-[#111418] transition-all duration-300 ease-in-out overflow-hidden ${hidden ? 'w-0 p-0 border-none opacity-0' : 'w-68 p-4 border-r border-gray-200 dark:border-[#283039] opacity-100'}`}>
            <div className="flex h-full min-h-[700px] flex-col justify-between">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 text-gray-900 dark:text-white mb-4 px-3">
                        <span className="material-symbols-outlined text-primary-300" style={{ fontSize: '32px' }}>school</span>
                        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Zenix</h2>
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                        {navItems.map((item, index) => {
                            return (
                                <Link
                                    href={item.href}
                                    key={index}
                                    className={`flex items-center gap-3 px-3 py-2 text-gray-600 dark:hover:bg-primary/20 rounded-lg transition-all duration-200 ${isActive(item.href)
                                        ? 'bg-primary-400 text-white shadow-primary/30 shadow-lg'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-primary-300 hover:cursor-pointer'
                                        } ${!hidden ? 'justify-start' : 'justify-center'}`}
                                >
                                    <item.icon className={`h-6 w-6 shrink-0 ${isActive(item.href) ? 'text-white' : 'text-gray-500'}`} />

                                    <span className='text-sm font-medium leading-normal transition-discrete ease-in-out duration-500'>
                                        {item.label}
                                    </span>

                                    {/* Tooltip for collapsed state */}
                                    {hidden && (
                                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                                            {item.label}
                                        </div>
                                    )}
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <Link href="/admin_dashboard/courses/add" className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary-300 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary-300/90 transition-colors duration-200">
                        <span className="truncate">Create Course</span>
                    </Link>
                    <div className="flex gap-3 border-t border-gray-200 dark:border-[#283039] pt-4">
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="Avatar of Admin Name" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCJS-hNaPDc9Y3ILfme1mTzPAto9FKM5H-5BUQu2NH5Sdv9RDsucQtqY-EU8mq6i82VrsVNUvJvkCXsRpJXhuuCrC4wgsX8MoRHSkBOnaKr1ZsHLhu2fDcsD6fq1yQGts1Q_yJi5T_AUuQFknUOMnF1uXIGpTBk6bK1jqInoGEOc8iw94Xbr175pRE7OEoyyeW_VW6n9cmyc5y7D1V2IQcXYwK2tCffoCW05A5iwoxN0MTkgxgsYpMo-byUfa-2ahO724YHbGmH9lu8")' }}></div>
                        <div className="flex flex-col">
                            <h1 className="text-gray-900 dark:text-white text-base font-medium leading-normal">Admin Name</h1>
                            <p className="text-gray-500 dark:text-[#9dabb9] text-sm font-normal leading-normal">admin@example.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;