const WeeklyLineChart = () => {
    const data1 = [20, 35, 40, 55, 45, 60, 50, 65, 70, 75, 80]; // Gold line
    const data2 = [30, 40, 50, 60, 50, 70, 60, 75, 85, 90, 95]; // Blue line

    const createPoints = (data) => data.map((d, i) => `${i * 10},${100 - d * 0.8}`).join(' ');

    return (
        <div className="w-full h-40">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                {/* Grid Lines */}
                {[0, 25, 50, 75, 100].map(y => (
                    <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#E5E7EB" strokeWidth="0.5" />
                ))}

                {/* Gold Line (Trending) */}
                <polyline fill="none" stroke="#FBBF24" strokeWidth="2" points={createPoints(data1)} />
                {/* Blue Line (Main Stat) */}
                <polyline fill="none" stroke="#3B82F6" strokeWidth="2" points={createPoints(data2)} />
            </svg>
        </div>
    );
};
export default WeeklyLineChart;