'use client'
import { useUserStats } from './useUserStats';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
);

const INITIAL_USER_STATS = {
    total: 0,
    male: 0,
    female: 0
};

const UserAnalyticsParallel = () => {

    const { userCount, isLoading, error, refetch } = useUserStats();


    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-48">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                <span className="ml-2 text-gray-600">Loading user analytics...</span>
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

    const { male, female, total } = userCount;

    return (
        <div className="bg-white flex justify-center p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 ">User Analytics</h3>
            <div className="flex flex-row items-center justify-center">
                <div className="w-32 h-32">
                    {total > 0 ? (
                        <Doughnut
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: (context) => {
                                                const value = context.parsed;
                                                const percentage = ((value / total) * 100).toFixed(1);
                                                return `${context.label}: ${value} (${percentage}%)`;
                                            }
                                        }
                                    }
                                },
                            }}
                            data={{
                                labels: ["Male", "Female"],
                                datasets: [
                                    {
                                        data: [male, female],
                                        backgroundColor: ["#3498db", "#e74c3c"],
                                        hoverBackgroundColor: ["#2980b9", "#c0392b"],
                                        borderWidth: 2,
                                        borderColor: "#ffffff"
                                    },
                                ],
                            }}
                        />
                    ) : (
                        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-500 text-sm">No Data</span>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="text-center mb-4">
                        <p className="text-sm text-gray-500">Total Users</p>
                        <p className="text-2xl font-bold text-gray-800">{total}</p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm text-gray-700">
                                <span className="rounded-full bg-[#3498db] mr-2"></span>
                                Male
                            </span>
                            <div className="text-right">
                                <span className="font-semibold text-gray-800">{male}</span>
                                <span className="text-sm text-gray-500 ml-1">
                                    ({total > 0 ? (male / total * 100).toFixed(1) : 0}%)
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm text-gray-700">
                                <span className=" rounded-full bg-[#e74c3c] mr-2"></span>
                                Female
                            </span>
                            <div className="text-right">
                                <span className="font-semibold text-gray-800">{female}</span>
                                <span className="text-sm text-gray-500 ml-1">
                                    ({total > 0 ? (female / total * 100).toFixed(1) : 0}%)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAnalyticsParallel;