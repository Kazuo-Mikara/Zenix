import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
// Assuming these imports resolve to objects with a `src` property
import femaleUserImgData from "../../../../../public/assets/female_user.png";
import maleUserImgData from "../../../../../public/assets/male_user.png";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProfileDropDown from '@/components/examples/dropdown-menu/profile/dropdown-menu-profile-1';
import { toast } from 'react-hot-toast';

import { ThemeToggleIcon } from '@/components/theme';

export default function NavBar() {
    const { data: session, status } = useSession();
    console.log("Session data:", session);
    const [user, setUser] = useState(null);
    const pathname = usePathname() || '';
    const role = session?.user?.role;
    const isActive = (p) => pathname === p || pathname.startsWith(p + '/');

    const handleUserAvatar = () => {
        if (!session || !session.user) {
            return '';
        }
        if (session.user.image && typeof session.user.image === 'string') {
            return session.user.image;
        }
        if (session.user.gender === 'male') {
            return maleUserImgData.src;
        } else {
            return femaleUserImgData.src;
        }
    };

    const handleLogout = async () => {
        try {
            toast.success("Signing out successfully");
            await signOut({ redirect: false });
        } catch (error) {
            console.error("Logout error:", error);
            toast.error('Logout Failed: ' + (error?.message || 'Unknown error'));
        }
    };

    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            setUser(session.user);
        } else {
            setUser(null);
        }
    }, [session, status]);


    const displayUserName = user?.firstName ? `${user.firstName} ${user.lastName}` : (user?.name || '');

    const avatarImageSrc = status === 'authenticated' ? handleUserAvatar() : '';

    return (
        <header className="sticky top-0 z-50 flex items-center justify-center whitespace-nowrap border-b border-solid border-gray-300 dark:border-gray-700 backdrop-blur-md">
            <div className="w-full mx-auto px-10 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-4 ">
                    <Link href="/home" className="font-bold text-lg text-gray-900 dark:text-white">Zenix</Link>
                    <nav className="hidden md:flex items-center space-x-2 " aria-label="Primary">
                        <Link href="/home" className={`px-3 py-2 rounded-full  ${isActive('/home') ? 'border border-primary-400 text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Home</Link>
                        <Link href="/courses" className={`px-3 py-2 rounded-full ${isActive('/courses') ? 'border border-primary-400 text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Courses</Link>
                        <Link href="/contact" className={`px-3 py-2 rounded-full ${isActive('/contact') ? 'border border-primary-400 text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Contact</Link>
                        <Link href="/pricing" className={`px-3 py-2 rounded-full ${isActive('/pricing') ? 'border border-primary-400 text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Pricing</Link>
                    </nav>
                </div>
                <div>
                    {
                        status === 'authenticated' && role !== 'admin' ?
                            <div className='flex items-center justify-between gap-5'>
                                <ThemeToggleIcon />
                                <Link href="/dashboard/home" className="px-3 py-2 bg-primary-400 text-white rounded">Dashboard</Link>
                                <ProfileDropDown
                                    name={displayUserName}
                                    email={user?.email}
                                    onLogout={handleLogout}
                                    plan="Free"
                                    image={avatarImageSrc}
                                />
                            </div>
                            :
                            <div className='flex items-center justify-between gap-5'>
                                <ThemeToggleIcon />
                                <Link href="/auth/login" className="px-5 py-2 bg-primary-400 text-white rounded-2xl">Login</Link>
                                <Link href="/auth/signup" className="px-3 py-2 bg-white dark:bg-gray-800 text-primary dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-2xl">Signup</Link>
                            </div>
                    }
                </div>
            </div>
        </header>
    );
}
