
import React from 'react';

interface LocationData {
  name: string;
  sqm: number;
  workstations: number;
  type: 'hub' | 'standard' | 'new';
}

const locations: LocationData[] = [
  { name: 'ROSARIO', sqm: 2812, workstations: 295, type: 'hub' },
  { name: 'ROLDÁN', sqm: 95, workstations: 8, type: 'standard' },
  { name: 'SDE', sqm: 148, workstations: 8, type: 'standard' },
  { name: 'PARANÁ', sqm: 95, workstations: 8, type: 'standard' },
  { name: 'VILLA MARÍA', sqm: 115, workstations: 8, type: 'new' },
];

const RealStateBreakdown: React.FC = () => {
  return (
    <div className="bg-[#1a1a1a] p-3 rounded-lg shadow-2xl border border-gray-700 w-[450px] z-50 relative font-sans text-white">
      <div className="flex flex-col gap-2">
        {locations.map((loc) => {
          let borderClass = 'border-l-[3px] border-gray-600';
          
          if (loc.type === 'hub') {
            borderClass = 'border-l-[3px] border-yellow-400';
          } else if (loc.type === 'new') {
            borderClass = 'border-l-[3px] border-emerald-400';
          }

          return (
            <div key={loc.name} className={`bg-[#252525] rounded-r p-2 flex items-center justify-between ${borderClass} shadow-sm`}>
              
              {/* Name */}
              <div className="w-[28%] font-bold text-xs tracking-wide uppercase pl-2 text-gray-100">
                {loc.name}
              </div>

              {/* Metrics Container */}
              <div className="flex-1 flex justify-center gap-6">
                {/* Superficie */}
                <div className="flex flex-col items-center w-20">
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Superficie</span>
                  <span className="text-base font-bold text-gray-200 leading-tight">
                    {loc.sqm.toLocaleString('es-AR')}<span className="text-[10px] text-gray-500 ml-0.5 font-normal">m²</span>
                  </span>
                </div>

                {/* Puestos */}
                <div className="flex flex-col items-center w-24">
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Puestos Trabajo</span>
                  <span className="text-base font-bold text-gray-200 leading-tight">{loc.workstations}</span>
                </div>
              </div>

              {/* Badges/Status (Right side) */}
              <div className="w-16 flex justify-end pr-1">
                {loc.type === 'hub' && (
                  <div className="flex items-center text-yellow-400 text-[10px] font-bold">
                    <svg className="w-3 h-3 mr-1 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    HUB
                  </div>
                )}
                {loc.type === 'new' && (
                  <span className="bg-emerald-400 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase">
                    Nueva
                  </span>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RealStateBreakdown;
