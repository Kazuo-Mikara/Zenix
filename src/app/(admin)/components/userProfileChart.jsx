import { Chart as ChartJS } from "chart.js/auto"
import { Bar, Doughnut, Line } from "react-chartjs-2"

const UserProfileChart = ({ total, male, female }) => (
    <div className="flex items-center justify-center h-48">
        <div className="w-32 h-32 relative">
            <Doughnut
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                }}
                data={{
                    labels: ["Male", "Female"],
                    datasets: [
                        {
                            data: [male, female],
                            backgroundColor: ["#3498db", "#e74c3c"],
                            hoverBackgroundColor: ["#2980b9", "#c0392b"],
                        },
                    ],
                }}
            />
        </div>
        <div className="ml-8 space-y-2">
            <div className="flex justify-between w-full">
                <span className="flex items-center text-sm text-gray-700"><span className="w-3 h-3 rounded-full bg-[#3498db] mr-2"></span> Male</span>
                <span className="font-semibold text-gray-800 ml-5"> ({(male / total * 100).toFixed(2)}%)</span>
            </div>
            <div className="flex justify-between w-full">
                <span className="flex items-center text-sm text-gray-700"><span className="w-3 h-3 rounded-full bg-[#e74c3c] mr-2"></span> Female</span>
                <span className="font-semibold text-gray-800 ml-5"> ({(female / total * 100).toFixed(2)}%)</span>
            </div>
        </div>
    </div>
);
export default UserProfileChart;