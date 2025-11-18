import React from 'react';
import { dashboardData } from '../constants';

const RatioChart: React.FC = () => {
    const data = dashboardData.map(d => ({
        ...d.ratio,
        year: d.year,
        ratioValue: parseFloat(d.ratio.ratio.replace(',', '.')),
        ratioLabel: d.ratio.ratio,
    }));

    const maxBarValue = Math.max(...data.map(d => d.barValue), 0) || 10;
    const maxRatioValue = 2.0; // Fixed axis for stability, as data is a percentage

    const getRatioYPercent = (value: number) => (value / maxRatioValue) * 100;

    // Create the SVG path string for the dashed line
    const linePoints = data.map((item, index) => {
        const x = data.length > 1 ? (index / (data.length - 1)) * 100 : 50;
        const y = 100 - getRatioYPercent(item.ratioValue);
        return { x, y };
    });

    let linePath = '';
    linePoints.forEach((p, i) => {
        linePath += `${i === 0 ? 'M' : 'L'} ${p.x},${p.y} `;
    });

    return (
        <div className="w-full">
            {/* Chart Area */}
            <div className="w-full h-48 relative">
                {/* Background Bars */}
                <div className="grid grid-cols-6 h-full gap-4 px-6 md:px-8">
                    {data.map((item, index) => (
                        <div key={`bar-${index}`} className="relative flex flex-col items-center justify-end">
                            <div className="w-12 bg-cyan-400" style={{ height: `${(item.barValue / (maxBarValue + 2)) * 100}%` }}></div>
                        </div>
                    ))}
                </div>

                {/* Foreground Line, Dots, and Labels */}
                <div className="absolute top-0 left-0 w-full h-full" style={{ paddingLeft: 'calc(100% / 12)', paddingRight: 'calc(100% / 12)'}}>
                    <div className="w-full h-full relative">
                        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="overflow-visible absolute">
                            <path d={linePath} fill="none" stroke="#D946EF" strokeWidth="2" strokeDasharray="5 5" vectorEffect="non-scaling-stroke"/>
                        </svg>
                        {linePoints.map((point, index) => (
                            <div key={`dot-${index}`} 
                                 className="absolute" 
                                 style={{ left: `${point.x}%`, top: `${point.y}%` }}>
                                <div className="absolute flex items-center justify-center text-white font-bold text-xs bg-pink-500 px-2 py-0.5 rounded transform -translate-x-1/2 -translate-y-full -mt-2">
                                    {data[index].ratioLabel}
                                </div>
                                <div className="absolute w-3 h-3 bg-pink-500 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                                <div className="absolute font-bold text-gray-700 text-sm transform -translate-x-1/2 mt-3">
                                    {data[index].barValue}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center space-x-8 mt-6">
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-cyan-400"></div>
                    <span className="text-sm font-semibold text-gray-700">Area OM</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-8 border-t-2 border-dashed border-pink-500"></div>
                    <span className="text-sm font-semibold text-gray-700">Ratio OM/Nomina</span>
                </div>
            </div>
        </div>
    );
};

export default RatioChart;