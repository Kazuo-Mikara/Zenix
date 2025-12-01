'use client'
import { useEffect, useState, useMemo } from "react";
import axios from "axios"
import { use } from "react"
import Image from "next/image";
import img from '../../../../public/assets/Course_img.png'
import SortByDropDownMenu from "@/components/examples/dropdown-menu/standard/dropdown-menu-standard-5";
import CoursePlatformDropDownMenu from "@/components/examples/dropdown-menu/standard/coursePlatformDropDown"
import Link from "next/link";
import { useAuth } from "@/utils/(user)/UserAuthContext";
import { Parisienne } from "next/font/google";
export default function CoursesPage({ searchParams }) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [courseCount, setCourseCount] = useState();
    const [coursePlatform, setCoursePlatform] = useState('Udemy');
    const [students, setStudents] = useState();
    const [sorting, setSorting] = useState("Popularity");
    const [courses, setCourses] = useState([]);
    //Pagination
    const { page } = use(searchParams);
    const [perPage, setPerPage] = useState(20);
    let pageNumber = parseInt(page, 10);
    pageNumber = !pageNumber || pageNumber < 1 ? 1 : pageNumber;
    const totalPages = Math.ceil(courseCount / perPage);
    const prevPage = pageNumber - 1 > 0 ? pageNumber - 1 : 1;
    const nextPage = pageNumber + 1;

    const pageNumbers = [];
    const offsetNumber = 3;
    for (let i = pageNumber - offsetNumber; i <= pageNumber + offsetNumber; i++) {
        if (i >= 1 && i <= totalPages) {
            pageNumbers.push(i);
        }
    }
    // Pagination 

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.post('/api/getCourses', { page: pageNumber, perPage: perPage, coursePlatform: coursePlatform });
                setCourseCount(response.data.courseCount);
                setCourses(response.data.courses);
                setStudents(response.data.students);
                // console.log(courses);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
        sortedCourses;
    }, [pageNumber, perPage, totalPages,]);


    // Function to safely convert the formatted string to a number
    // This function guards against non-string inputs
    const normalizeStudentCount = (studentsValue) => {
        // 1. Defensive Check: If it's not a string, return 0 (or the value itself if it's already a number)
        if (typeof studentsValue !== 'string') {
            // If it's already a number, just return it. Otherwise, default to 0.
            return typeof studentsValue === 'number' ? studentsValue : 0;
        }

        // 2. Cleaning logic (only runs if the input is a string)
        const cleanedString = studentsValue
            .replace(/,/g, '')        // Remove commas
            .replace(/\s*students/i, '') // Remove ' students' (case-insensitive)
            .trim();

        const number = parseInt(cleanedString, 10);
        return isNaN(number) ? 0 : number;
    };


    // Inside your CoursesPage component:

    const sortedCourses = useMemo(() => {
        // 1. Normalize the raw courses received from the API
        const cleaned = courses.map(course => ({
            ...course,
            // Use the safe normalization function
            studentsCount: normalizeStudentCount(course.students),
        }));

        // 2. Sort the cleaned array (only need to sort if required)
        if (sorting === 'Popularity') {
            // Ensure both properties exist before subtracting, though normalizeStudentCount handles defaults
            return cleaned.sort((a, b) => b.studentsCount - a.studentsCount);
        }
        else if (sorting == 'CourseName') {
            return cleaned.sort((a, b) => a.title.localeCompare(b.title));
        }
        return cleaned;

    }, [courses, sorting]);
    // console.log(sortedCourses);



    const getAllInstructor = () => {
        const instructors = courses.flatMap(course => course.instructor);
        return instructors;
    }
    const instructors = getAllInstructor();

    return (
        < div >
            <main class="transition-all duration-300 ease-in-out flex w-full grow flex-col items-center">
                <div class="flex  flex-col px-6 py-8 md:py-12">
                    {
                        user ? (
                            <div class="flex flex-col gap-2">

                                <h1 class="text-4xl font-black tracking-tighter text-gray-900 dark:text-gray-100 capitalize">Welcome back, {user.name}!</h1>
                                <p class="text-base font-normal text-gray-600 dark:text-gray-400">You have 3 courses in progress. Keep up the great work!</p>
                            </div>
                        ) : (
                            <div class="flex flex-col gap-2">

                                <h1 class="text-4xl font-black tracking-tighter text-gray-900 dark:text-gray-100">Are you ready to learn with Zenix?</h1>
                                <p class="text-base font-normal text-gray-600 dark:text-gray-400">You can choose from a variety of courses, including beginner, intermediate, and advanced levels.</p>
                            </div>
                        )
                    }

                    <div class="mt-8 flex flex-wrap items-center gap-3 border-y border-gray-200 dark:border-gray-700 py-4">
                        <button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 px-3 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <span class="material-symbols-outlined text-base">category</span>
                            <p class="text-sm font-medium text-gray-800 dark:text-gray-200">Category</p>
                            <span class="material-symbols-outlined text-base">expand_more</span>
                        </button>
                        <button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 px-3 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <span class="material-symbols-outlined text-base">school</span>
                            <p class="text-sm font-medium text-gray-800 dark:text-gray-200">Instructor</p>
                            <span class="material-symbols-outlined text-base">expand_more</span>
                        </button>
                        <button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 px-3 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <span class="material-symbols-outlined text-base">signal_cellular_alt</span>
                            <p class="text-sm font-medium text-gray-800 dark:text-gray-200">Level</p>
                            <span class="material-symbols-outlined text-base">expand_more</span>
                        </button>
                        <CoursePlatformDropDownMenu coursePlatform={coursePlatform} setCoursePlatform={setCoursePlatform} />
                        <div class="grow"></div>



                        <SortByDropDownMenu sorting={sorting} setSorting={setSorting} />

                    </div>
                    {
                        !loading && (
                            <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                                {sortedCourses.map((course) => {
                                    return (
                                        <Link key={course._id} href={`/courses/course?courseId=${course._id}`} class="flex transform flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-primary/10">
                                            <div class="flex flex-col gap-4 p-4">
                                                <div class="flex flex-col gap-1">
                                                    <p class="text-base font-bold leading-tight text-gray-800 dark:text-gray-300 truncate">{course.title}</p>
                                                    <span title={course.title} class="opacity-0 on-hover:opacity-100 block" >
                                                    </span>
                                                    <p class="text-sm font-normal text-gray-600 dark:text-gray-400">{course.instructor}</p>
                                                </div>
                                                <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                                    <span class="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{course.duration}</span>
                                                    <div class="flex items-center gap-1">
                                                        {/* <span class="material-symbols-outlined !text-base text-amber-500">star</span> */}
                                                        <span class="font-medium text-text dark:text-gray-300">{course.students}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                }
                                )
                                }


                            </div>
                        )
                    }
                    {/* Pagination */}
                    <div className="flex justify-end mr-2 mt-2 items-center gap-2">
                        <div className="flex items-center gap-2">

                            <button
                                className={`p-2 rounded-md ${perPage === 10 ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'}`}
                                onClick={() => setPerPage(10)}>
                                10
                            </button>

                            <button
                                className={`p-2 rounded-md ${perPage === 25 ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'}`}
                                onClick={() => setPerPage(25)}>
                                25
                            </button>

                            <button
                                className={`p-2 rounded-md ${perPage === 50 ? 'bg-gray-300 ' : 'bg-gray-100 hover:bg-gray-200'}`}
                                onClick={() => setPerPage(50)}>50
                            </button>
                            <button
                                className={`p-2 rounded-md ${perPage === 100 ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'}`}
                                onClick={() => setPerPage(100)} >
                                100
                            </button>

                        </div>
                    </div>
                    <div class="mt-12 flex items-center justify-center p-4">
                        {pageNumber === 1 ? (
                            <div className="opacity-60 material-symbols-outlined" aria-disabled="true">chevron_left</div>
                        ) :
                            (
                                <Link href={`?page=${prevPage}`} class="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                                    <span class="material-symbols-outlined text-gray-700 dark:text-gray-300">chevron_left</span>
                                </Link>)}
                        {pageNumbers.map((pageNum, index) =>
                        (
                            <Link key={index} href={`?page=${pageNum}`} class={`flex h-10 w-10 items-center justify-center rounded-lg ${pageNum === pageNumber ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}>
                                {pageNum}
                            </Link>
                        )
                        )}

                        {pageNumber === totalPages ? (
                            <div className="opacity-60 material-symbols-outlined" aria-disabled="true">chevron_right</div>
                        ) :
                            (<Link href={`?page=${nextPage}`} class="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" >
                                <span class="material-symbols-outlined text-gray-700 dark:text-gray-300">chevron_right</span>
                            </Link>)}
                    </div>
                </div>
            </main>

        </ div >

    )
}
