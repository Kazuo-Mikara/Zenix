'use client'
import React, { useState, useRef } from 'react';
import { useTheme } from '@/components/theme';
import student_img from "../../../../../public/assets/anime_student.png"
import google_img from "../../../../../public/assets/google.png"
import MailIcon from '@mui/icons-material/Mail';
import KeyIcon from '@mui/icons-material/Key';
import GoogleIcon from '@mui/icons-material/Google';

import Image from 'next/image';
// import { NavLink, useNavigate } from 'react-router';
import Link from 'next/link';
import { loginUser } from '@/hooks/loginController';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../utils/(user)/UserAuthContext';
import { signIn } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast';

const loginpage = () => {
    const { theme } = useTheme()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);
    const loginForm = useRef();
    const router = useRouter();
    const handleGoogleLogin = async () => {
        const response = await signIn('google', {
            callbackUrl: '/home',
        });
        console.log("Sign-in result:", response);
        if (response.ok) {
            setLoading(false);
            router.push('/home');
            router.refresh();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = loginForm.current.email.value;
        const password = loginForm.current.password.value;
        try {
            const result = await loginUser('portal', email, password);
            console.log("Login result:", result);
            if (!result.success) {
                toast.error(result.error);
                setLoading(false);
                return;
            }
            if (result.success) {
                toast.success(result.message);
                const response = await signIn('portal', {
                    email,
                    password,
                    redirect: false,
                });
                console.log("Sign-in result:", response);
                if (response.ok) {
                    setLoading(false);
                }
            }
        } catch (err) {
            console.error("Login error:", err);
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
            router.push('/home');
            router.refresh();
        }
    }

    return (
        <div className=" w-full h-screen flex items-center justify-center backdrop-blur-sm ">
            <Toaster position="top-center" />
            <div className="w-full max-w-6xl  bg-linear-to-br dark:bg-linear-to-br from-[#DCEAF4] dark:from-[#0B1D3A] to-[#F5EBD9] dark:to-[#619bbd] dark:bg-gray-900 rounded-2xl shadow-card overflow-hidden flex flex-col md:flex-row relative z-10 p-6 md:p-12">
                <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-8 lg:px-12 py-8">
                    <h1 className="text-2xl font-extrabold font-poppins md:text-3xl text-gray-600 dark:text-gray-100 text-center mb-2">Empower your learning with EduPath</h1>
                    <h2 className="text-xl font-semibold font-poppins text-gray-600 dark:text-gray-100 text-center mb-8">Log In</h2>

                    <button
                        onClick={() => handleGoogleLogin()}
                        className="w-full hover:cursor-pointer bg-white/60 font-poppins dark:bg-white/10 text-gray-700/70 hover:text-gray-700 dark:text-white font-medium py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-600 flex items-center justify-center gap-3 hover:bg-white dark:hover:bg-white/5 transition-colors shadow-sm mb-8"
                    >
                        <Image src="/assets/google.png" alt="Google" width={24} height={24} />
                        Continue with Google
                    </button>

                    <form ref={loginForm} onSubmit={handleSubmit}>
                        <div className="mb-6 relative group">
                            <div className="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                                <MailIcon className="text-gray-500 group-focus-within:text-primary-400" />
                            </div>
                            <input
                                name="email"
                                className="w-full py-2.5 pl-8 pr-4 bg-transparent border-b outline-0 border-gray-400 dark:border-gray-400 text-gray-600 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 transition-colors"
                                placeholder="Your Email"
                                type="email"
                                required
                            />
                        </div>

                        <div className="mb-6 relative group">
                            <div className="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                                <KeyIcon className="text-gray-500 group-focus-within:text-primary-400" />
                            </div>
                            <input
                                name="password"
                                className="w-full py-2.5 pl-8 pr-4 bg-transparent border-0 border-b outline-0 border-gray-400 dark:border-gray-400 text-gray-600 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:ring-0 focus:border-primary transition-colors"
                                placeholder="Password"
                                type="password"
                                required
                            />
                        </div>

                        <div className="flex items-start mb-8">
                            <div className="flex items-center h-5">
                                <input className="custom-checkbox w-4 h-4 border border-gray-200 rounded bg-transparent focus:ring-primary text-primary cursor-pointer" id="terms" type="checkbox" required />
                            </div>
                            <label className="ml-2 text-sm text-gray-600 dark:text-gray-400" htmlFor="terms">
                                I agree all statements in <a className="text-primary-500 dark:text-gray-300 hover:underline" href="#">Terms of service.</a>
                            </label>
                        </div>

                        <button type="submit" className="w-full bg-primary-500 hover:bg-primary-700 text-white font-medium py-3 rounded-lg shadow-md transition-colors mb-6">
                            Sign In
                        </button>
                    </form>

                    <div className="text-center text-sm dark:text-[#FDF6E3] font-medium text-gray-400">
                        Don't have an account ? <Link className="font-medium hover:underline text-[#a0780c] dark:text-[#f1d178]" href="/auth/signup">Sign Up</Link>
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
                    <div className="w-full h-full min-h-[300px] md:min-h-[400px] rounded-2xl overflow-hidden shadow-lg relative bg-[#e8e4dc] transition-discrete">
                        {theme === 'dark' ? (
                            <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: "url('/assets/dark_cosmic_library_scene.png')", backgroundPosition: "center " }}></div>
                        ) : (
                            <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: "url('/assets/light_cosmic_library_scene.png')", backgroundPosition: "center " }}></div>
                        )}
                        <div className="absolute inset-0 bg-orange-100 mix-blend-multiply opacity-30 pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default loginpage;
