'use client'

import { useContext, useState, useEffect, createContext } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
// Configure axios defaults for cookie handling
axios.defaults.withCredentials = true;
axios.defaults.baseURL = typeof window !== 'undefined' ? window.location.origin : 'https://zenix-edu.netlify.app/';

const AdminAuthContext = createContext({
    admin: null,
    loginAdmin: async () => { },
    logoutAdmin: async () => { },
});

export const AdminAuthProvider = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(null);

    const { data: session, status } = useSession();
    useEffect(() => {

        if (status === 'loading') return;

        const isOnAuthPage = pathname.startsWith('/admin_dashboard/auth');

        if (session?.user?.role === 'admin') {
            setAdmin(session.user);
            setLoading(false);
        } else if (status === 'unauthenticated') {
            setAdmin(null);
            setLoading(false);

            if (!isOnAuthPage) {
                router.push('/admin_dashboard/auth/register');
            }
        }

        else if (session?.user?.role !== 'admin') {
            setAdmin(null);
            setLoading(false);

            if (!isOnAuthPage) {
                router.push('/admin_dashboard/auth/register');
            }
        }
    }, [session, status, pathname]);

    // const loginAdmin = async (adminInfo) => {
    //     setLoading(true);
    //     try {
    //         const response = await axios.post('/api/admin/login', adminInfo);

    //         if (response.status === 200) {
    //             setAdmin(response.data);
    //             setLoading(false);
    //             return { success: true, data: response.data };
    //         }
    //     }
    //     catch (error) {
    //         console.log("Admin login error:", error);
    //         setLoading(false);
    //         return {
    //             success: false,
    //             error: error.response?.data?.error || 'Admin login failed'
    //         };
    //     }
    // }

    // const logoutAdmin = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await axios.post('/api/admin/logout');
    //         if (response.status === 200) {
    //             setAdmin(null);
    //             setLoading(false);
    //             router.push('/admin/login');
    //             return { message: "Admin logout successful!" };
    //         } else {
    //             setLoading(false);
    //             throw new Error(response.data?.error || 'Logout failed');
    //         }
    //     } catch (error) {
    //         console.log("Admin logout error:", error);
    //         setLoading(false);
    //         throw error;
    //     }
    // }

    const checkAdminStatus = () => {

        return session?.user?.role === 'admin';
    }

    const contextData = {
        admin,
        // loginAdmin,
        // logoutAdmin,
        loading
    }

    return (
        <AdminAuthContext.Provider value={contextData}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export const useAdminAuth = () => {
    const context = useContext(AdminAuthContext);
    return context;
}

export default AdminAuthContext;