'use client'
import React from 'react'
import Link from 'next/link';
import {
    Home, LayoutDashboard, Briefcase, Users, PieChart, Settings, Folder, LogOut
} from 'lucide-react';

const navItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Briefcase, label: 'Projects' },
    { icon: Users, label: 'Team' },
    { icon: PieChart, label: 'Analytics' },
    { icon: Folder, label: 'Files' },
    { icon: Settings, label: 'Settings' },
    { icon: LogOut, label: 'Logout' }
];

const Sidebar1 = ({ isHidden }) => {
    return (
        <aside
            className={`${isHidden ? 'w-48 opacity-100 m-2 border border-gray-200' : 'w-0 opacity-0 m-0 border-none'} fixed bg-white h-fit rounded-2xl shadow-xl flex flex-col justify-center items-center overflow-hidden transition-all duration-300 ease-in-out `}
        >
            {/* Nav Items */}
            <nav className="flex-1 px-3 py-4 space-y-2 overflow-hidden w-full">
                {navItems.map((item, index) => (
                    <Link
                        href={`admin_dashboard/${item.label.toLowerCase()}`}
                        key={index}
                        className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group relative
                            ${item.active
                                ? 'bg-primary-400 text-white shadow-primary/30 shadow-lg'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-primary-300 hover:cursor-pointer'
                            } ${isHidden ? 'justify-start' : 'justify-center'}`}
                    >
                        <item.icon className={`h-6 w-6 shrink-0  ${item.active ? 'text-white' : 'text-gray-500'}`} />

                        <span className='ml-3 font-medium overflow-hidden whitespace-nowrap transition-all duration-300'>
                            {item.label}
                        </span>


                        {/* Tooltip for collapsed state */}
                        {!isHidden && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                                {item.label}
                            </div>
                        )}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar1;