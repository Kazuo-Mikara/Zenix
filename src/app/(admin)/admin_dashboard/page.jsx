
'use client'
import React, { useEffect, useState } from 'react'
import data from '@/app/_data/data';
import {
    Home, LayoutDashboard, Briefcase, Users, PieChart, TrendingUp, Bell, Settings,
    Search, ChevronDown, MessageSquare, Phone, Globe, Mail, MoreVertical, Star, Folder, BarChart3, LineChart
} from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Chart as ChartJS } from "chart.js/auto"
import { Bar, Doughnut, Line } from "react-chartjs-2"
import MonthlyActivityChart from '../components/monthlyActivityChart'
import UserProfileChart from '../components/userProfileChart';
import InfoCard, { Sparkline } from '../components/infoCard'
import WeeklyLineChart from '../components/weeklyLineChart';
import Sidebar from '../components/sidebar';
import axios from 'axios';
export const infoCardsData = [
    { title: 'Students', count: 932, color: 'text-indigo-600', icon: Briefcase, link: '/admin_dashboard/students' },
    { title: 'Users', count: 932, color: 'text-red-600', icon: BarChart3, link: '/admin_dashboard/users' },
    { title: 'Reviews', count: 932, color: 'text-green-600', icon: Folder, link: '/admin_dashboard/reviews' },
    { title: 'Invoices', count: 932, color: 'text-yellow-600', icon: TrendingUp, link: '/admin_dashboard/invoices' },
    { title: 'Courses', count: 932, color: 'text-yellow-600', icon: TrendingUp, link: '/admin_dashboard/courses' },
    { title: 'Instructors', count: 932, color: 'text-yellow-600', icon: TrendingUp, link: '/admin_dashboard/instructors' },
    { title: 'Categories', count: 932, color: 'text-yellow-600', icon: TrendingUp, link: '/admin_dashboard/categories' },
    { title: 'Enrollments', count: 932, color: 'text-yellow-600', icon: TrendingUp, link: '/admin_dashboard/enrollments' },
];
const page = () => {
    const INITIAL_USER_STATS = {
        total: 0,
        male: 0,
        female: 0
    };
    const [user_count, setUserCount] = useState(INITIAL_USER_STATS);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axios.post('/api/users', { getCount: true });
        const data = await response.data;
        console.log(data)
        const { female_users, male_users } = data;
        setUserCount({ female: female_users, male: male_users, total: female_users + male_users });

    }
    return (
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {infoCardsData.map((card, index) => (
                    <a href={card.link} key={index} className="block">
                        <InfoCard
                            {...card}

                        />
                    </a>
                ))}


            </div>
            <div className="w-full items-center grid grid-cols-2 gap-6 my-4 ">
                <div className=' h-[300px]'>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Yearly Activity</h3>
                    <Line
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: true,
                                },
                            },
                        }}
                        data={{
                            labels: data.map(label => label.name),
                            datasets: [
                                {
                                    label: 'Instructors',
                                    data: data.map(label => label.uv),
                                    backgroundColor: '#004aad',
                                    borderColor: '#004aad',
                                    borderWidth: 1,
                                },
                                {
                                    label: 'Courses',
                                    data: data.map(label => label.pv),
                                    backgroundColor: '#FBBF24',
                                    borderColor: '#FBBF24',
                                    borderWidth: 1,
                                }
                            ],
                        }}
                    />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">User Profile</h3>
                    <UserProfileChart total={user_count.total} male={user_count.male} female={user_count.female} />
                    {/* <div className='flex flex-row justify-between'>
                            <p className="text-sm text-gray-500">Total Users: {user_count.total}</p>
                            <p className="text-sm text-gray-500">Male Users: {typeof (user_count.male) === 'number' ? user_count.male : 0}</p>
                            <p className="text-sm text-gray-500">Female Users: {typeof (user_count.female) === 'number' ? user_count.female : 0}</p>
                        </div> */}
                </div>
            </div>
            {/* Stats Overview */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-left">
                        <p className="text-lg font-semibold text-gray-900">Total Customers</p>
                        <p className="text-3xl font-bold text-gray-900">345,678</p>
                    </div>
                    {/* Mock Filters */}
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="font-medium text-green-500">New User: 49</span>
                        <span className="font-medium text-red-500">Growth: +10%</span>
                        <button className="flex items-center border rounded-lg px-3 py-1 hover:bg-gray-50">
                            Month <ChevronDown className="h-3 w-3 ml-1" />
                        </button>
                    </div>
                </div>

                <MonthlyActivityChart />
            </div>

            {/* Secondary Charts and User Reviews */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
                {/* Weekly/Statistic Chart */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 lg:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistic / Weekly</h3>
                    <div className="flex justify-end space-x-4 text-sm font-medium mb-4">
                        <span className="text-green-600">+20% This Week</span>
                        <span className="text-red-600">+13% Last Week</span>
                    </div>
                    <WeeklyLineChart />

                    {/* Impression Bar Chart Mock */}
                    <div className="mt-6">
                        <h4 className="font-medium text-gray-700">Impression</h4>
                        <div className="flex items-end h-16 mt-2 space-x-2">
                            <div className="w-12 text-2xl font-bold text-gray-800">12.345</div>
                            <div className="flex-1 h-full flex items-end space-x-2">
                                <div className="w-1/3 h-full bg-indigo-600 rounded-md"></div>
                                <div className="w-1/3 h-4/5 bg-indigo-300 rounded-md"></div>
                                <div className="w-1/3 h-3/5 bg-indigo-200 rounded-md"></div>
                            </div>
                            <span className="text-xs text-gray-500 w-20">5.4% last year</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* User Reviews */}
            <h3 className="text-xl font-bold text-gray-900 mb-4">User Reviews</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { name: 'Belle Epoque', rating: 5, excerpt: 'Sed eligendi facere repellendus, ipsum laudantium maxime ab, rerum architecto...' },
                    { name: 'Nagika Almania', rating: 4.5, excerpt: 'Sed eligendi facere repellendus, ipsum laudantium maxime ab, rerum architecto...' },
                    { name: 'Esmeralda Striff', rating: 5, excerpt: 'Sed eligendi facere repellendus, ipsum laudantium maxime ab, rerum architecto...' },
                ].map((review, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                        <div className="flex items-center text-amber-500 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < Math.floor(review.rating) ? 'fill-amber-500' : 'fill-none'}`} strokeWidth={2} />
                            ))}
                            {review.rating % 1 !== 0 && <span className="ml-1 text-sm font-semibold text-gray-700">{review.rating}</span>}
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-1">{review.name}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{review.excerpt}</p>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default page