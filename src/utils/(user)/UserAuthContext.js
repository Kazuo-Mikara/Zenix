'use client'

import { useContext, useState, useEffect, createContext } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';

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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // Initialize user as null

    // Effect to check user status on initial load
    useEffect(() => {
        if (user === null & isAuthenticated === false) {
            checkLoggedIn();
        }
    }, []); // Dependencies to re-evaluate the effect


    const checkLoggedIn = async () => {
        const response = await axios.get('/api/session');
        if (isAuthenticated) {
            return;
        }
        else {

            if (response.data?.user) {
                // You would typically validate the token with your backend here
                // and then set the user state with the response.
                try {
                    const userData = response.data.user;
                    setUser(userData);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Token verification failed:', error);
                    setIsAuthenticated(false);
                    setUser(null);
                }
            }
            else {
                setIsAuthenticated(false);
                setUser(null);
            }
        };
        setLoading(false);
    }
    const loginUser = async (userInfo) => {
        setLoading(true); // Start loading
        try {
            const response = await axios.post('/api/login', userInfo);
            if (response.status === 200 && response.data?.user) {
                setUser(response.data.user);
                setIsAuthenticated(true);
                return { success: true, user: response.data.user };
            } else {
                throw new Error(response.data?.error || 'Login failed: Invalid response.');
            }
        } catch (error) {
            console.error("Login error:", error);
            setIsAuthenticated(false);
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
                setIsAuthenticated(false);
                router.replace('/home');
                return { success: true, message: "Logout Successful." };
            } else {
                throw new Error(response.data?.error || 'Logout failed on server.');
            }
        } catch (error) {
            console.error("Logout error:", error);
            setUser(null); // Clear user state even if server-side cookie deletion fails
            setIsAuthenticated(false);
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
        // Only proceed if we are in the initial loading phase or if the user state is null
        // This prevents re-checking if user data is already confirmed.
        if (!loading && user !== null) {
            return; // Already loaded and user state is known
        }

        // setLoading(true); // setLoading is handled by the finally block and initial state
        try {
            console.log('Checking session status...');
            const response = await axios.get('/api/session');
            console.log('Session response:', response.data);

            if (response.data && response.data.user) {
                setUser(response.data.user);
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
        isAuthenticated,
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