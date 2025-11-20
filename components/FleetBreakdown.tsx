import React from 'react';

const FleetBreakdown: React.FC = () => {
  const items = [
    { label: 'AMAUTA', value: 24, colorClass: 'border-yellow-500' },
    { label: 'AUTO BENEFICIO', value: 12, colorClass: 'border-emerald-400' },
    { label: 'FYO', value: 9, colorClass: 'border-gray-500' },
    { label: 'AMAUTA UY', value: 3, colorClass: 'border-gray-500' },
  ];

  return (
    <div className="bg-[#1a1a1a] p-3 rounded-lg shadow-2xl border border-gray-700 w-[280px] z-50 relative font-sans text-white text-left">
      <div className="flex flex-col gap-2">
        {items.map((item, idx) => (
          <div key={idx} className={`bg-[#252525] border-l-[4px] ${item.colorClass} rounded-r p-2 flex items-center justify-between shadow-sm`}>
            {/* Name */}
            <div className="font-bold text-xs tracking-wide uppercase text-gray-100 pl-2">
              {item.label}
            </div>

            {/* Metric */}
            <div className="flex flex-col items-end pr-1">
               <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider leading-none mb-1">UNIDADES</span>
               <span className="text-lg font-bold text-white leading-none">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FleetBreakdown;