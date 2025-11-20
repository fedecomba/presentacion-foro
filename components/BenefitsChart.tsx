
import React, { useState } from 'react';
import IndustryDistributionChart from './IndustryDistributionChart';

const data = [
  { value: 1166 },
  { value: 1166 },
  { value: 1815 },
  { value: 2215 },
  { value: 1954 },
  { value: 1698 },
];

interface Point {
  x: number;
  y: number;
}

const BenefitsChart: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Set max Y slightly higher than max data for headroom
  const maxY = 2600; 

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
           <linearGradient id="blueArea" x1="0" y1="0" x2="0" y2="1">
             <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.9"/> 
             <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.4"/>
           </linearGradient>
        </defs>
        
        {/* Area Fill */}
        <path d={fillPath} fill="url(#blueArea)" stroke="none" />
        
        {/* Curve Line */}
        <path d={svgPath} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Data Points & Labels */}
      {points.map((p, i) => {
         // Target the second to last item ($1954 at index 4) instead of the last item
         const isInteractive = i === 4;

         return (
          <div 
            key={i} 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10" 
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
              {/* Label */}
              <span 
                className={`mb-2.5 text-xs font-bold tracking-tight transition-colors duration-200
                  ${isInteractive ? 'text-blue-700 cursor-pointer underline decoration-dotted decoration-blue-400 underline-offset-4' : 'text-gray-700'}
                `}
              >
                ${data[i].value.toLocaleString()}
              </span>
              
              {/* Dot */}
              <div className={`w-3.5 h-3.5 rounded-full border-[2px] border-white shadow-sm transition-transform duration-200
                  ${isInteractive && hoveredIndex === i ? 'bg-blue-600 scale-125' : 'bg-[#0066CC]'}
              `}></div>

              {/* Tooltip for Interactive Item */}
              {isInteractive && hoveredIndex === i && (
                <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-[85%] z-50 animate-fade-in">
                   {/* Render the component instead of the image */}
                   <IndustryDistributionChart />
                   
                   {/* Arrow pointing down */}
                   <div className="absolute -bottom-1.5 left-[85%] transform -translate-x-1/2 w-3 h-3 bg-[#1a1a1a] rotate-45 border-r border-b border-gray-700"></div>
                </div>
              )}
          </div>
         );
      })}
    </div>
  );
};

export default BenefitsChart;
