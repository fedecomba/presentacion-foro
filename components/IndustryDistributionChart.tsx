
import React from 'react';

const data = [
  { label: 'LOGÍSTICA Y TRANSPORTE', value: 3148, color: 'bg-amber-400' },
  { label: 'MANUFACTURA', value: 2837, color: 'bg-amber-400' },
  { label: 'AGRO', value: 2369, color: 'bg-amber-400' },
  { label: 'RETAIL', value: 2014, color: 'bg-amber-400' },
  { label: 'FARMACÉUTICO Y SALUD', value: 1275, color: 'bg-gray-500' },
  { label: 'ENERGÍA', value: 1240, color: 'bg-gray-500' },
  { label: 'IT Y SOFTWARE', value: 1196, color: 'bg-gray-500' },
  { label: 'SERVICIOS', value: 611, color: 'bg-gray-500' },
];

const IndustryDistributionChart: React.FC = () => {
  // Scale based on max value ~3200
  const maxVal = 3500;

  return (
    <div className="bg-[#1a1a1a] p-5 rounded-lg shadow-2xl border border-gray-700 w-[500px] md:w-[550px] font-sans text-white relative overflow-hidden">
      {/* Grid Background Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
             backgroundSize: '20px 20px' 
           }}>
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-end mb-5 border-b border-gray-800 pb-2">
          <h3 className="text-lg font-bold uppercase tracking-wide text-white">DISTRIBUCIÓN POR INDUSTRIA</h3>
          <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-1">VALORIZACIÓN DE ACTIVOS (USD)</span>
        </div>
        
        <div className="space-y-2.5">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 group">
              {/* Label Box */}
              <div className="w-44 bg-[#252525] rounded px-2.5 py-1.5 flex-shrink-0 border-l-2 border-transparent group-hover:border-gray-600 transition-colors">
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wide block truncate">{item.label}</span>
              </div>

              {/* Bar Container */}
              <div className="flex-1 h-1.5 bg-gray-800/50 rounded-full overflow-hidden relative">
                 <div 
                   className={`h-full rounded-full ${item.color} shadow-[0_0_8px_rgba(251,191,36,0.2)]`} 
                   style={{ width: `${(item.value / maxVal) * 100}%` }}
                 ></div>
              </div>

              {/* Value */}
              <div className="w-24 text-right font-bold text-white text-sm tabular-nums">
                USD {item.value.toLocaleString('es-AR')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustryDistributionChart;
