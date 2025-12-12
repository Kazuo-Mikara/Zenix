

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import ProfileDropDown from '@/components/examples/dropdown-menu/profile/dropdown-menu-profile-1'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/utils/(user)/UserAuthContext'
export default function NavBar() {
    const { data: session, status } = useSession();
    console.log(session);
    const [user, setUser] = useState(null);
    const pathname = usePathname() || ''
    const role = session?.user?.role;
    const isActive = (p) => pathname === p || pathname.startsWith(p + '/')
    const handleLogout = async () => {
        try {
            toast.success("Signing out successfully");
            // Use redirect: false to prevent immediate redirect and allow toast to show
            await signOut({ redirect: false });
        } catch (error) {
            console.error("Logout error:", error);
            toast.error('Logout Failed: ' + (error?.message || 'Unknown error'));
        }
    }

    useEffect(() => {
        if (status === 'authenticated') {
            setUser(session.user);
        }
    }, [session, status])
    return (
        // <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-md">
        <header className="sticky top-0 z-50 flex items-center justify-center whitespace-nowrap border-b border-solid border-gray-300 dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">

            <div className="w-full mx-auto px-10 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-4 ">
                    <Link href="/home" className="font-bold text-lg">Zenix</Link>
                    <nav className="hidden md:flex items-center space-x-2 " aria-label="Primary">
                        <Link href="/home" className={`px-3 py-2 rounded-full  ${isActive('/home') ? 'border border-primary-400 text-primary-400' : 'text-gray-700 hover:bg-gray-100'}`}>Home</Link>
                        <Link href="/courses" className={`px-3 py-2 rounded-full ${isActive('/courses') ? 'border border-primary-400 text-primary-400' : 'text-gray-700 hover:bg-gray-100'}`}>Courses</Link>
                        <Link href="/contact" className={`px-3 py-2 rounded-full ${isActive('/contact') ? 'border border-primary-400 text-primary-400' : 'text-gray-700 hover:bg-gray-100'}`}>Contact</Link>
                        <Link href="/pricing" className={`px-3 py-2 rounded-full ${isActive('/pricing') ? 'border border-primary-400 text-primary-400' : 'text-gray-700 hover:bg-gray-100'}`}>Pricing</Link>
                    </nav>
                </div>
                <div>
                    {
                        status === 'authenticated' && role != 'admin' ?
                            <div className='flex items-center justify-between gap-5'>

                                <Link href="/dashboard/home" className="px-3 py-2 bg-primary-400 text-white rounded">Dashboard</Link>
                                <ProfileDropDown name={user?.firstName + ' ' + user?.lastName} email={user?.email} onLogout={handleLogout} plan="Free" />
                            </div>
                            :
                            <div className='flex items-center justify-between gap-5'>
                                <Link href="/auth/login" className="px-5 py-2 bg-primary-400 text-white rounded-2xl">Login</Link>
                                <Link href="/auth/signup" className="px-3 py-2 bg-white text-primary border-2 border-gray-300 rounded-2xl">Signup</Link>
                            </div>

                    }
                </div>

            </div>

        </header>
    )
}
