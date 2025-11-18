import React from 'react';

const data = [
  { label: 'Granos', workplace: 90000, realState: 420000, benefits: 390000, automotor: 80000 },
  { label: 'Acopio', workplace: 30000, realState: 140000, benefits: 120000, automotor: 25000 },
  { label: 'Amauta', workplace: 25000, realState: 125000, benefits: 110000, automotor: 20000 },
  { label: 'FyoCapita', workplace: 20000, realState: 115000, benefits: 105000, automotor: 18000 },
  { label: 'Insumos', workplace: 10000, realState: 45000, benefits: 40000, automotor: 5000 },
  { label: 'FyoFoods', workplace: 5000, realState: 15000, benefits: 15000, automotor: 2000 },
  { label: 'BIOND', workplace: 5000, realState: 15000, benefits: 15000, automotor: 2000 },
  { label: 'Holding', workplace: 0, realState: 0, benefits: 0, automotor: 0 },
  { label: 'Agrofy', workplace: 0, realState: 0, benefits: 0, automotor: 0 },
];

const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center gap-1.5">
    <div className={`w-3 h-3 ${color}`}></div>
    <span className="text-xs text-gray-600">{label}</span>
  </div>
);

const BudgetBreakdownChart: React.FC = () => {
  const maxVal = 1000000; // Scale up to 1M based on image

  const formatCurrency = (val: number) => {
    if (val === 0) return '$0';
    return `$${(val).toLocaleString()}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-300 w-[600px] z-50 relative">
      <h3 className="text-center font-bold text-gray-700 mb-4 text-lg">
        Cierre Presupuesto Ej. 24-25 - Distribución por División y Rubro
      </h3>

      {/* Legend */}
      <div className="flex justify-center gap-4 mb-6">
        <LegendItem color="bg-indigo-600" label="Workplace" />
        <LegendItem color="bg-emerald-500" label="Real State" />
        <LegendItem color="bg-amber-500" label="Beneficios" />
        <LegendItem color="bg-red-500" label="Automotor" />
      </div>

      {/* Chart Area */}
      <div className="flex h-64">
        {/* Y Axis */}
        <div className="flex flex-col justify-between text-xs text-gray-500 pr-2 text-right w-24 h-[85%]">
            <span>$1,000,000</span>
            <span>$900,000</span>
            <span>$800,000</span>
            <span>$700,000</span>
            <span>$600,000</span>
            <span>$500,000</span>
            <span>$400,000</span>
            <span>$300,000</span>
            <span>$200,000</span>
            <span>$100,000</span>
            <span>$0</span>
        </div>

        {/* Bars */}
        <div className="flex-1 flex items-end justify-between pl-2 h-[85%] border-l border-b border-gray-300 relative">
            {/* Grid Lines */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div 
                    key={i} 
                    className="absolute w-full border-t border-gray-100" 
                    style={{ bottom: `${i * 10}%`, left: 0, zIndex: 0 }} 
                />
            ))}

            {data.map((item, idx) => {
                const total = item.workplace + item.realState + item.benefits + item.automotor;
                const heightPercent = (total / maxVal) * 100;
                
                return (
                    <div key={idx} className="relative flex flex-col justify-end items-center w-full mx-1 z-10 group h-full">
                        <div className="w-full flex flex-col-reverse shadow-sm hover:opacity-90 transition-opacity" style={{ height: `${heightPercent}%` }}>
                            {/* Stack order: Bottom to Top visually in HTML is usually Top to Bottom, so we use flex-col-reverse to stack upwards */}
                            <div style={{ height: `${(item.workplace / total) * 100}%` }} className="bg-indigo-600 w-full" title={`Workplace: ${formatCurrency(item.workplace)}`}></div>
                            <div style={{ height: `${(item.realState / total) * 100}%` }} className="bg-emerald-500 w-full" title={`Real State: ${formatCurrency(item.realState)}`}></div>
                            <div style={{ height: `${(item.benefits / total) * 100}%` }} className="bg-amber-500 w-full" title={`Beneficios: ${formatCurrency(item.benefits)}`}></div>
                            <div style={{ height: `${(item.automotor / total) * 100}%` }} className="bg-red-500 w-full rounded-t-sm" title={`Automotor: ${formatCurrency(item.automotor)}`}></div>
                        </div>
                        <span className="absolute -bottom-8 text-[10px] font-medium text-gray-600 text-center w-full truncate px-0.5" title={item.label}>
                            {item.label}
                        </span>
                    </div>
                );
            })}
        </div>
      </div>
       {/* Y Axis Label */}
       <div className="absolute -left-4 top-1/2 -rotate-90 text-xs text-gray-500 font-medium transform -translate-y-1/2">
            Monto Asignado (USD)
      </div>
    </div>
  );
};

export default BudgetBreakdownChart;