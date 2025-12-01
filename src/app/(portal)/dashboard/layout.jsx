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
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
export default function DashboardLayout({ children }) {
    const router = useRouter();



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
        <AuthProvider>
            <div className="flex h-screen bg-white">
                {/* Sidebar */}

                <Sidebar />
                {/* Main Content */}
                <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
                    {/* Top Navigation */}
                    <Navbar />

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
                                                    <div className="text-xs text-gray-500 mb-1">Gordon <span className="text-xs text-primary-300">13 min</span></div>
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
                                                            <div className="h-2 bg-primary-300 rounded-full">
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
        </AuthProvider>
    );
}
