'use client'

import { useContext, useState, useEffect, createContext } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'
// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.baseURL = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

const AuthContext = createContext({
    user: null,
    loading: true, // Initial loading state
    isAuthenticated: false,
    loginUser: async (userInfo) => { },
    logoutUser: async () => { },
    registerUser: async (userInfo) => { },
    checkUserStatus: async () => { }, // Expose if needed externally
});

export const UserAuthProvider = ({ children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();
    const [user, setUser] = useState([]); // Initialize user as null
    // Effect to check user status on initial load
    useEffect(() => {
        if (status === 'loading') return;
        if (session?.user?.status === 'active' && session?.user?.role != 'admin') {
            setUser(session.user);
            setLoading(false);

        } else if (status === 'unauthenticated') {
            setUser(null);
            setLoading(false);
        }
    }, [session, status]); // Dependencies to re-evaluate the effect

    const loginUser = async (userInfo) => {
        setLoading(true); // Start loading
        try {
            const response = await axios.post('/api/login', userInfo);
            if (response.status === 200 && response.data?.user) {
                setUser(response.data.user);
                return { success: true, user: response.data.user };
            } else {
                throw new Error(response.data?.error || 'Login failed: Invalid response.');
            }
        } catch (error) {
            console.error("Login error:", error);
            setUser(null); // Ensure user is null on login failure
            throw error.response?.data?.error || error.message || 'An unknown login error occurred.';
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const logoutUser = async () => {
        setLoading(true); // Start loading
        try {
            const response = await axios.post('/api/logout'); // Fixed: POST method and correct endpoint
            if (response.status === 200) {
                setUser(null); // Clear user state immediately
                router.replace('/home');
                return { success: true, message: "Logout Successful." };
            } else {
                throw new Error(response.data?.error || 'Logout failed on server.');
            }
        } catch (error) {
            console.error("Logout error:", error);
            setUser(null); // Clear user state even if server-side cookie deletion fails
            router.replace('/home'); // Redirect to ensure client-side logout is reflected
            throw new Error('Logout failed due to a server or network issue.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const registerUser = async (userInfo) => {
        setLoading(true);
        console.log('Registering user:', userInfo);
        try {
            const response = await axios.post('/api/register', userInfo);
            if (response.status === 201 && response.data?.user) {
                setUser(response.data.user); // Auto-login after registration
                return { success: true, message: "Account Registration Successful! Welcome " + response.data.user.email, user: response.data.user };
            } else {
                throw new Error(response.data?.error || 'Registration failed: Invalid response.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error.response?.data?.error || error.message || 'Registration failed. Please try again.';
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const checkUserStatus = async () => {

        try {
            console.log('Checking session status...');
            console.log('Session response:', session);

            if (session && session.user) {
                setUser(session.user);
            } else {
                setUser(null); // Explicitly clear user if session is invalid or expired
            }
        } catch (error) {
            console.error("Session check error:", error);
            setUser(null); // Clear user if session check fails (e.g., network error)
        } finally {
            setLoading(false); // Stop loading after the check
        }
    };

    const contextData = {
        user,
        loading,
        loginUser,
        logoutUser,
        registerUser,
        checkUserStatus // Expose if components need to manually re-check session
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export const useUserAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useUserAuth must be used within a UserAuthProvider');
    }
    return context;
}

export default UserAuthProvider;
export const AuthProvider = UserAuthProvider;
export const useAuth = useUserAuth;