
import React, { useState } from 'react';

// --- Icons ---

const GiftIcon = () => (
  <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
  </svg>
);

const CursorClickIcon = () => (
  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const AdjustmentsIcon = () => (
  <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);

// New Icons for 1740 Popover
const StarIcon = () => (
  <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

const CutleryIcon = () => (
  <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const DumbbellIcon = () => (
  <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2v-4zm-14 0v4a2 2 0 01-2-2v-2a2 2 0 012-2z" />
  </svg>
);

const WifiIcon = () => (
  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
  </svg>
);


const data = [
  { value: 1170 },
  { value: 1170 },
  { value: 1740 },
  { value: 1620 },
  { value: 1810 },
  { value: 1530 },
];

interface Point {
  x: number;
  y: number;
}

const BenefitsChart: React.FC = () => {
  // Set max Y slightly higher than max data for headroom
  const maxY = 2600; 
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
          const isInteractive1740 = data[i].value === 1740;
          const isInteractive1530 = data[i].value === 1530;
          const isInteractive = isInteractive1740 || isInteractive1530;

          return (
            <div 
              key={i} 
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 ${isInteractive ? 'cursor-pointer' : ''}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              onMouseEnter={() => isInteractive && setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
                {/* Label */}
                <span className={`mb-2.5 text-xs font-bold tracking-tight whitespace-nowrap ${isInteractive ? 'text-blue-800 underline decoration-dotted decoration-blue-400 underline-offset-4' : 'text-gray-700'}`}>
                  USD {data[i].value.toLocaleString()}
                </span>
                
                {/* Popover Card for 1740 (Mejora Beneficios) */}
                {isInteractive1740 && hoveredIndex === i && (
                  <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in w-max">
                     {/* Triangular arrow pointing down */}
                     <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#1a1a1a] rotate-45 border-r border-b border-gray-700 z-50"></div>
                     
                     {/* Card Content */}
                     <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-2xl border border-gray-700 relative font-sans text-white text-left min-w-[200px]">
                        {/* Header */}
                        <div className="mb-3 border-b border-gray-700 pb-2 flex items-center gap-2">
                            <StarIcon />
                            <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider block">
                                Mejora Beneficios
                            </span>
                        </div>

                        {/* Icon List */}
                        <ul className="space-y-3">
                          <li className="flex items-center gap-3">
                             <div className="mt-0.5"><CutleryIcon /></div>
                             <span className="text-xs text-gray-300 font-medium leading-snug">
                               Almuerzo
                             </span>
                          </li>
                          <li className="flex items-center gap-3">
                             <div className="mt-0.5"><DumbbellIcon /></div>
                             <span className="text-xs text-gray-300 font-medium leading-snug">
                               Gympass
                             </span>
                          </li>
                          <li className="flex items-center gap-3">
                             <div className="mt-0.5"><WifiIcon /></div>
                             <span className="text-xs text-gray-300 font-medium leading-snug">
                               Conectividad
                             </span>
                          </li>
                        </ul>
                     </div>
                  </div>
                )}

                {/* Popover Card for 1530 (Sistema de beneficios flexibles) */}
                {isInteractive1530 && hoveredIndex === i && (
                  <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-[85%] z-50 animate-fade-in w-max">
                     {/* Triangular arrow pointing down (offset to align with point) */}
                     <div className="absolute -bottom-1.5 left-[85%] transform -translate-x-1/2 w-3 h-3 bg-[#1a1a1a] rotate-45 border-r border-b border-gray-700 z-50"></div>
                     
                     {/* Card Content */}
                     <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-2xl border border-gray-700 relative font-sans text-white text-left w-[320px]">
                        {/* Header - Emoji Replaced with SVG */}
                        <div className="mb-3 border-b border-gray-700 pb-2 flex items-center gap-2">
                            <GiftIcon />
                            <span className="text-amber-500 font-bold text-xs uppercase tracking-wider block">
                                Sistema de beneficios flexibles
                            </span>
                        </div>

                        {/* Icon List - Bullets Replaced with SVG */}
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                             <div className="mt-0.5"><CursorClickIcon /></div>
                             <span className="text-xs text-gray-300 font-medium leading-snug">
                               El colaborador elige cómo usar sus puntos.
                             </span>
                          </li>
                          <li className="flex items-start gap-3">
                             <div className="mt-0.5"><UserIcon /></div>
                             <span className="text-xs text-gray-300 font-medium leading-snug">
                               El paquete de beneficios se vuelve personalizable.
                             </span>
                          </li>
                          <li className="flex items-start gap-3">
                             <div className="mt-0.5"><AdjustmentsIcon /></div>
                             <span className="text-xs text-gray-300 font-medium leading-snug">
                               Optimiza costos al ofrecer flexibilidad sin aumentar el presupuesto.
                             </span>
                          </li>
                        </ul>
                     </div>
                  </div>
                )}
                
                {/* Dot */}
                <div className={`w-3.5 h-3.5 rounded-full border-[2px] border-white shadow-sm ${isInteractive ? 'bg-blue-600' : 'bg-[#0066CC]'}`}></div>
            </div>
          );
      })}
    </div>
  );
};

export default BenefitsChart;
