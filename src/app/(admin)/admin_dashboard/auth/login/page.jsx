'use client'

import React, { useState } from 'react'
import { Shield, User, LockKeyhole } from 'lucide-react'
import { loginUser } from '@/hooks/loginController'
import { signIn } from 'next-auth/react'
import { useAdminAuth } from '@/utils/(admin)/AuthContext';
import { useRouter } from 'next/navigation'
import { toast, Toaster } from 'react-hot-toast'
import Link from 'next/link'
import axios from 'axios'
const AdminLoginPage = () => {
    const { loginAdmin } = useAdminAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [Loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // ✅ Call server action that checks status BEFORE signIn
            const result = await loginUser('admin', formData.email, formData.password)

            if (!result.success) {
                // ✅ Display specific error message
                toast.error(result.error);
                setLoading(false);
                return;
            }
            // If the server action check passes, proceed to NextAuth signIn
            if (result.success) {
                toast.success(result.message);

                const response = await signIn('admin', {
                    email: formData.email,
                    password: formData.password,
                    redirect: false,
                });
                console.log(response);

                if (response?.status === 200) {
                    // ✅ Redirect only on success
                    router.push('/admin_dashboard');
                    router.refresh();
                    setLoading(false);

                } else {
                    // Handle sign-in failure (e.g., credentials mismatch though loginUser checked it)
                    toast.error("Login failed. Please try again.");
                    setLoading(false);
                }
            }
        } catch (err) {
            console.error("Login error:", err);
            toast.error("An unexpected error occurred. Please try again.");
            setLoading(false);
        }
    }

    return (
        <>
            <Toaster position="top-center" />
            <form onSubmit={handleSubmit} className="flex flex-1 flex-col justify-center items-center p-6 md:p-12">
                <div className="flex flex-col max-w-md w-full gap-8">
                    <div>
                        <div className="flex items-center gap-3 pb-3">
                            <span className="text-primary text-4xl">
                                <Shield />
                            </span>
                            <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Zenix</p>
                        </div>
                        <div className="flex min-w-72 flex-col gap-3">
                            <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Admin Portal Login</p>
                            <p className="text-slate-500 dark:text-[#9dabb9] text-base font-normal leading-normal">Welcome back! Please enter your credentials to continue.</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 w-full">
                        <label className="flex flex-col w-full">
                            <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">Email</p>
                            <div className="relative flex w-full flex-1 items-stretch">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#9dabb9]">
                                    <User />
                                </span>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#3b4754] bg-white dark:bg-[#1c2127] focus:border-primary dark:focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-[#9dabb9] pl-11 p-[15px] text-base font-normal leading-normal"
                                    placeholder="admin@zenix.com"
                                />
                            </div>
                        </label>
                        <label className="flex flex-col w-full">
                            <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">Password</p>
                            <div className="relative flex w-full flex-1 items-stretch">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#9dabb9]"><LockKeyhole /></span>
                                <input
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#3b4754] bg-white dark:bg-[#1c2127] focus:border-primary dark:focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-[#9dabb9] pl-11 pr-11 p-[15px] text-base font-normal leading-normal"
                                    placeholder="Enter your password"
                                    type="password"
                                />
                            </div>
                        </label>
                        <div className="flex flex-row justify-between">
                            <a className="text-primary-300 text-sm font-medium leading-normal self-start underline-offset-2 hover:underline" href="#">Forgot Password?</a>
                            <Link className="text-primary-300 text-sm font-medium leading-normal self-start underline-offset-2 hover:underline" href="/admin_dashboard/auth/register">Don't have an account?</Link>
                        </div>
                    </div>
                    <div className="w-full">
                        <button
                            type="submit"
                            disabled={Loading}
                            className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary-300 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="truncate">{Loading ? 'Logging in...' : 'Login'}</span>
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AdminLoginPage