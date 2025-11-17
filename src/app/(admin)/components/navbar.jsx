'use client'
import Avatar from "../../../../public/assets/Testmonial1.png"
import { React, useState } from 'react'

import { SearchIcon, BellIcon, MessageSquare, Settings, Bell, Menu } from 'lucide-react'
import LanguageDropDownMenu from '@/components/examples/dropdown-menu/standard/languageDropDown'
import AdminProfileDropDown from '@/components/examples/dropdown-menu/profile/adminProfileDropdown'
const Navbar = () => {
    const [language, setLanguage] = useState('en')
    return (
        <div className="sticky top-0 bg-white border-b z-20 shadow-sm">
            <div className='flex flex-row justify-between items-center px-2 py-5'>
                <button className='p-2 text-gray-500 hover:bg-gray-200 rounded-full'>
                    <Menu className=" text-slate-400 " size={24} />
                </button>
                <div className='w-full flex flex-row justify-between mx-2'>
                    <div className="relative flex-1 max-w-sm hidden md:flex items-center">
                        <SearchIcon className="absolute left-3 h-4 w-4 text-gray-400" />
                        <input
                            type="search"
                            placeholder="Search here..."
                            className="w-full py-2 pl-10 pr-4 bg-slate-300  rounded-xl   transition"
                        />
                    </div>
                    <div className='flex flex-row justify-center items-center gap-5'>
                        <LanguageDropDownMenu language={language} setLanguage={setLanguage} />
                        <div className='flex flex-row justify-center items-center gap-8'>
                            <button className='relative p-2 text-gray-500 hover:bg-gray-200 rounded-full'>
                                <MessageSquare className=" text-slate-400 " size={24} />
                                <span className='absolute bottom-7 left-7  bg-primary-400 text-white text-xs rounded-sm px-1'>1</span>
                            </button>
                            <button className='relative p-2 text-gray-500 hover:bg-gray-200 rounded-full'>
                                <BellIcon className=" text-slate-400 " size={24} />
                                <span className='absolute bottom-7 left-7  bg-primary-400 text-white text-xs rounded-sm px-1'>1</span>  
                            </button>
                        </div>
                        <div className="flex flex-row gap-2">
                            <AdminProfileDropDown name="Kazuo" email="kazuo@gmail.com" image={Avatar.src || Avatar.default} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar