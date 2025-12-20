'use client'
import { useEffect, useState, useMemo } from "react";
import { use } from "react";
import { useQuery } from "@tanstack/react-query";

import CourseSkeleton, { CourseGridSkeleton } from "./CourseSkeleton";
import DropdownMenu from "@/components/examples/dropdown-menu/standard/dropdown-menu-standard-5";
import CoursePlatformDropDownMenu from "@/components/examples/dropdown-menu/standard/coursePlatformDropDown";
import getCourses from "@/helpers/Courses/courseHelper";
import LevelDropDownMenu from "@/components/examples/dropdown-menu/standard/levelDropdown";
import Link from "next/link";
import { useAuth } from "@/utils/(user)/UserAuthContext";

export default function CoursesPage({ searchParams }) {
    const { user } = useAuth();

    // UI State
    const [coursePlatform, setCoursePlatform] = useState('Zenix');
    const [level, setLevel] = useState('Default');
    const [sorting, setSorting] = useState("Popularity");
    const [perPage, setPerPage] = useState(12);

    // 1. Resolve searchParams correctly for Next.js 15+
    const resolvedParams = use(searchParams);
    const pageNumberFromUrl = parseInt(resolvedParams.page, 10) || 1;

    // 2. Data Fetching
    // queryKey includes dependencies (page, perPage, level) to trigger refetching
    const { data, isLoading } = useQuery({
        queryKey: ['courses', pageNumberFromUrl, perPage, coursePlatform, level],
        queryFn: async () => {
            return await getCourses({
                page: pageNumberFromUrl,
                perPage: perPage,
                coursePlatform: coursePlatform,
                difficulty: level !== 'Default' ? level : undefined
            });
        },
    });

    // 3. Sorting Logic (Client Side)
    const processedCourses = useMemo(() => {
        if (!data?.courses) return [];

        const normalizeStudentCount = (val) => {
            if (typeof val !== 'string') return typeof val === 'number' ? val : 0;
            return parseInt(val.replace(/,/g, '').replace(/\s*students/i, '').trim(), 10) || 0;
        };

        let result = data.courses.map(c => ({
            ...c,
            studentsCount: normalizeStudentCount(c.students)
        }));

        if (sorting === 'Popularity') {
            result.sort((a, b) => (b.studentsCount || 0) - (a.studentsCount || 0));
        } else if (sorting === 'CourseName') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        }

        return result;
    }, [data?.courses, sorting]);

    // 4. Pagination Calculation
    // We use the total count returned from the server (data.courseCount)
    const totalCountInDb = data?.courseCount || 0;
    const totalPages = Math.ceil(totalCountInDb / perPage);
    const currentPage = Math.min(pageNumberFromUrl, totalPages > 0 ? totalPages : 1);

    // Generate page numbers for navigation
    const pageNumbers = [];
    const offsetNumber = 2;
    for (let i = currentPage - offsetNumber; i <= currentPage + offsetNumber; i++) {
        if (i >= 1 && i <= totalPages) pageNumbers.push(i);
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <main className="transition-all duration-300 ease-in-out flex w-full grow flex-col items-center">
                <div className="flex flex-col px-6 py-8 md:py-12 w-full max-w-7xl">

                    {/* Header Section */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-gray-100">
                            {user ? `Welcome back, ${user.name}!` : 'Are you ready to learn with Zenix?'}
                        </h1>
                        <p className="text-base font-normal text-gray-600 dark:text-gray-400">
                            Explore our range of courses across all difficulty levels.
                        </p>
                    </div>

                    {/* Filter Bar */}
                    <div className="mt-8 flex flex-wrap items-center gap-3 border-y border-gray-200 dark:border-gray-700 py-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-500">Filter:</span>
                            <LevelDropDownMenu level={level} setLevel={setLevel} />
                            <CoursePlatformDropDownMenu coursePlatform={coursePlatform} setCoursePlatform={setCoursePlatform} />
                        </div>
                        <div className="grow"></div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-500">Sort:</span>
                            <DropdownMenu sorting={sorting} setSorting={setSorting} />
                        </div>
                    </div>

                    {/* Grid Section */}
                    <div className="mt-8">
                        {isLoading ? (
                            <CourseGridSkeleton count={perPage} />
                        ) : processedCourses.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {processedCourses.map((course) => (
                                    <Link
                                        key={course._id}
                                        href={`/courses/${course._id}?coursePlatform=${coursePlatform}`}
                                        className="flex transform flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <div className="flex flex-col gap-4 p-4">
                                            <div className="flex flex-col gap-1">
                                                <p className="text-base font-bold leading-tight text-gray-800 dark:text-gray-300 truncate">{course.title}</p>
                                                <p className="text-sm font-normal text-gray-600 dark:text-gray-400">{course.instructor}</p>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="rounded-full bg-primary-300 dark:bg-primary-200 px-2 py-1 text-xs font-semibold text-gray-100 dark:text-gray-100">
                                                    {course.difficulty}
                                                </span>
                                                <span className="font-medium text-gray-500 dark:text-gray-400">{course.students}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center text-gray-500 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
                                No courses found matching your criteria.
                            </div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    <div className="mt-12 flex flex-col items-center gap-6">
                        {/* Per Page Selector */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Items per page:</span>
                            {[12, 24, 48].map((val) => (
                                <button
                                    key={val}
                                    onClick={() => setPerPage(val)}
                                    className={`px-3 py-1 rounded-md text-sm transition-colors font-medium ${perPage === val ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>

                        {/* Page Numbers */}
                        {totalPages > 1 && (
                            <div className="flex items-center gap-1">
                                <Link
                                    href={`?page=${Math.max(1, currentPage - 1)}`}
                                    className={`p-2 rounded-lg flex items-center transition-colors ${currentPage === 1 ? 'pointer-events-none opacity-20' : 'hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300'}`}
                                >
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </Link>

                                {pageNumbers.map((pageNum) => (
                                    <Link
                                        key={pageNum}
                                        href={`?page=${pageNum}`}
                                        className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all font-semibold ${pageNum === currentPage ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}
                                    >
                                        {pageNum}
                                    </Link>
                                ))}

                                <Link
                                    href={`?page=${Math.min(totalPages, currentPage + 1)}`}
                                    className={`p-2 rounded-lg flex items-center transition-colors ${currentPage === totalPages ? 'pointer-events-none opacity-20' : 'hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300'}`}
                                >
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </Link>
                            </div>
                        )}

                        <div className="text-xs text-gray-400">
                            Showing {processedCourses.length} of {totalCountInDb} results
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
