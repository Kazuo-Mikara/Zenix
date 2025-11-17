'use client'
import axios from 'axios';
import { use } from "react"
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import React, { useEffect, useState } from 'react'
import Loading from '@/app/(admin)/components/loading';
import getCourses from '@/helpers/Courses/courseHelper';
import { Trash2, Pencil, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import courseTitleSortClick from '@/helpers/sortingHelpers/courseTitleSortClick';
import Link from 'next/link';
const page = () => {
    const [coursePlatform, setCoursePlatform] = useState('Skillshare');
    const [courseCount, setCourseCount] = useState();

    const searchParams = useSearchParams();
    let pageNumber = parseInt(searchParams.get('page')) || 1;
    const sortField = searchParams.get('sortField') || 'instructor';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    //Pagination
    // const { page, sortField, sortOrder } = use(searchParams);
    const [perPage, setPerPage] = useState(25);
    // let pageNumber = parseInt(page, 10);
    console.log('SortField is ', typeof (sortField), 'SortOrder is ', typeof (sortOrder))
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
    const { data: data = [], isLoading, isError } = useQuery({
        queryKey: ['courses', coursePlatform, perPage, sortField, sortOrder, refetch],
        queryFn: () => getCourses({
            page: pageNumber, perPage: perPage, coursePlatform: coursePlatform, sortField: sortField, sortOrder: sortOrder === 'default' ? null : sortOrder,
        }),
    });
    // const handleTitleSortClick = () => {
    //     setSortField('title');
    //     setSortOrder(prev =>
    //         prev === 'default' ? 'asc' : prev === 'asc' ? 'desc' : 'default'
    //     );
    // };

    useEffect(() => {
        if (data) {
            setCourseCount(data.courseCount);
        }
    },);
    if (isLoading) return <Loading />;

    if (isError) return <p>Failed to load courses.</p>;





    return (
        <div className='w-full'>
            <div className="m-10">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                            <Link href="/admin_dashboard" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary">
                                <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" /></svg>
                                Home
                            </Link>
                        </li>
                        <li aria-current='page'>
                            <div className="flex items-center space-x-1.5">
                                <svg className="w-3.5 h-3.5 rtl:rotate-180 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" /></svg>
                                <Link href="/admin_dashboard/courses" className="inline-flex items-center text-sm font-medium text-primary ">Courses</Link>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <h1 className="text-3xl font-bold text-center text-gray-800">
                {coursePlatform} Courses ({data.courseCount})
            </h1>
            <div className=" overflow-x-auto mx-10 gap-6">
                <div className='flex justify-between my-2'>
                    <Link href={`/admin_dashboard/courses/add_course?coursePlatform=${coursePlatform}`} className='bg-primary text-white px-4 py-2 rounded-md'>Add Courses</Link>
                    <div className="flex justify-end items-center gap-2">
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
                <table className="w-full text-sm text-left rtl:text-right text-body">
                    <thead className="bg-neutral-secondary-soft border-b border-default">
                        <tr className=''>
                            <th scope="col" className="px-6 py-3 font-medium text-left text-gray-700">
                                No
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium text-left text-gray-700">
                                <Link href={`/admin_dashboard/courses?page=${pageNumber}&sortField=title&sortOrder=asc`} className="flex items-center gap-2">
                                    Course Title
                                    {sortOrder === 'default' && <ArrowUpDown size={20} className="inline-block w-5 h-5" />}
                                    {sortOrder === 'asc' && <ArrowUp size={20} className="inline-block w-5 h-5" />}
                                    {sortOrder === 'desc' && <ArrowDown size={20} className="inline-block w-5 h-5" />}
                                </Link>
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium text-left text-gray-700">
                                Instructor
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium text-left text-gray-700">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium text-left text-gray-700">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.courses.map((course, index) => (
                            <tr key={course._id} className='odd:bg-gray-200  border-b border-default'>
                                <td className="px-4 py-4 ">{index + 1}</td>
                                <th scope="row" className=" py-4 font-medium text-heading whitespace-nowrap">{course.title}</th>
                                <td className="px-4 py-4 ">{course.instructor}</td>
                                <td className="px-6 py-4 ">12 May 2024</td>
                                <td className=''>
                                    <Link href={`/admin_dashboard/courses/edit?${course._id}`} className="px-2 py-3 text-primary  hover:bg-primary hover:text-white rounded-md">
                                        <Pencil size={22} className="inline-block w-5 h-5 mr-1" />
                                    </Link>
                                    <Link href={`/admin_dashboard/courses/delete?${course._id}`} className=" px-2 py-3  rounded-md text-red-600 hover:bg-red-600 hover:text-white">
                                        <Trash2 size={22} className="inline-block w-5 h-5 " />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col justify-end mr-2 mt-2 items-center gap-2">

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
        </div >
    )
}

export default page