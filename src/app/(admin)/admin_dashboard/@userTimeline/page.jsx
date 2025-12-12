'use client'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useUserTimeline } from './useUserTimeline'
const UserTimelineComponent = () => {
    const statusStyles = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-yellow-100 text-yellow-800',
        banned: 'bg-red-100 text-red-800',
        // Add a default for safety if needed
        default: 'bg-gray-100 text-gray-800'
    };
    const [userTimeline, setUserTimeline] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.get('/api/userTimeline');
            const data = response.data.userTimeline;
            setUserTimeline(data);

        } catch (err) {
            console.error('Error fetching user data:', err);
            setError('Failed to load user analytics');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-48">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                <span className="ml-2 text-gray-600">Loading user timeline...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-48 text-red-500">
                <div className="text-center">
                    <p>{error}</p>
                    <button
                        onClick={refetch}
                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="bg-white dark:bg-[#111418] rounded-lg ">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recently Created Users</h3>
            <table className="min-w-full bg-white dark:bg-[#111418] border border-gray-200 dark:border-[#3b4754]">
                <thead className="bg-gray-50 dark:bg-[#111418]">
                    <tr>

                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Joined
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {userTimeline.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50">

                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[user.status] || statusStyles.default}`}>
                                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}

                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default UserTimelineComponent