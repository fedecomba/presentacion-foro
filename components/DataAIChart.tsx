
import React from 'react';

// Mock data representing "AI Use Cases / Automated Flows" growth
const data = [
  { value: 0, label: 'Incipiente' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 4, label: '4' },
  { value: 8, label: '8' },
  { value: 12, label: '12' },
];

interface Point {
  x: number;
  y: number;
}

const DataAIChart: React.FC = () => {
  // Set max Y slightly higher than max data for headroom
  const maxY = 15; 

  // Calculate points: distribute evenly across 6 columns (centered)
  const points: Point[] = data.map((d, i) => ({
    x: ((i + 0.5) / 6) * 100,
    y: 100 - (d.value / maxY) * 100
  }));

  // --- Bezier Curve Logic ---
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
    const smoothing = 0.2;
    const o = line(p, n);
    const angle = o.angle + (reverse ? Math.PI : 0);
    const length = o.length * smoothing;
    return {
      x: current.x + Math.cos(angle) * length,
      y: current.y + Math.sin(angle) * length
    };
  };

  const bezierCommand = (point: Point, i: number, a: Point[]) => {
    const cps = controlPoint(a[i - 1], a[i - 2], point);
    const cpe = controlPoint(point, a[i - 1], a[i + 1], true);
    return `C ${cps.x},${cps.y} ${cpe.x},${cpe.y} ${point.x},${point.y}`;
  };

  const svgPath = points.reduce((acc, point, i, a) => 
    i === 0 ? `M ${point.x},${point.y}` : `${acc} ${bezierCommand(point, i, a)}`
  , '');
  
  // Close the path for the fill area
  const fillPath = `${svgPath} L ${points[points.length - 1].x},100 L ${points[0].x},100 Z`;

  return (
    <div className="w-full h-32 relative select-none">
      <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
           <linearGradient id="purpleArea" x1="0" y1="0" x2="0" y2="1">
             <stop offset="0%" stopColor="#d8b4fe" stopOpacity="0.9"/> 
             <stop offset="100%" stopColor="#f3e8ff" stopOpacity="0.4"/>
           </linearGradient>
        </defs>
        
        {/* Area Fill */}
        <path d={fillPath} fill="url(#purpleArea)" stroke="none" />
        
        {/* Curve Line */}
        <path d={svgPath} fill="none" stroke="#9333ea" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Data Points & Labels */}
      {points.map((p, i) => (
         <div key={i} className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            {/* Label */}
            <span className="mb-2.5 text-[10px] sm:text-xs font-bold text-gray-700 tracking-tight whitespace-nowrap">
               {data[i].label}
            </span>
            {/* Dot */}
            <div className="w-3.5 h-3.5 bg-purple-600 rounded-sm rotate-45 border-[2px] border-white shadow-sm"></div>
         </div>
      ))}
    </div>
  );
};

export default DataAIChart;
