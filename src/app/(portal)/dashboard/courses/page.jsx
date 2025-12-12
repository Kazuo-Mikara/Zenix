'use client'
import { useEffect, useState, Suspense } from "react";
import { useSession } from "next-auth/react"
import userEnrollment from "@/helpers/Users/userEnrollments"
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

// import CourseImage from "@assets/Course_img.png"
export default function DashboardCourses() {
    return (
        <Suspense fallback={<div className="mt-4 flex w-full justify-center items-center"><p>Loading...</p></div>}>
            <DashboardCoursesContent />
        </Suspense>
    );
}

function DashboardCoursesContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialFilter = searchParams.get('filter') || 'all';
    const [activeFilter, setActiveFilter] = useState('all');
    const { data: session } = useSession();
    // const [loading, setLoading] = useState(false); // Unused
    const { data: userEnrollments, isLoading } = useQuery({
        queryKey: ["userEnrollments", session?.user?.id],
        queryFn: () => userEnrollment(session?.user?.id),
    });
    useEffect(() => {
        setActiveFilter(initialFilter);
    }, [initialFilter])
    const handleFilterClick = (filterValue) => {
        setActiveFilter(filterValue);
        router.push(`?filter=${filterValue}`);
    };
    // console.log(userEnrollments)
    const filterOptions = [
        { label: 'All', value: 'all' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Completed', value: 'finished' },
    ];
    return (
        <main class="flex w-full justify-center">
            <div class="flex w-full flex-col px-2 sm:px-6 lg:px-8">
                <div class="flex flex-wrap items-end justify-between gap-2 py-2">
                    <div class="flex min-w-72 flex-col gap-2">
                        <h1 className="text-2xl font-bold">Dashboard Courses</h1>
                        <h2 className="mt-4 text-xl font-semibold">Your Enrolled Courses</h2>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row items-center gap-4 py-4 border-y border-white/10">

                    <div class="grow w-full md:w-auto">
                        <label class="flex flex-col h-12 w-full">
                            <div class="flex w-full flex-1 items-stretch rounded-lg h-full bg-gray-200">
                                <div class="text-primary flex items-center justify-center pl-4">
                                    <span class="material-symbols-outlined">search</span>
                                </div>
                                <input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-primary focus:outline-0 focus:ring-0 border-none bg-transparent focus:border-none h-full placeholder:text-primary/60 px-2 text-base font-normal leading-normal" placeholder="Search my courses..." />
                            </div>
                        </label>
                    </div>

                    <div class="flex items-center gap-3 self-start md:self-center">
                        {filterOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleFilterClick(option.value)}
                                className={`
                px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                ${activeFilter === option.value
                                        ? 'bg-primary-500 text-white shadow-md' // Active state styles
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600' // Inactive state styles
                                    }
            `}
                            >
                                {option.label}
                            </button>
                        ))}

                    </div>
                </div>

                <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 py-8">
                    {
                        isLoading ? (
                            <div className="mt-4 flex w-full justify-center items-center">
                                <p>Loading...</p>
                            </div>
                        ) : (
                            userEnrollments?.enrolledCourses?.length > 0 ? (
                                userEnrollments?.enrolledCourses?.map((course) => (
                                    <div class="flex flex-col gap-4 rounded-xl bg-white/5 p-4 transition-all hover:bg-white/10 hover:shadow-2xl hover:shadow-black/20" key={course.courseId._id}>
                                        <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" data-alt="Digital art of neural networks for a machine learning course" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCDWoE-G7SQRb_n2bLTOcvkFp7TqYBTI8rV93TieioTb0BKrwXhLdqpHH_T4JPSxUILP8Vgdd_Gt92Mhx7im7KHErycmmMMz6dAi157Ab36WJPklb303NtaD2AT3v3DSa5B92XuUuhf4z7CLs5Lrb0PocP9GH3Q-Xc7ha7OZTfoK7lyN28enQ5rAA3DRuXwi5RDwPdmU4JovMbXl5z6Ol2x0vaDzN7iPK4la6vjl9qUhvig0QhqrhaieM5jRCBLHT43kyiyFlu3RxsD")` }}></div>
                                        <div class="flex flex-col gap-3">
                                            <p class="text-gray-600 text-lg font-bold leading-normal">{course.courseId.title}</p>
                                            <p class="text-gray-400 text-sm font-normal leading-normal">{course.courseId.instructor}</p>
                                            <div class="w-full bg-black/20 rounded-full h-2.5">
                                                <div class="bg-primary-500 h-2.5 rounded-full" style={{ width: `${(course.progress.completedModules / course.progress.totalModules) * 100}%` }}></div>
                                            </div>
                                            <p class="text-gray-400 text-sm font-medium leading-normal">{new Date(course.enrollmentDate).toLocaleTimeString("en-US", {
                                                day: "numeric",
                                                hour: "numeric",
                                                year: "numeric",
                                                month: "short",
                                            })}</p>
                                        </div>
                                        <button class="mt-2 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 bg-primary-500 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary-300/90 transition-colors">
                                            Continue
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div class="col-span-full flex flex-col items-center justify-center gap-6 rounded-xl bg-white/5 p-12 text-center min-h-[400px]">
                                    <span class="material-symbols-outlined text-7xl text-primary">school</span>
                                    <div class="flex flex-col gap-2">
                                        <p class="text-2xl font-bold text-primary-300">No Courses Yet?</p>
                                        <p class="text-primary-300 max-w-sm">Start your learning journey by exploring our course catalog. Your next skill is just a click away.</p>
                                    </div>
                                    <button class="mt-4 flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-primary px-8 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                                        Browse Courses
                                    </button>
                                </div>

                            )
                        )
                    }
                </div>
            </div>
        </main>
    )
}

{/* <div>
    <h1 className="text-2xl font-bold">Dashboard Courses</h1>
    <h2 className="mt-4 text-xl font-semibold">Your Enrolled Courses</h2>
    {
        isLoading ? (
            <div className="mt-4 flex w-full justify-center items-center">
                <p>Loading...</p>
            </div>
        ) : (
            <div className="mt-4">
                {
                    userEnrollments?.enrolledCourses?.length > 0 ? (
                        userEnrollments?.enrolledCourses?.map((course) => (
                            <div key={course.courseId._id} className="bg-white p-4 rounded shadow mb-4">
                                <h3 className="text-lg font-semibold">{course.courseId.title}</h3>
                                <p className="text-gray-600">{course.courseId.description}</p>

                                <p>Enrollment Date: {course.enrollmentDate}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">You have not enrolled in any courses yet.</p>
                    )
                }
            </div>
        )
    }
</div> */}