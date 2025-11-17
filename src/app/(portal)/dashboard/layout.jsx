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
import { useAuth } from '@/app/utils/AuthContext';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { useRouter } from "next/navigation";
const PROFILE_SRC = '/assets/Testmonial1.png';
import toast, { Toaster } from 'react-hot-toast';
import { Logout } from "@mui/icons-material";
export default function DashboardLayout({ children }) {
    const router = useRouter();

    const { isCollapsed, toggleSidebar } = useContext(SidebarContext) || {
        isCollapsed: false,
        toggleSidebar: () => { }
    };

    const handleClear = () => {
        setSearchTerm('');
    };
    const handleLogout = async () => {
        try {
            const message = await logoutUser();
            toast.success(message)
        } catch (error) {
            console.log("Logout error:", error);
            toast.error('Logout Failed' + message)
        }
    }
    const [searchTerm, setSearchTerm] = useState('')
    const pathname = usePathname() || '';
    const [showRightTab, setShowRightTab] = useState();
    const [isDropdown, setDropdown] = useState(false);
    const { user, logoutUser } = useAuth();
    const isActive = (path) => pathname === path || pathname.startsWith(path + '/');
    return (

        <div className="flex h-screen bg-white">
            {/* Sidebar */}
            <aside className={`max-h-full transition-all duration-400 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 flex flex-col my-2 relative`}>
                <div className="p-4 border-b border-gray-100 relative">
                    <div className="flex items-center">
                        <Image src={PROFILE_SRC} alt="Profile" width={40} height={40} className="rounded-full mr-3" />
                        {!isCollapsed && (
                            <div>
                                <h3 className="font-medium text-sm">{user?.name}</h3>
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
                    <Link href="/dashboard/home" title={isCollapsed ? 'Dashboard' : undefined} className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 text-black ${isActive('/dashboard/home') ? 'bg-primary text-white' : 'hover:bg-gray-300 '}`}>
                        <LayoutDashboardIcon size={22} className="mr-2" aria-hidden />
                        {!isCollapsed && <span className="text-sm">Dashboard</span>}
                    </Link>

                    <Link href="/dashboard/courses" title={isCollapsed ? 'Courses' : undefined} className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ${isActive('/dashboard/courses') ? 'bg-primary text-white' : 'hover:bg-gray-300 '}`}>
                        <Library size={22} className="mr-2" aria-hidden />
                        {!isCollapsed && <span className="text-sm">Courses</span>}
                    </Link>

                    <Link href="/dashboard/tasks" title={isCollapsed ? 'Tasks' : undefined} className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ${isActive('/dashboard/tasks') ? 'bg-primary text-white' : 'hover:bg-gray-300 '}`}>
                        <FileCheck size={22} className="mr-2" aria-hidden />
                        {!isCollapsed && <span className="text-sm">Tasks</span>}
                    </Link>

                    <Link href="/dashboard/todo" title={isCollapsed ? 'To Do' : undefined} className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ${isActive('/dashboard/todo') ? 'bg-primary text-white' : 'hover:bg-gray-300 '}`}>
                        <ListCheck size={22} className="mr-2" aria-hidden />
                        {!isCollapsed && <span className="text-sm">To Do</span>}
                    </Link>

                    {/* <Link href="/dashboard/projects" title={isCollapsed ? 'Projects' : undefined} className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ${isActive('/dashboard/projects') ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'}`}>
                        <WorkOutlineIcon fontSize="small" className="mr-2" aria-hidden />
                        {!isCollapsed && <span className="text-sm">Projects</span>}
                    </Link> */}

                    <Link href="/dashboard/calendar" title={isCollapsed ? 'Calendar' : undefined} className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ${isActive('/dashboard/calendar') ? 'bg-primary text-white' : 'hover:bg-gray-300 '}`}>
                        <Calendar size={22} className="mr-2" aria-hidden />
                        {!isCollapsed && <span className="text-sm">Calendar</span>}
                    </Link>


                    <Link href="/home" title={isCollapsed ? 'Back To Portal' : undefined} className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ${isActive('/') ? 'bg-primary text-white' : 'hover:bg-gray-300 '}`}>
                        <House size={22} className="mr-2" aria-hidden />
                        {!isCollapsed && <span className="text-sm">Back To Portal</span>}
                    </Link>

                    <Link href="/dashboard/invoices" title={isCollapsed ? 'Invoices' : undefined} className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ${isActive('/dashboard/invoices') ? 'bg-primary text-white' : 'hover:bg-gray-300 '}`}>
                        <ReceiptText size={22} className="mr-2" aria-hidden />
                        {!isCollapsed && <span className="text-sm">Invoices</span>}
                    </Link>

                    <div className="mb-2">
                        <button onClick={() => setDropdown(true)} title={isCollapsed ? 'Messages' : undefined} className={`flex items-center text-gray-700 py-2 ${isCollapsed ? 'px-2 justify-center' : 'px-3'} rounded-lg hover:bg-gray-200 transition-all duration-200`}>
                            <MessageSquare size={22} className={`mr-2 ${isCollapsed ? 'ml-2' : 'ml-1'}`} aria-hidden />
                            {!isCollapsed && <span className="text-sm whitespace-nowrap">Messages</span>}
                        </button>

                        {!isCollapsed && (
                            <div className="ml-8 mt-1">
                                <div className="flex items-center justify-between text-xs py-1">
                                    <span className="text-gray-600">Unread</span>
                                    <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-0.5">3</span>
                                </div>
                                <div className="flex items-center justify-between text-xs py-1">
                                    <span className="text-gray-600">Important</span>
                                    <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-0.5">4</span>
                                </div>
                                <div className="flex items-center justify-between text-xs py-1">
                                    <span className="text-gray-600">Archived</span>
                                    <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-0.5">70</span>
                                </div>
                                <div className="flex items-center justify-between text-xs py-1">
                                    <span className="text-gray-600">All</span>
                                    <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-0.5">77</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <Link href="/dashboard/settings" title={isCollapsed ? 'Settings' : undefined} className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ${isActive('/dashboard/settings') ? 'bg-primary text-white' : ' hover:bg-gray-200 '}`}>
                        <Settings size={22} className="mr-2" />
                        {!isCollapsed && <span className="text-sm">Settings</span>}
                    </Link>

                    <button onClick={() => handleLogout()} href="/home" title={isCollapsed ? 'Logout' : undefined} className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200 hover:bg-gray-200 `}>
                        <Logout fontSize="small" className="mr-2" />
                        {!isCollapsed && <span className="text-sm">Logout</span>}
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
                {/* Top Navigation */}
                <header className=" border-b border-gray-300 px-6 py-3">
                    <div className="flex justify-end items-center">
                        <Link href="/dashboard/notification" title='Notification' className="px-4 py-2 rounded-lg flex items-center transition-colors duration-200 hover:bg-primary hover:text-white">
                            <NotificationsNoneOutlinedIcon fontSize="small" className="mr-2" aria-hidden />
                        </Link>
                        <div className="relative">
                            <div className="flex justify-center items-center bg-gray-100 gap-2 rounded-lg px-3 py-2">
                                <SearchIcon fontSize="small" className="text-gray-500 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search or type a command"
                                    // 2. Bind value and change handler
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-transparent border-none outline-none w-42 focus:w-64 text-sm placeholder:text-gray-500 transition-all duration-300 ease-in-out"
                                />
                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={handleClear}
                                        className="text-gray-500 hover:text-gray-800 p-0.5 rounded-full transition-colors ml-1 focus:outline-none"
                                    >
                                        <DeleteIcon className="h-4 w-4" />
                                    </button>
                                )}
                                <span className="bg-white text-xs text-gray-500 px-1.5 py-0.5 rounded ml-2">⌘F</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area - This is where Outlet renders nested routes */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left Content - Outlet renders the current route's component */}
                    <div className="flex-1 overflow-y-auto p-6 bg-white">
                        {children}
                        <Toaster />
                    </div>

                    {/* Right Sidebar - conditionally shown */}
                    {showRightTab && (
                        <div className="md:w-60 border-l transition-all duration-200 ease-in border-gray-200 overflow-y-auto">
                            <div className="p-4">
                                {/* Progress Section */}
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-sm font-medium">Progress</h2>
                                        <button className="text-xs text-gray-500 flex items-center">
                                            Monthly
                                            <KeyboardArrowDownIcon fontSize="small" className="ml-1" />
                                        </button>
                                    </div>

                                    <div className="h-32 flex items-end space-x-2">
                                        {[3, 4, 5, 6, 7, 9, 12, 8, 7, 9, 10, 11].map((height, index) => (
                                            <div key={index} className="flex-1 flex flex-col items-center">
                                                <div
                                                    className={`w-full rounded-t-sm ${index === 6 ? 'bg-[#56ac9f]' : 'bg-[#636365]'}`}
                                                    style={{ height: `${height * 8}px` }}
                                                ></div>
                                                <span className="text-xs text-gray-500 mt-1">{index + 1}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Chat Section */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-sm font-medium">Chat with a Tutor</h2>
                                        <div className="flex items-center">
                                            <span className="text-xs text-gray-500 mr-2">Live</span>
                                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                        <div className="text-xs text-gray-500 mb-2">May 16, 2023</div>

                                        <div className="flex items-start mb-3">
                                            <div className="shrink-0 mr-2">
                                                <Image src={PROFILE_SRC} alt="User" width={32} height={32} className="w-8 h-8 rounded-full" />
                                            </div>
                                            <div>
                                                <div className="bg-[#56ac9f] text-gray-100 rounded-lg p-2 max-w-xs">
                                                    <p className="text-sm">Hi, Gordon!</p>
                                                    <p className="text-sm">I have a question...</p>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">7:05 am</div>
                                            </div>
                                        </div>

                                        <div className="flex items-start mb-3">
                                            <div className="shrink-0 mr-2">
                                                <Image src="https://randomuser.me/api/portraits/men/32.jpg" alt="Tutor" width={32} height={32} className="w-8 h-8 rounded-full" unoptimized />
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 mb-1">Gordon <span className="text-xs text-gray-400">13 min</span></div>
                                                <div className="bg-gray-200 rounded-lg p-2 max-w-xs">
                                                    <p className="text-sm">Hi, Stasa! I&apos;m here to help you</p>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">7:05 am</div>
                                            </div>
                                        </div>

                                        <div className="flex items-start mb-3">
                                            <div className="shrink-0 mr-2">
                                                <Image src={PROFILE_SRC} alt="User" width={32} height={32} className="w-8 h-8 rounded-full" />
                                            </div>
                                            <div>
                                                <div className="bg-[#56ac9f] text-gray-100 rounded-lg p-2 max-w-xs flex items-center">
                                                    <PlayCircleFilledWhiteOutlinedIcon className="text-gray-100 mr-2" fontSize="small" />
                                                    <GraphicEqIcon className="text-gray-100" fontSize="medium" />
                                                    <GraphicEqIcon className="text-gray-600 mr-2" fontSize="medium" />
                                                    <div className="flex-1">
                                                        <div className="h-2 bg-gray-400 rounded-full">
                                                            <div className="h-full w-3/4 bg-gray-500 rounded-full"></div>
                                                        </div>
                                                    </div>
                                                    <span className="text-xs ml-2">0:16</span>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">7:05 am</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        {/* Input Field */}
                                        <input
                                            type="text"
                                            placeholder="Search or type a command"
                                            className="bg-transparent border-none outline-none w-32 focus:w-64 text-sm placeholder:text-gray-500 transition-all duration-300 ease-in-out"
                                        />
                                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center">

                                            <button
                                                type="button"
                                                onClick={handleClear()}
                                                className="text-gray-500 hover:text-gray-800 p-0.5 rounded-full transition-colors ml-1 focus:outline-none"
                                            >
                                                <DeleteIcon className="h-4 w-4" />
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div >
        </div >
    );
}
