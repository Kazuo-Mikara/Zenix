'use client'
import React, { useState } from 'react'
import {
    Home, LayoutDashboard, Briefcase, Users, PieChart, TrendingUp, Bell, Settings,
    Search, ChevronDown, MessageSquare, Phone, Globe, Mail, MoreVertical, Star,
    User, Folder, BarChart3, LineChart
} from 'lucide-react';
const navItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Briefcase, label: 'Projects' },
    { icon: Users, label: 'Team' },
    { icon: PieChart, label: 'Analytics' },
    { icon: Folder, label: 'Files' },
    { icon: Settings, label: 'Settings' },
];
const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (

        <aside
            className={`fixed lg:sticky top-0 left-0 h-full w-20 flex flex-col  justify-center items-center py-6 bg-white border-r transition-transform duration-300 z-30 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`
            }
        >
            {/* Logo/Icon */}
            <div className="mb-10 text-primary h-10 w-10 flex items-center justify-center rounded-full bg-indigo-50">
                <LayoutDashboard className="h-6 w-6" />
            </div>

            {/* Nav Items */}
            <nav className="space-y-2 flex flex-col items-center">
                {navItems.map((item, index) => (
                    <button
                        key={index}
                        className={`p-3 rounded-xl transition hover:bg-gray-100 hover:text-black ${item.active ? 'bg-primary-200 text-white border border-primary' : 'text-gray-500'}`}
                        title={item.label}
                        onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile click
                    >
                        <item.icon className="h-6 w-6" />
                    </button>
                ))}
            </nav>
        </aside>
    );

}
export default Sidebar