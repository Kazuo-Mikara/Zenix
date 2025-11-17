import { Chart as ChartJS } from "chart.js/auto"
import { Bar, Doughnut, Line } from "react-chartjs-2"
const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];
const InfoCard = ({ title, count, color, icon: Icon }) => (
    <div className="bg-white py-4 rounded-xl shadow-lg flex  justify-center transition hover:shadow-xl border border-gray-100">
        <div className="flex  items-center justify-between gap-10">
            <div className="flex flex-row items-center space-x-3">
                <div className={`p-2 rounded-lg bg-opacity-10 ${color}`}>
                    <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium text-gray-500">{title}</h3>
            </div>
            <span className="text-xl font-bold">{count}</span>
        </div>

    </div>
);

export default InfoCard;