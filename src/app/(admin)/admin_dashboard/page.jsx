'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import getDashboardInfo from '@/helpers/(admin)/dashboard/getDashboardInfo';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import UserTimeline from '../admin_dashboard/@userTimeline/page';
import UserTimelineComponent from '../admin_dashboard/@userTimeline/page';
const page = () => {
    const { data: session } = useSession();
    const userName = session?.user?.userName;
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
        isFetching } = useQuery({
            queryKey: ['dashboardInfo'],
            queryFn: async () => {
                try {
                    const result = await getDashboardInfo();
                    // const endTime = Date.now();
                    // console.log(`✅ Dashboard info loaded in ${endTime - startTime}ms`, result);
                    return result;
                } catch (err) {
                    console.error('❌ Dashboard info error:', err);
                    throw err;
                }
            },
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 10,   // 10 minutes 
            retry: 3,
            retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
            meta: {
                timeout: 30000 // 30 seconds timeout
            }
        });

    return (
        <div className="p-6 md:p-10 space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-3">
                <div className="flex flex-col gap-1">
                    <p className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Zenix Dashboard</p>
                    <p className="text-gray-500 dark:text-[#9dabb9] text-base font-normal leading-normal">Welcome back, <span className='font-extrabold text-xl'>{userName}!</span> Here's what's happening on your platform today.</p>
                </div>
                <Link href="/admin_dashboard/users/add" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary-300 text-white text-sm font-bold leading-normal tracking-[0.015em] gap-2 hover:bg-primary-300/90">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
                    <span className="truncate">Add New User</span>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#111418] border border-gray-200 dark:border-[#3b4754]">
                    <p className="text-gray-600 dark:text-white text-base font-medium leading-normal">Total Users</p>
                    <p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">{data?.users}</p>
                    <p className="text-green-500 text-sm font-medium leading-normal">+5.2%</p>
                </div>
                <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#111418] border border-gray-200 dark:border-[#3b4754]">
                    <p className="text-gray-600 dark:text-white text-base font-medium leading-normal">Active Courses</p>
                    <p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">{data?.courses}</p>
                    <p className="text-green-500 text-sm font-medium leading-normal">+2.1%</p>
                </div>
                <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#111418] border border-gray-200 dark:border-[#3b4754]">
                    <p className="text-gray-600 dark:text-white text-base font-medium leading-normal">Total Enrollments</p>
                    <p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">{data?.enrollments}</p>
                    <p className="text-green-500 text-sm font-medium leading-normal">+12.5%</p>
                </div>
                <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#111418] border border-gray-200 dark:border-[#3b4754]">
                    <p className="text-gray-600 dark:text-white text-base font-medium leading-normal">Payments in Progress</p>
                    <p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">{data?.invoices}</p>
                    <p className="text-red-500 text-sm font-medium leading-normal">-1.8%</p>
                </div>
            </div>
            <div className="bg-white dark:bg-[#111418] rounded-xl border border-gray-200 dark:border-[#3b4754] p-6 space-y-4">
                <UserTimelineComponent />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-gray-200 dark:border-[#3b4754] p-6 bg-white dark:bg-[#111418]">
                    <p className="text-gray-800 dark:text-white text-lg font-medium leading-normal">Enrollment Trends</p>
                    <div className="flex items-baseline gap-2">
                        <p className="text-gray-900 dark:text-white tracking-light text-4xl font-bold leading-tight truncate">1,230</p>
                        <p className="text-green-500 text-base font-medium leading-normal">+15.3%</p>
                    </div>
                    <p className="text-gray-500 dark:text-[#9dabb9] text-sm font-normal leading-normal">Last 30 Days</p>
                    <div className="flex min-h-[220px] flex-1 flex-col gap-8 py-4">
                        <svg fill="none" height="100%" preserveAspectRatio="none" viewBox="-3 0 478 150" width="100%" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z" fill="url(#paint0_linear_1131_5935)"></path>
                            <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#2b8cee" stroke-linecap="round" stroke-width="3"></path>
                            <defs>
                                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1131_5935" x1="236" x2="236" y1="1" y2="149">
                                    <stop stop-color="#2b8cee" stop-opacity="0.3"></stop>
                                    <stop offset="1" stop-color="#2b8cee" stop-opacity="0"></stop>
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="flex justify-around">
                            <p className="text-gray-500 dark:text-[#9dabb9] text-[13px] font-bold leading-normal tracking-[0.015em]">Week 1</p>
                            <p className="text-gray-500 dark:text-[#9dabb9] text-[13px] font-bold leading-normal tracking-[0.015em]">Week 2</p>
                            <p className="text-gray-500 dark:text-[#9dabb9] text-[13px] font-bold leading-normal tracking-[0.015em]">Week 3</p>
                            <p className="text-gray-500 dark:text-[#9dabb9] text-[13px] font-bold leading-normal tracking-[0.015em]">Week 4</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 rounded-xl p-6 bg-white dark:bg-[#111418] border border-gray-200 dark:border-[#3b4754]">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">Recent Activity</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center size-10 rounded-full bg-blue-100 dark:bg-primary-300/20">
                                <span className="material-symbols-outlined text-primary-300">person_add</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800 dark:text-white">New user signed up</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">John Doe - 2 min ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center size-10 rounded-full bg-green-100 dark:bg-green-500/20">
                                <span className="material-symbols-outlined text-green-600 dark:text-green-400">school</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800 dark:text-white">New course enrollment</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Jane Smith in "Intro to UX" - 15 min ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center size-10 rounded-full bg-purple-100 dark:bg-purple-500/20">
                                <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">add_circle</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800 dark:text-white">New course published</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">"Advanced JavaScript" - 1 hour ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center size-10 rounded-full bg-yellow-100 dark:bg-yellow-500/20">
                                <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400">comment</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800 dark:text-white">New comment on a lesson</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Alex Ray - 3 hours ago</p>
                            </div>
                        </div>
                        <a className="text-primary-300 text-sm font-semibold mt-2 text-center hover:underline" href="#">View All Activity</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page