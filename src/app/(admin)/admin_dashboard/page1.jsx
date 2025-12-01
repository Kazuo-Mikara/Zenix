'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import getDashboardInfo from '@/helpers/(admin)/dashboard/getDashboardInfo';
import Link from 'next/link';

const StatCard = ({ title, count, icon, isLoading }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition hover:shadow-xl w-full">
        <div>
            <p className="text-2xl font-bold text-gray-800">
                {isLoading ? (
                    <div className="animate-pulse bg-gray-300 h-8 w-16 rounded"></div>
                ) : (
                    count || '0'
                )}
            </p>
            <p className="text-sm text-gray-500 mt-1">{title}</p>
        </div>
        <div className="text-indigo-500 text-3xl">{icon}</div>
    </div>
);

const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="h-8 bg-gray-300 rounded w-16 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded"></div>
                </div>
            </div>
        ))}
    </div>
);

const ErrorState = ({ onRetry }) => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 text-xl mb-2">⚠️</div>
        <h3 className="text-lg font-medium text-red-800 mb-2">Failed to Load Dashboard Data</h3>
        <p className="text-red-600 mb-4">There was an error loading your dashboard statistics.</p>
        <button
            onClick={onRetry}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
            Try Again
        </button>
    </div>
);

const page = () => {
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

    const dashboardStats = {
        students: data?.students || 0,
        users: data?.users || 0,
        courses: data?.courses || 0,
        instructors: data?.instructors || 0,
        reviews: data?.reviews || 0,
        invoices: data?.invoices || 0,
        categories: data?.categories || 0,
        enrollments: data?.enrollments || 0,
    };

    const statItems = [
        { title: 'Students', count: dashboardStats.students, icon: '🎓', link: '/admin_dashboard/students' },
        { title: 'Users', count: dashboardStats.users, icon: '👥', link: '/admin_dashboard/users' },
        { title: 'Reviews', count: dashboardStats.reviews, icon: '⭐', link: '/admin_dashboard/reviews' },
        { title: 'Invoices', count: dashboardStats.invoices, icon: '💸', link: '/admin_dashboard/invoices' },
        { title: 'Courses', count: dashboardStats.courses, icon: '📚', link: '/admin_dashboard/courses' },
        { title: 'Instructors', count: dashboardStats.instructors, icon: '👨‍🏫', link: '/admin_dashboard/instructors' },
        { title: 'Categories', count: dashboardStats.categories, icon: '🏷️', link: '/admin_dashboard/categories' },
        { title: 'Enrollments', count: dashboardStats.enrollments, icon: '📝', link: '/admin_dashboard/enrollments' },
    ];

    if (isLoading) {
        return (
            <main className="flex-1 lg:p-2 max-w-7xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
                <LoadingSkeleton />
            </main>
        );
    }


    if (isError) {
        return (
            <main className="flex-1 lg:p-2 max-w-7xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
                <ErrorState onRetry={refetch} />


                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-4 p-4 bg-gray-100 rounded text-xs text-gray-600">
                        <details>
                            <summary>Error Details (Dev Only)</summary>
                            <pre className="mt-2 whitespace-pre-wrap">
                                {error?.message || 'Unknown error'}
                            </pre>
                        </details>
                    </div>
                )}
            </main>
        );
    }

    return (
        <main className="flex-1 lg:p-2 w-full">

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statItems.map((item, index) => (
                    <Link href={item.link} key={index} className="block">
                        <StatCard
                            title={item.title}
                            count={item.count}
                            icon={item.icon}
                            isLoading={isFetching}
                        />
                    </Link>
                ))}
            </div>


            {data && (
                <div className="mt-8 text-center ">
                    <div className="flex justify-center items-center  text-sm text-gray-400 mb-6">
                        Last updated: {new Date().toLocaleTimeString()}
                        <button
                            onClick={() => refetch()}
                            disabled={isFetching}
                            className="flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition disabled:opacity-50"
                        >
                            <span className={`mr-2 ${isFetching ? 'animate-spin' : ''}`}>
                                🔄
                            </span>
                            {isFetching ? 'Refreshing...' : 'Refresh'}
                        </button>
                    </div>

                </div>
            )}
        </main>
    );
};

export default page;