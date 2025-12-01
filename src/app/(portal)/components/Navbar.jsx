'use client'
import React, { useState } from 'react'
import Link from "next/link";
import { DeleteIcon } from "lucide-react"
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const handleClear = () => {
        setSearchTerm('');
    };
    return (
        <header className=" border-b border-gray-300 px-6 py-3">
            <div className="flex justify-end items-center">
                <Link href="/dashboard/notification" title='Notification' className="px-4 py-2 rounded-lg flex items-center transition-colors duration-200 hover:bg-primary-300 hover:text-white">
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
    )
}

export default Navbar