"use client"
import React, { useContext, useState } from "react";
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { SidebarContext } from "../../../utils/SidebarContext";
import Link from "next/link";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Delete, DeleteIcon, LayoutDashboardIcon, Library, FileCheck, ListCheck, Calendar, House, ReceiptText, MessageSquare, Settings, LogOut } from 'lucide-react'
import { useAuth, AuthProvider } from '@/utils/(user)/UserAuthContext';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { useRouter } from "next/navigation";
const PROFILE_SRC = '/assets/Testmonial1.png';
import toast, { Toaster } from 'react-hot-toast';
import { Logout } from "@mui/icons-material";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {

    const router = useRouter();
    const pathname = usePathname() || '';
    const { user, logoutUser } = useAuth();
    const isActive = (path) => pathname === path || pathname.startsWith(path + '/');
    const handleLogout = async () => {
        try {
            const message = await logoutUser();
            toast.success(message)
        } catch (error) {
            console.log("Logout error:", error);
            toast.error('Logout Failed' + message)
        }
    }
    return (
        <aside className={` transition-all primary-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-55'} bg-white border-r border-gray-200 flex flex-col my-2 relative`}>
            <div className="p-4 border-b border-gray-100 relative">
                <div className="flex items-center">
                    <Image src={PROFILE_SRC} alt="Profile" width={40} height={40} className="rounded-full mr-3" />
                    {!isCollapsed && (
                        <div>
                            <h3 className="font-medium text-sm">{user?.firstName + ' ' + user?.lastName}</h3>
                            <p className="text-gray-500 text-xs">{user?.email}</p>
                        </div>
                    )}

                    <button
                        onClick={toggleSidebar}
                        aria-expanded={isCollapsed}
                        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        className="absolute top-4 -right-3 bg-white text-black p-1 rounded-full shadow-lg hover:bg-gray-200 transition-all duration-200 z-10 flex items-center justify-center w-6 h-6"
                    >
                        {isCollapsed ? <MenuIcon fontSize="small" /> : <MenuOpenIcon fontSize="small" />}
                    </button>
                </div>
            </div>

            <nav className={`transition-all duration-300 ease-in-out flex flex-col gap-1 p-2`}>
                <Link href="/dashboard/home" title={isCollapsed ? 'Dashboard' : undefined} className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 text-black ${isActive('/dashboard/home') ? 'bg-primary-500 text-white' : 'hover:bg-gray-300 '}`}>
                    <LayoutDashboardIcon size={22} className="mr-2" aria-hidden />
                    {!isCollapsed && <span className="text-sm">Dashboard</span>}
                </Link>

                <Link href="/dashboard/courses" title={isCollapsed ? 'Courses' : undefined} className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ${isActive('/dashboard/courses') ? 'bg-primary-500 text-white' : 'hover:bg-gray-300 '}`}>
                    <Library size={22} className="mr-2" aria-hidden />
                    {!isCollapsed && <span className="text-sm">Courses</span>}
                </Link>

                <Link href="/dashboard/tasks" title={isCollapsed ? 'Tasks' : undefined} className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ${isActive('/dashboard/tasks') ? 'bg-primary-500 text-white' : 'hover:bg-gray-300 '}`}>
                    <FileCheck size={22} className="mr-2" aria-hidden />
                    {!isCollapsed && <span className="text-sm">Tasks</span>}
                </Link>

                <Link href="/dashboard/todo" title={isCollapsed ? 'To Do' : undefined} className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ${isActive('/dashboard/todo') ? 'bg-primary-500 text-white' : 'hover:bg-gray-300 '}`}>
                    <ListCheck size={22} className="mr-2" aria-hidden />
                    {!isCollapsed && <span className="text-sm">To Do</span>}
                </Link>

                {/* <Link href="/dashboard/projects" title={isCollapsed ? 'Projects' : undefined} className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ${isActive('/dashboard/projects') ? 'bg-primary-300 text-white' : 'hover:bg-primary-300 hover:text-white'}`}>
                        <WorkOutlineIcon fontSize="small" className="mr-2" aria-hidden />
                        {!isCollapsed && <span className="text-sm">Projects</span>}
                    </Link> */}

                <Link href="/dashboard/calendar" title={isCollapsed ? 'Calendar' : undefined} className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ${isActive('/dashboard/calendar') ? 'bg-primary-500 text-white' : 'hover:bg-gray-300 '}`}>
                    <Calendar size={22} className="mr-2" aria-hidden />
                    {!isCollapsed && <span className="text-sm">Calendar</span>}
                </Link>


                <Link href="/home" title={isCollapsed ? 'Back To Portal' : undefined} className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ${isActive('/') ? 'bg-primary-500 text-white' : 'hover:bg-gray-300 '}`}>
                    <House size={22} className="mr-2" aria-hidden />
                    {!isCollapsed && <span className="text-sm">Back To Portal</span>}
                </Link>

                <Link href="/dashboard/invoices" title={isCollapsed ? 'Invoices' : undefined} className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ${isActive('/dashboard/invoices') ? 'bg-primary-500 text-white' : 'hover:bg-gray-300 '}`}>
                    <ReceiptText size={22} className="mr-2" aria-hidden />
                    {!isCollapsed && <span className="text-sm">Invoices</span>}
                </Link>

                <div className="mb-2">
                    <button onClick={() => setDropdown(true)} title={isCollapsed ? 'Messages' : undefined} className={`flex items-center text-gray-700 py-2 ${isCollapsed ? 'px-2 justify-center' : 'px-3'} rounded-lg hover:bg-gray-200 transition-all duration-200`}>
                        <MessageSquare size={22} className={`mr-2 ${isCollapsed ? 'ml-2' : 'ml-1'}`} aria-hidden />
                        {!isCollapsed && <span className="text-sm whitespace-nowrap">Messages</span>}
                    </button>

                </div>

                <Link href="/dashboard/settings" title={isCollapsed ? 'Settings' : undefined} className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ${isActive('/dashboard/settings') ? 'bg-primary-500 text-white' : ' hover:bg-gray-200 '}`}>
                    <Settings size={22} className="mr-2" />
                    {!isCollapsed && <span className="text-sm">Settings</span>}
                </Link>

                <button onClick={() => handleLogout()} href="/home" title={isCollapsed ? 'Logout' : undefined} className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 hover:bg-gray-200 `}>
                    <Logout fontSize="small" className="mr-2" />
                    {!isCollapsed && <span className="text-sm">Logout</span>}
                </button>
            </nav>
        </aside>
    )
}

export default Sidebar