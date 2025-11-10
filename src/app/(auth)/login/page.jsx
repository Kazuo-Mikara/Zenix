'use client'
import React, { useState, useRef } from 'react';
import student_img from "../../../../public/assets/anime_student.png"
import MailIcon from '@mui/icons-material/Mail';
import KeyIcon from '@mui/icons-material/Key';
import Image from 'next/image';
// import { NavLink, useNavigate } from 'react-router';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../utils/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
const login = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const loginForm = useRef();
    const router = useRouter();
    // Simple function to handle form submission


    const { loginUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = loginForm.current.email.value;
        const password = loginForm.current.password.value;
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const result = await loginUser({ email, password });
            setSuccess(true);
            // Important: The JWT is now in an HTTP-only cookie on the client's browser,
            // so we don't need to manually save anything to localStorage here.
            // Instead, we can redirect the user to a protected route.
            router.push('/home');
            toast.success('Login successful!');
            console.log('Login Successful:', result.data);
            console.log('User ID:', result.data.userId);

            // --- NEXT STEP IN A REAL APP ---
            // router.push('/dashboard'); // Redirect user to a protected route


        } catch (err) {
            console.error('Network Error:', err);
            // const networkError = 'A network error occurred. Please check your connection.';
            setError(networkError);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>

            <div className="p-10  bg-gradient-to-br w-full h-screen  flex items-center justify-center">
                {/* White card container */}
                <div className="bg-gray-200 rounded-lg shadow-xl flex flex-col md:flex-row w-full max-w-4xl items-center justify-center overflow-hidden">

                    {/* Left Side: Form */}
                    <div className="w-full md:w-1/2 p-2 md:p-12 flex flex-col justify-center">
                        <h2 className="text-xl  text-gray-800 mb-6 text-center font-nunito">Empower your learning with EduPath</h2>
                        <h2 className="text-xl  text-gray-800 mb-6 text-center font-nunito">Log In</h2>

                        <form className="space-y-4" ref={loginForm} onSubmit={handleSubmit}>


                            {/* Email Input */}
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-800">
                                    {/* Email Icon */}
                                    <MailIcon strokeWidth={3} fontSize='medium' />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full py-3 pl-10  outline-none pr-3 border-b-1 border-b-gray-800 placeholder-gray-400"
                                    placeholder="Your Email"


                                />
                            </div>

                            {/* Password Input */}
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-800">
                                    {/* Lock Icon */}
                                    <KeyIcon size={15} fontSize='medium' />
                                </span>
                                <input
                                    type="password"
                                    name="password"
                                    className="w-full py-3 pl-10 pr-3 outline-none placeholder-gray-400 border-b-1 border-b-gray-800 "
                                    placeholder="Password"
                                />
                            </div>



                            {/* Terms and Conditions Checkbox */}
                            <div className="flex items-center">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    required
                                    className="h-4 w-4  border-gray-800 rounded  mr-2"
                                />
                                <label className="text-sm text-gray-800">
                                    I agree all statements in <a href="#" className="text-[#8D6E42] hover:underline">Terms of service</a>
                                </label>
                            </div>

                            {/* Register Button */}
                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-[#8D6E42] text-white font-semibold rounded-md hover:opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-20 shadow-md"
                            >
                                Sign In
                            </button>
                        </form>

                        {/* "Already member" link */}
                        <p className="text-sm text-gray-800 mt-6 text-center">
                            New User? {' '}
                            <Link href="/signup" className="text-[#8D6E42] hover:underline font-medium">
                                Sign Up
                            </Link>
                        </p>
                    </div>

                    {/* Right Side: Image */}
                    <div>
                        <Image src={student_img} alt="Sign In" className="w-[500px] h-[400px] object-cover p-12" />
                    </div>

                </div>

            </div>
            <Toaster />
        </>
    )
}

export default login