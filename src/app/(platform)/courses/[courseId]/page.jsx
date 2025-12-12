'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import DurationDisplay from '../../home/components/DurationDisplay'
import { use } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import LoginPromptModal from '../../home/components/LoginPromptModal'
import EnrollmentConfirmationModal from '../../home/components/EnrollmentConfirmationModal'
import checkUserEnrollments from "@/helpers/Users/userEnrollments"
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react'
import axios from 'axios'
const course = ({ searchParams }) => {
    const pathName = usePathname();
    const searhParams = useSearchParams();
    const router = useRouter();
    const { data: session, status } = useSession();
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEnrolling, setIsEnrolling] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [enrollmentCheckLoading, setEnrollmentCheckLoading] = useState(false);
    const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
    const [totalModules, setTotalModules] = useState(0)
    const [isLoginPromptModalOpen, setIsLoginPromptModalOpen] = useState(false);
    const { coursePlatform } = use(searchParams);
    const courseId = pathName.split('/').filter((item) => item !== '')[1];

    const getButtonClasses = () => {
        let baseClasses = "flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 text-base font-bold leading-normal transition-colors disabled:cursor-not-allowed ";

        if (enrollmentCheckLoading) {
            // Style for when checking enrollment status
            return `${baseClasses} bg-gray-300 text-gray-600 cursor-not-allowed`;
        } else if (isEnrolled) {
            // Style for when already enrolled
            return `${baseClasses} bg-green-500 text-white hover:bg-green-600 cursor-not-allowed`;
        } else if (status === 'authenticated') {
            // Logged in, and not enrolled
            if (isEnrolling) {
                // Style for when currently enrolling (loading state)
                return `${baseClasses} bg-blue-400 text-white cursor-wait`;
            } else {
                // Primary "Enroll Now" button style
                return `${baseClasses} bg-primary-300 text-white hover:bg-primary-400`;
            }
        } else {
            // Not logged in - prompt for login/signup
            return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`;
        }
    };
    const fetchCourse = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/courses/${courseId}?coursePlatform=${coursePlatform}`);
            setLoading(false);
            const data = await response.data
            setCourse(data)
            setTotalModules(data.modules.length)
        }
        catch (error) {
            console.log(error)
        }
    }
    const enrollStudent = async (studentId, courseId, totalModules) => {
        console.log(`Attempting enrollment: Student ${studentId}, Course ${courseId}, Modules ${totalModules}`);
        try {
            const response = await fetch(`/api/users/${studentId}/enroll`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ courseId, totalModules }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                toast.success(data.message || 'Enrollment successful!');
                return true; // Indicate success
            } else {
                const errorMessage = data.message || 'Failed to enroll student.';
                toast.error(errorMessage);
                return false; // Indicate failure
            }
        } catch (error) {
            console.error('Enrollment API call error:', error);
            toast.error('An unexpected error occurred during enrollment.');
            return false;
        }
    };
    const handleConfirmEnrollment = async () => {
        if (!course || !session?.user?.id) {
            toast.error("Missing course or user information.");
            return;
        }

        setIsEnrolling(true);
        const enrollmentSuccess = await enrollStudent(
            session.user.id,
            courseId,
            totalModules
        );
        setIsEnrollModalOpen(false);
        setIsEnrolling(false);

        if (enrollmentSuccess) {
            // Potentially update local state or re-fetch course data
            // setCourse(prev => ({ ...prev, isEnrolled: true }));
        }
    };


    const handleRedirectToLogin = () => {

        router.push('/auth/login');
        setIsLoginPromptModalOpen(false); // Close modal after initiating redirect
    };


    const handleEnrollClick = () => {

        if (session?.user) {
            setIsEnrollModalOpen(true);
        } else {
            setIsLoginPromptModalOpen(true);
        }
    };

    useEffect(() => {
        const loadCourseAndEnrollment = async () => {
            setLoading(true); // Loading for course details
            setEnrollmentCheckLoading(true); // Loading for enrollment status

            try {
                // Fetch enrollment status IF logged in
                if (session?.user?.id) {
                    const userEnrollments = await checkUserEnrollments(session?.user?.id);// Your API call here
                    console.log(userEnrollments.enrolledCourses[1].courseId)
                    const enrolled = userEnrollments?.enrolledCourses.some(enrollment => {
                        return enrollment.courseId && enrollment.courseId._id && enrollment.courseId._id.toString() === courseId;
                    });
                    
                    setIsEnrolled(enrolled);
                } else {
                    setIsEnrolled(false); // Not logged in, not enrolled
                }
            } catch (error) {
                console.error("Failed to load course or enrollment status:", error);
                toast.error("Could not load course details or enrollment status.");
            } finally {
                setLoading(false);
                setEnrollmentCheckLoading(false);
            }
        };
        loadCourseAndEnrollment();
        fetchCourse()
    }, [courseId, session?.user?.id, session?.user?.role, isEnrolling, isEnrolled]);
    
    return (

        <main class="flex w-full flex-col items-center py-8 sm:py-12 lg:py-16">
            {

                !loading && (
                    <div class="flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
                        <div class="flex flex-col gap-4">
                            <h1 class="text-primary-300 text-2xl md:text-2xl font-sans lg:text-4xl font-black leading-normal tracking-tight max-w-4xl">{course.title}</h1>
                            <p class="text-slate-600 dark:text-slate-400 text-base md:text-lg font-normal leading-normal">{course.instructor}</p>
                            <div class="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                <span class="font-nunito">Duration</span>
                                <DurationDisplay minutes={course.totalDurationMinutes} format="detailed" />

                            </div>
                            <div class="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                {course.tags && course.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                        </div>
                        {/* Enrollment Confirmation Modal */}
                        {session?.user && session?.user.role !== 'admin' && (
                            <EnrollmentConfirmationModal
                                isOpen={isEnrollModalOpen}
                                onClose={() => setIsEnrollModalOpen(false)}
                                onConfirm={handleConfirmEnrollment}
                                courseTitle={course.title}
                            />
                        )}

                        {/* Login Prompt Modal */}
                        {!session && (
                            <LoginPromptModal
                                isOpen={isLoginPromptModalOpen}
                                onClose={() => setIsLoginPromptModalOpen(false)}
                                onLogin={handleRedirectToLogin}
                                courseTitle={course.title}
                            />
                        )}
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 xl:gap-12">

                            <div class="lg:col-span-2 flex flex-col gap-8">

                                <div class="border-b border-border-light dark:border-border-dark">
                                    <div class="flex gap-6 sm:gap-8">
                                        <a class="flex flex-col items-center justify-center border-b-[3px] border-primary-300 text-primary-300 pb-3 pt-1" href="#">
                                            <p class="text-sm sm:text-base font-bold">About</p>
                                        </a>
                                        <a class="flex flex-col items-center justify-center border-b-[3px] border-transparent text-slate-500 dark:text-slate-400 hover:text-primary-300 pb-3 pt-1" href="#">
                                            <p class="text-sm sm:text-base font-bold">Curriculum</p>
                                        </a>
                                        <a class="flex flex-col items-center justify-center border-b-[3px] border-transparent text-slate-500 dark:text-slate-400 hover:text-primary-300 pb-3 pt-1" href="#">
                                            <p class="text-sm sm:text-base font-bold">Instructors</p>
                                        </a>
                                        <a class="flex flex-col items-center justify-center border-b-[3px] border-transparent text-slate-500 dark:text-slate-400 hover:text-primary-300 pb-3 pt-1" href="#">
                                            <p class="text-sm sm:text-base font-bold">FAQs</p>
                                        </a>
                                    </div>
                                </div>

                                <div class="flex flex-col gap-6">
                                    <h2 class="text-2xl font-bold text-text-light dark:text-text-dark">About this Course</h2>
                                    <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {course.description}
                                    </p>
                                </div>

                                <div class="flex flex-col gap-4">
                                    <h3 class="text-2xl font-bold text-text-light dark:text-text-dark">Curriculum</h3>
                                    <div class="flex flex-col gap-3">
                                        {course.modules && course.modules.map((module, index) => (
                                            <details key={index} class="group rounded-lg bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark p-4">
                                                <summary class="flex cursor-pointer items-center justify-between font-semibold text-text-light dark:text-text-dark">
                                                    {module.title}
                                                    <span class="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                                </summary>
                                                <p class="mt-3 text-slate-600 dark:text-slate-400">
                                                    Total Lessons: {module.lessonCount}
                                                </p>
                                                <div class="flex items-center gap-2">
                                                    <p class="text-slate-600 dark:text-slate-400">
                                                        Total Duration:
                                                    </p>
                                                    <DurationDisplay minutes={module.moduleDurationMinutes} />
                                                </div>
                                            </details>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div class="lg:sticky top-28 h-fit flex flex-col gap-6">
                                <div class="rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 p-6 flex flex-col gap-5 shadow-sm">
                                    <button
                                        onClick={handleEnrollClick}
                                        disabled={loading || enrollmentCheckLoading || isEnrolled || isEnrolling}
                                        className={getButtonClasses()} // Apply the dynamic classes
                                    >
                                        {enrollmentCheckLoading ? 'Checking enrollment...' :
                                            isEnrolled ? 'Enrolled' :
                                                status === 'authenticated' ? (isEnrolling ? 'Enrolling...' : 'Enroll Now') :
                                                    'Sign Up/Login to Enroll'}
                                    </button>
                                    <button class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-accent text-primary-300 hover:underline text-base font-bold leading-normal transition-colors hover:bg-accent/90">
                                        <span>Download Program Brochure</span>
                                    </button>
                                    <div class="border-t border-border-light dark:border-border-dark pt-5 flex flex-col gap-4">
                                        <h4 class="font-bold text-lg text-text-light dark:text-text-dark">Course Highlights</h4>
                                        <ul class="flex flex-col gap-3">
                                            <li class="flex items-start gap-3">
                                                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                                                <span class="text-slate-600 dark:text-slate-400">Live interactive sessions with IIT Guwahati faculty</span>
                                            </li>
                                            <li class="flex items-start gap-3">
                                                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                                                <span class="text-slate-600 dark:text-slate-400">Hands-on projects with industry-relevant datasets</span>
                                            </li>
                                            <li class="flex items-start gap-3">
                                                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                                                <span class="text-slate-600 dark:text-slate-400">Dedicated career support and placement assistance</span>
                                            </li>
                                            <li class="flex items-start gap-3">
                                                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                                                <span class="text-slate-600 dark:text-slate-400">Earn a prestigious certificate from a top-tier university</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="border-t border-border-light dark:border-border-dark pt-5 flex flex-col gap-3">
                                        <h4 class="font-bold text-lg text-text-light dark:text-text-dark">Next Cohort Starts</h4>
                                        <p class="text-slate-600 dark:text-slate-400">August 25, 2024</p>
                                        <a class="text-sm font-semibold text-primary-300 hover:underline" href="#">Contact Advisor</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            }
        </main >
    )
}
export default course