'use client'
import React, { useEffect, useRef, useState } from 'react';
import student_img from "../../../../../public/assets/anime_student.png"
import MailIcon from '@mui/icons-material/Mail';
import KeyIcon from '@mui/icons-material/Key';
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const signup = () => {

    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    useEffect(() => {

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await axios.post('/api/register', formData);
            if (result.data.success) {
                toast.success('Registration successful!');
                setTimeout(() => {
                    router.push('/auth/login');
                }, 1000);
            } else {
                toast.error(result.data.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error.response?.data?.error || 'An error occurred during registration';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10  bg-linear-to-br w-full h-screen  flex items-center justify-center">
            {/* White card container */}
            <div className="bg-gray-200 rounded-lg shadow-xl flex flex-col md:flex-row w-full max-w-4xl items-center justify-center overflow-hidden">

                {/* Left Side: Form */}
                <div className="w-full md:w-1/2 p-2 md:p-12 flex flex-col justify-center">
                    <h2 className="text-xl  text-gray-800 mb-6 text-center font-nunito">Empower your learning with EduPath</h2>
                    <h2 className="text-xl  text-gray-800 mb-6 text-center font-nunito">Sign Up</h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>


                        {/* FirstName Input */}
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-800">
                                {/* User Icon */}
                                <User strokeWidth={3} fontSize='medium' />
                            </span>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full py-3 pl-10  outline-none pr-3 border-b border-b-gray-800 placeholder-gray-400"
                                placeholder="Your First Name"


                            />
                        </div>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-800">
                                {/* User Icon */}
                                <User strokeWidth={3} fontSize='medium' />
                            </span>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full py-3 pl-10  outline-none pr-3 border-b border-b-gray-800 placeholder-gray-400"
                                placeholder="Your Last Name"


                            />
                        </div>

                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-800">
                                {/* Email Icon */}
                                <MailIcon strokeWidth={3} fontSize='medium' />
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full py-3 pl-10  outline-none pr-3 border-b border-b-gray-800 placeholder-gray-400"
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
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full py-3 pl-10 pr-3 outline-none placeholder-gray-400 border-b border-b-gray-800 "
                                placeholder="Password"
                            />
                        </div>



                        {/* Terms and Conditions Checkbox */}
                        <div className="flex items-center">
                            <input
                                id="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4  border-gray-100 rounded  mr-2"
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
                            Sign Up
                        </button>
                    </form>

                    {/* "Already member" link */}
                    <p className="text-sm text-gray-800 mt-6 text-center">
                        Already a user? {' '}
                        <Link href="/auth/login" className="text-[#8D6E42] hover:underline font-medium">
                            Log In
                        </Link>
                    </p>
                </div>

                {/* Right Side: Image */}
                <div>
                    <Image src={student_img} alt="Sign In" className="w-[500px] h-[400px] object-cover p-12" />
                </div>

            </div>
            <Toaster />
        </div>
    )
}

export default signup