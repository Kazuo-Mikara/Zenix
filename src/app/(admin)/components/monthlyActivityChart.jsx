const MonthlyActivityChart = () => {
    const data = [10, 25, 15, 30, 45, 80, 55, 35, 20, 10, 5, 20]; // Mock heights

    return (
        <div className="h-40 w-full flex items-end pt-2">
            {data.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center h-full group">
                    <div
                        className={`w-4 rounded-t-lg transition-all duration-300 ${i === 5 ? 'bg-indigo-600' : 'bg-gray-200 hover:bg-indigo-300'}`}
                        style={{ height: `${h * 0.75}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-1">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                    </span>
                </div>
            ))}
        </div>
    );
};
export default MonthlyActivityChart;
