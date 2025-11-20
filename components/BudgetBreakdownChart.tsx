
import React from 'react';

// Global breakdown percentages approximation:
// Real State: 44% | Benefits: 40% | Workplace: 9% | Automotor: 7%

const data = [
  { label: 'Granos', total: 980000, percent: '49%', breakdown: { realState: 431200, benefits: 392000, workplace: 88200, automotor: 68600 } },
  { label: 'Acopio', total: 320000, percent: '16%', breakdown: { realState: 140800, benefits: 128000, workplace: 28800, automotor: 22400 } },
  { label: 'Amauta', total: 280000, percent: '14%', breakdown: { realState: 123200, benefits: 112000, workplace: 25200, automotor: 19600 } },
  { label: 'Fyo Capital', total: 260000, percent: '13%', breakdown: { realState: 114400, benefits: 104000, workplace: 23400, automotor: 18200 } },
  { label: 'Insumos', total: 100000, percent: '5%', breakdown: { realState: 44000, benefits: 40000, workplace: 9000, automotor: 7000 } },
  { label: 'Fyo Foods', total: 40000, percent: '2%', breakdown: { realState: 17600, benefits: 16000, workplace: 3600, automotor: 2800 } },
  { label: 'BIOND', total: 40000, percent: '2%', breakdown: { realState: 17600, benefits: 16000, workplace: 3600, automotor: 2800 } },
  { label: 'Holding', total: 0, percent: '0%', breakdown: { realState: 0, benefits: 0, workplace: 0, automotor: 0 } },
  { label: 'Agrofy', total: 0, percent: '0%', breakdown: { realState: 0, benefits: 0, workplace: 0, automotor: 0 } },
];

const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-3 h-3 ${color} rounded-sm`}></div>
    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wide">{label}</span>
  </div>
);

const BudgetBreakdownChart: React.FC = () => {
  const maxVal = 1100000; // Scale for the chart

  const formatCurrency = (val: number) => {
    if (val === 0) return '$0';
    // Format as $980,000
    return `$${val.toLocaleString('en-US')}`;
  };

  return (
    <div className="bg-[#1a1a1a] p-5 rounded-lg shadow-2xl border border-gray-700 w-[650px] z-50 relative font-sans text-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-6 border-b border-gray-700 pb-3">
        <div className="flex flex-col">
          <h3 className="text-lg font-extrabold text-amber-500 uppercase leading-none">
            DISTRIBUCIÓN DEL PRESUPUESTO <br /> OFFICE MANAGER
          </h3>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">TOTAL</div>
          <div className="text-amber-500 font-bold text-lg leading-none">USD 2.000.000</div>
          <div className="text-amber-500 font-bold text-sm leading-none">(100%)</div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-start gap-6 mb-6 bg-[#252525] p-2 rounded border border-gray-700">
        <LegendItem color="bg-amber-500" label="Real State (44%)" />
        <LegendItem color="bg-emerald-400" label="Beneficios (40%)" />
        <LegendItem color="bg-gray-600" label="Workplace (9%)" />
        <LegendItem color="bg-gray-500" label="Automotor (7%)" />
      </div>

      {/* Chart Area */}
      <div className="flex h-64 items-end gap-2 pb-6">
        {data.map((item, idx) => {
          const total = item.total;
          const heightPercent = total > 0 ? (total / maxVal) * 100 : 0;
          
          // Calculate segment heights relative to the bar's total height
          // Since we calculated values based on % of total, we can use simple proportions
          const rsH = total > 0 ? (item.breakdown.realState / total) * 100 : 0;
          const benH = total > 0 ? (item.breakdown.benefits / total) * 100 : 0;
          const wpH = total > 0 ? (item.breakdown.workplace / total) * 100 : 0;
          const autoH = total > 0 ? (item.breakdown.automotor / total) * 100 : 0;

          return (
            <div key={idx} className="relative flex-1 flex flex-col items-center justify-end h-full group">
              {/* Value Labels above bar */}
              {total > 0 ? (
                 <div className="mb-2 flex flex-col items-center opacity-90 transition-opacity">
                   <span className="text-white font-bold text-xs leading-none mb-0.5">{item.percent}</span>
                   <span className="text-gray-400 font-semibold text-[10px] leading-none">{formatCurrency(total)}</span>
                 </div>
              ) : (
                 <div className="mb-2 flex flex-col items-center opacity-50">
                   <span className="text-gray-500 font-bold text-xs leading-none">0%</span>
                   <span className="text-gray-600 font-semibold text-[10px] leading-none">$0</span>
                 </div>
              )}

              {/* Stacked Bar */}
              <div className="w-full rounded-t-sm overflow-hidden flex flex-col justify-end bg-gray-800/30 relative" style={{ height: total > 0 ? `${heightPercent}%` : '4px' }}>
                {total > 0 && (
                    <>
                        {/* Render from bottom up visually: Automotor -> Workplace -> Benefits -> RealState? 
                            Standard CSS Flex col stacks top-down. So first div is top.
                            Order in Image usually: Bottom is often the base. 
                            Let's assume: Orange (RS) at bottom, then Green, then D.Gray, then L.Gray.
                            To do Bottom-up in flex-col:
                            We can use flex-col-reverse.
                        */}
                        <div className="w-full flex flex-col-reverse h-full">
                            <div style={{ height: `${rsH}%` }} className="bg-amber-500 w-full transition-all duration-300 group-hover:brightness-110" title={`Real State: ${formatCurrency(item.breakdown.realState)}`}></div>
                            <div style={{ height: `${benH}%` }} className="bg-emerald-400 w-full transition-all duration-300 group-hover:brightness-110" title={`Beneficios: ${formatCurrency(item.breakdown.benefits)}`}></div>
                            <div style={{ height: `${wpH}%` }} className="bg-gray-600 w-full transition-all duration-300 group-hover:brightness-110" title={`Workplace: ${formatCurrency(item.breakdown.workplace)}`}></div>
                            <div style={{ height: `${autoH}%` }} className="bg-gray-500 w-full transition-all duration-300 group-hover:brightness-110" title={`Automotor: ${formatCurrency(item.breakdown.automotor)}`}></div>
                        </div>
                    </>
                )}
              </div>

              {/* X Axis Label */}
              <div className="mt-2 h-8 flex items-start justify-center w-full">
                 <span className="text-[9px] font-bold text-gray-400 uppercase text-center leading-tight break-words w-full px-0.5">
                    {item.label}
                 </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetBreakdownChart;
