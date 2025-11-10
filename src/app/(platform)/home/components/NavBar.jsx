
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/app/utils/AuthContext'
export default function NavBar() {
    const { user, } = useAuth();
    const pathname = usePathname() || ''
    const isActive = (p) => pathname === p || pathname.startsWith(p + '/')
    useEffect(() => {

    },)
    return (
        // <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-md">
        <header className="sticky top-0 z-50 flex items-center justify-center whitespace-nowrap border-b border-solid border-gray-300 dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">

            <div className="w-full mx-auto px-10 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/home" className="font-bold text-lg">Zenix</Link>
                    <nav className="hidden md:flex items-center space-x-2" aria-label="Primary">
                        <Link href="/home" className={`px-3 py-2 rounded ${isActive('/home') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Home</Link>
                        <Link href="/courses" className={`px-3 py-2 rounded ${isActive('/courses') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Courses</Link>
                        <Link href="/info" className={`px-3 py-2 rounded ${isActive('/info') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Info</Link>
                        <Link href="/pricing" className={`px-3 py-2 rounded ${isActive('/pricing') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Pricing</Link>
                    </nav>
                </div>
                <div>
                    {
                        user?.name != null ?
                            <div>

                                <Link href="/dashboard/home" className="px-3 py-2 bg-primary text-white rounded">Dashboard</Link>
                            </div>
                            :
                            <div className='flex items-center justify-between gap-5'>
                                <Link href="/login" className="px-3 py-2 bg-primary text-white rounded-2xl">Login</Link>
                                <Link href="/signup" className="px-3 py-2 bg-white text-primary border rounded-2xl">Signup</Link>
                            </div>

                    }
                </div>

            </div>
        </header>
    )
}
