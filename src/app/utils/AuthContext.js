'use client'

import { useContext, useState, useEffect, createContext } from "react";
import Loader from "@/components/Loader";
import axios from 'axios';
import { useRouter } from 'next/navigation';
// Configure axios defaults for cookie handling
axios.defaults.withCredentials = true;
axios.defaults.baseURL = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
const AuthContext = createContext({
    user: null,
    loginUser: async () => { },
    logoutUser: async () => { },
    registerUser: async () => { },
});

export const AuthProvider = ({ children }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    useEffect(() => {
        // Check user status when component mounts
        checkUserStatus();
    }, [])

    const loginUser = async (userInfo) => {
        setLoading(false)
        try {
            const response = await axios.post('/api/login', userInfo, { withCredentials: true });

            if (response.status === 200) {
                setUser(response.data);
                setLoading(false);
                return "Login Successful! Welcome " + response.data.email;
            } else {
                setLoading(false);
                throw new Error(response.data?.error || 'Login failed');
            }
        }
        catch (error) {
            console.log("Login error:", error);
        }

    }

    const logoutUser = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/logout');
            if (response.status === 200) {
                setUser(null);
                setLoading(false);
                router.push('/home');
                return "Logout Successful! See you next time.";
            } else {
                setLoading(false);
                throw new Error(response.data?.error || 'Logout failed');
            }
        } catch (error) {
            console.log("Logout error:", error);
        } finally {
            setLoading(false);
        }
    }

    const registerUser = async (userInfo) => {
        setLoading(true);
        console.log('Registering user:', userInfo);

        try {
            const response = await axios.post('/api/register', userInfo);

            if (response.status === 201) {
                setUser(response.data);
                setLoading(false);
                return "Account Registration Successful! Welcome " + response.data.email;
            } else {
                setLoading(false);
                throw new Error(response.data?.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setLoading(false);

            // Handle different types of errors
            if (error.response?.data?.error) {
                throw new Error(error.response.data.error);
            } else if (error.message) {
                throw new Error(error.message);
            } else {
                throw new Error('Registration failed. Please try again.');
            }
        }
    }

    const checkUserStatus = async () => {
        try {
            console.log('Checking session status...');
            const response = await axios.get('/api/session', { withCredentials: true });
            console.log('Session response:', response.data);
            if (response.data.user) {
                setUser(response.data.user);
                return true;
            }
        } catch (error) {
            console.log("Session check error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const contextData = {
        user,
        loginUser,
        logoutUser,
        registerUser
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    // If you want to enforce usage inside a provider, uncomment the following:
    // if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}
export default AuthContext;