import React from 'react';
import { dashboardData } from '../constants';

// Helper interface for coordinates
interface Point {
  x: number;
  y: number;
}

const RatioChart: React.FC = () => {
    const data = dashboardData.map(d => ({
        ...d.ratio,
        year: d.year,
        ratioValue: parseFloat(d.ratio.ratio.replace(',', '.')),
        ratioLabel: d.ratio.ratio,
    }));

    const maxBarValue = Math.max(...data.map(d => d.barValue), 0) || 10;
    const maxRatioValue = 2.0; // Fixed axis for stability

    const getRatioYPercent = (value: number) => (value / maxRatioValue) * 100;

    // 1. Prepare Data Points
    const points: Point[] = data.map((item, index) => {
        const x = data.length > 1 ? (index / (data.length - 1)) * 100 : 50;
        const y = 100 - getRatioYPercent(item.ratioValue);
        return { x, y };
    });

    // 2. Bezier Curve Calculation Logic (Catmull-Rom to Cubic Bezier)
    const svgPath = (points: Point[], command: (point: Point, i: number, a: Point[]) => string) => {
        const d = points.reduce((acc, point, i, a) => i === 0
            ? `M ${point.x},${point.y}`
            : `${acc} ${command(point, i, a)}`
        , '');
        return d;
    };

    const line = (pointA: Point, pointB: Point) => {
        const lengthX = pointB.x - pointA.x;
        const lengthY = pointB.y - pointA.y;
        return {
            length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
            angle: Math.atan2(lengthY, lengthX)
        };
    };

    const controlPoint = (current: Point, previous: Point | undefined, next: Point | undefined, reverse?: boolean) => {
        const p = previous || current;
        const n = next || current;
        const smoothing = 0.15; // Controls the curvature (0 = straight, 0.2 = soft)
        
        const o = line(p, n);
        const angle = o.angle + (reverse ? Math.PI : 0);
        const length = o.length * smoothing;
        
        const x = current.x + Math.cos(angle) * length;
        const y = current.y + Math.sin(angle) * length;
        return { x, y };
    };

    const bezierCommand = (point: Point, i: number, a: Point[]) => {
        const cps = controlPoint(a[i - 1], a[i - 2], point);
        const cpe = controlPoint(point, a[i - 1], a[i + 1], true);
        return `C ${cps.x},${cps.y} ${cpe.x},${cpe.y} ${point.x},${point.y}`;
    };

    const curvePath = svgPath(points, bezierCommand);
    const fillPath = `${curvePath} L 100,100 L 0,100 Z`;

    return (
        <div className="w-full">
            {/* Chart Area */}
            <div className="w-full h-48 relative">
                {/* Background Bars */}
                <div className="grid grid-cols-6 h-full gap-4 px-6 md:px-8 relative z-10 pointer-events-none">
                    {data.map((item, index) => (
                        <div key={`bar-${index}`} className="relative flex flex-col items-center justify-end h-full">
                            <div className="w-12 bg-cyan-400/30 backdrop-blur-[1px]" style={{ height: `${(item.barValue / (maxBarValue + 2)) * 100}%` }}></div>
                        </div>
                    ))}
                </div>

                {/* SVG Layer */}
                <div className="absolute top-0 left-0 w-full h-full z-20" style={{ paddingLeft: 'calc(100% / 12)', paddingRight: 'calc(100% / 12)'}}>
                    <div className="w-full h-full relative">
                        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="overflow-visible absolute">
                            <defs>
                                <linearGradient id="ratioGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.0" />
                                </linearGradient>
                            </defs>
                            {/* Gradient Fill */}
                            <path d={fillPath} fill="url(#ratioGradient)" stroke="none" />
                            {/* Smooth Line */}
                            <path d={curvePath} fill="none" stroke="#ec4899" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                        </svg>
                        
                        {/* Dots & Labels */}
                        {points.map((point, index) => (
                            <div key={`dot-${index}`} 
                                 className="absolute group" 
                                 style={{ left: `${point.x}%`, top: `${point.y}%` }}>
                                
                                {/* Label */}
                                <div className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-full -mt-4 transition-transform duration-300 group-hover:-translate-y-[120%]">
                                    <div className="bg-pink-500 text-white font-bold text-xs px-2 py-1 rounded shadow-md whitespace-nowrap mb-0.5">
                                        {data[index].ratioLabel}
                                    </div>
                                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-pink-500"></div>
                                </div>

                                {/* Pulsing Effect */}
                                <div className="absolute w-3 h-3 bg-pink-500 rounded-full animate-ping opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
                                
                                {/* Main Dot with Glow */}
                                <div className="absolute w-3 h-3 bg-pink-500 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(236,72,153,0.6)] z-30"></div>
                                
                                {/* Bar Value Label (Below) */}
                                <div className="absolute font-bold text-gray-700 text-sm transform -translate-x-1/2 mt-4 transition-all duration-300 group-hover:text-pink-600 group-hover:scale-110">
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
                    <div className="w-4 h-4 bg-cyan-400/50"></div>
                    <span className="text-sm font-semibold text-gray-600">Area OM</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center w-8 h-4 relative">
                        <div className="absolute w-full h-1 bg-pink-500 rounded-full"></div>
                        <div className="absolute w-2 h-2 bg-pink-500 border border-white rounded-full"></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-600">Ratio OM/Nomina</span>
                </div>
            </div>
        </div>
    );
};

export default RatioChart;