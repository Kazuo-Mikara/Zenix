'use client'
import { useSession, signOut } from "next-auth/react"
import Avatar from "../../../../public/assets/Testmonial1.png"
import { React, useState } from 'react'
import { SearchIcon, BellIcon, MessageSquare, Settings, Bell, Menu, ListIndentDecrease } from 'lucide-react'
import LanguageDropDownMenu from '@/components/examples/dropdown-menu/standard/languageDropDown'
import AdminProfileDropDown from '@/components/examples/dropdown-menu/profile/adminProfileDropdown'
import { useRouter } from 'next/navigation'
import { toast, Toaster } from 'react-hot-toast'
const Navbar = ({ isHidden, toggleSidebar }) => {
    const [language, setLanguage] = useState('en')
    const { data: session, loading } = useSession()
    const userName = session?.user?.userName;
    const userEmail = session?.user?.email
    const userRole = session?.user?.role
    const router = useRouter()
    const handleLogout = async () => {
        try {
            const result = await signOut()

            if (result?.error) {
                toast.error('Error on logging out');
            } else if (result?.ok) {
                setTimeout(() => {
                    toast.success('Logout successful!');
                }, 1000)

            }
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('An error occurred during logout');
        } finally {
            router.push('/admin_dashboard/auth/login');
        }
    }
    return (
        <div className="sticky top-0 bg-white border-b z-50 shadow-sm">
            <Toaster position="top-center" />
            <div className='flex flex-row justify-between items-center px-2 py-5'>
                <div className='w-full flex flex-row justify-between mx-2'>
                    <div className='flex flex-row justify-center items-center gap-5'>
                        <button
                            onClick={toggleSidebar}
                            className=" bg-white border border-gray-200 rounded-full p-3 shadow-md hover:bg-gray-50 transition-colors  "
                        >
                            {!isHidden ? <ListIndentDecrease className="h-5 w-5 " /> : <Menu className="h-5 w-5 " />}
                        </button>
                        <h3 className='text-2xl font-bold'>Zenix</h3>
                        <div className="relative flex-1 max-w-sm hidden md:flex items-center">
                            <SearchIcon className="absolute left-3 h-5 w-5 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search here..."
                                className="w-full py-2 pl-10 pr-4 bg-slate-300  rounded-xl   transition"
                            />
                        </div>
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
                            <AdminProfileDropDown name={userName} email={userEmail} role={userRole} image={Avatar.src || Avatar.default} onLogout={handleLogout} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar