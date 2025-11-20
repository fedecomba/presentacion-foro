
import React, { useState } from 'react';
import { dashboardData } from '../constants';
import BudgetBreakdownChart from './BudgetBreakdownChart';
import RealStateBreakdown from './RealStateBreakdown';
import FleetBreakdown from './FleetBreakdown';
import BenefitsChart from './BenefitsChart';

const GreenTag: React.FC<{ text: string }> = ({ text }) => (
  <div className="relative inline-block bg-green-500 text-white px-2 py-0.5 text-xs rounded-sm shadow">
    <span>{text}</span>
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-green-500"></div>
  </div>
);

const FleetLegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center gap-2 mb-0.5">
    <div className={`w-3 h-3 ${color}`}></div>
    <span className="text-[10px] leading-none font-semibold text-gray-600 uppercase">{label}</span>
  </div>
);

const CollapsibleCard: React.FC<{ 
  title: string; 
  children: React.ReactNode; 
  trigger?: 'click' | 'hover';
}> = ({ title, children, trigger = 'click' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    if (trigger === 'hover') setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') setIsOpen(false);
  };

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => trigger === 'click' && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-3 text-left focus:outline-none ${trigger === 'hover' ? 'cursor-default' : 'cursor-pointer'}`}
      >
        <div className="flex items-center gap-2">
           {/* Decorative dot */}
           <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-purple-600' : 'bg-gray-300'} transition-colors`}></div>
           <span className="font-bold text-sm text-gray-700">{title}</span>
        </div>
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
           <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
           </svg>
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-3 pt-0 border-t border-transparent text-sm text-gray-600 bg-gray-50/50 rounded-b-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const maxOfficeSqm = Math.max(...dashboardData.map(d => d.office.sqm));
  const maxFleet = Math.max(...dashboardData.map(d => d.fleet.total));
  const [hoveredBudgetYear, setHoveredBudgetYear] = useState<string | null>(null);
  const [hoveredRealStateYear, setHoveredRealStateYear] = useState<string | null>(null);
  const [hoveredFleetYear, setHoveredFleetYear] = useState<string | null>(null);

  // Shared style for row headers to ensure consistency and visual hierarchy
  const rowHeaderClass = "text-xs font-semibold text-gray-500 uppercase tracking-wider";

  return (
    <div className="w-full max-w-7xl mx-auto bg-gray-50 p-4 sm:p-6 md:pr-48 rounded-xl shadow-lg border border-gray-200 relative font-sans">
      {/* Years Header */}
      <div className="grid grid-cols-[1fr,6fr] md:grid-cols-7 gap-4 mb-4">
        <div className="hidden md:block"></div>
        <div className="col-span-6 grid grid-cols-6 gap-4">
          {dashboardData.map(({ year }) => (
            <div key={year} className="text-center text-sm sm:text-base font-bold text-gray-600">{year}</div>
          ))}
        </div>
      </div>

      {/* Metric Rows */}
      <div className="space-y-3">
        {/* Mt.2 OFICINA */}
        <div className="grid grid-cols-[1fr,6fr] md:grid-cols-7 gap-4 items-center bg-white p-3 rounded-lg shadow-sm">
          <div className={rowHeaderClass}>
            REAL STATE: <br />
            Mt2 Oficina
          </div>
          <div className="col-span-6 grid grid-cols-6 gap-4 items-start relative">
            {dashboardData.map(({ year, office }) => (
              <div key={year} className="flex flex-col items-center justify-end h-16 relative">
                <div 
                  className={`font-bold text-sm mt-1 relative
                    ${year === '24/25' ? 'text-blue-800 cursor-pointer underline decoration-dotted decoration-blue-400 underline-offset-4' : 'text-gray-800'}
                  `}
                  onMouseEnter={() => year === '24/25' && setHoveredRealStateYear(year)}
                  onMouseLeave={() => setHoveredRealStateYear(null)}
                >
                  {office.sqm}
                  
                  {/* Real State Popover */}
                  {year === '24/25' && hoveredRealStateYear === '24/25' && (
                    <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
                      {/* Triangular arrow pointing up */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#1a1a1a] rotate-45 border-l border-t border-gray-600 z-50"></div>
                      <RealStateBreakdown />
                    </div>
                  )}
                </div>
                
                <div className="w-full bg-gray-200 rounded h-2 mt-2">
                  <div className="bg-blue-900 h-2 rounded" style={{ width: `${(office.sqm / maxOfficeSqm) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AUTOMOTOR */}
        <div className="grid grid-cols-[1fr,6fr] md:grid-cols-7 gap-4 items-center bg-white p-3 rounded-lg shadow-sm relative">
          <div className={rowHeaderClass}>AUTOMOTOR</div>
          <div className="col-span-6 relative">
            <div className="grid grid-cols-6 gap-4 items-end">
              {dashboardData.map(({ year, fleet }) => (
                <div key={year} className="flex flex-col items-center justify-end relative h-20">
                  {/* Number Value with Hover logic */}
                  <div 
                    className={`font-bold text-sm mb-1 relative z-20
                      ${year === '24/25' ? 'cursor-pointer text-blue-800 underline decoration-dotted decoration-blue-400 underline-offset-4' : 'text-gray-800'}
                    `}
                    onMouseEnter={() => year === '24/25' && setHoveredFleetYear(year)}
                    onMouseLeave={() => setHoveredFleetYear(null)}
                  >
                    {fleet.total}

                    {/* Fleet Popover */}
                    {year === '24/25' && hoveredFleetYear === '24/25' && (
                      <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in w-max">
                         {/* Arrow pointing up (box is below) */}
                         <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#1a1a1a] rotate-45 border-l border-t border-gray-700 z-50"></div>
                         <FleetBreakdown />
                      </div>
                    )}
                  </div>

                  {/* Stacked bars */}
                  <div className="w-10 bg-gray-200 flex flex-col justify-end rounded-t overflow-hidden" style={{ height: `${(fleet.total / maxFleet) * 100}%`}}>
                    {fleet.breakdown.map((item) => (
                      <div 
                        key={item.label} 
                        className={`${item.color} w-full`} 
                        style={{ height: `${(item.value / fleet.total) * 100}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Legend moved to the right with adjusted padding */}
            <div className="absolute left-[100%] top-1/2 transform -translate-y-1/2 flex flex-col justify-center pl-2 w-max">
               <FleetLegendItem color="bg-amber-500" label="Amauta" />
               <FleetLegendItem color="bg-emerald-400" label="Auto Beneficio" />
               <FleetLegendItem color="bg-slate-500" label="Fyo" />
               <FleetLegendItem color="bg-gray-400" label="Amauta UY" />
            </div>
          </div>
        </div>

        {/* PRESUPUESTO */}
        <div className="grid grid-cols-[1fr,6fr] md:grid-cols-7 gap-4 items-center bg-white p-3 rounded-lg shadow-sm h-16 relative">
          <div className={rowHeaderClass}>PRESUPUESTO</div>
          <div className="col-span-6 grid grid-cols-6 gap-4">
            {dashboardData.map(({ year, budget }) => (
              <div 
                key={year} 
                className="text-center flex flex-col items-center justify-center relative"
                onMouseEnter={() => year === '24/25' && setHoveredBudgetYear(year)}
                onMouseLeave={() => setHoveredBudgetYear(null)}
              >
                 {budget.tag && <GreenTag text={budget.tag} />}
                <div 
                  className={`font-bold text-sm sm:text-base ${budget.color} mt-1.5 ${year === '24/25' ? 'cursor-pointer underline decoration-dotted decoration-gray-400 underline-offset-4 hover:text-blue-800' : ''}`}
                >
                  {budget.value}
                </div>
                
                {/* Popover Chart for 24/25 */}
                {year === '24/25' && hoveredBudgetYear === '24/25' && (
                  <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-[85%] z-50 animate-fade-in">
                     {/* Triangular arrow pointing down */}
                    <div className="absolute -bottom-2 left-[85%] transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-300 z-50"></div>
                    <BudgetBreakdownChart />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* BENEFICIOS */}
        <div className="grid grid-cols-[1fr,6fr] md:grid-cols-7 gap-4 items-center bg-white p-3 rounded-lg shadow-sm">
          <div className={rowHeaderClass}>
            BENEFICIOS: <br />
            Monto anual x <br />
            colaborador (USD)
          </div>
          <div className="col-span-6 relative">
             <BenefitsChart />
          </div>
        </div>

        {/* DATOS E IA - Collapsible Cards */}
        <div className="grid grid-cols-[1fr,6fr] md:grid-cols-7 gap-4 items-start bg-white p-3 rounded-lg shadow-sm">
          <div className={`${rowHeaderClass} mt-3`}>
            DATOS E IA
          </div>
          <div className="col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Card 1: Automatizaciones Operativas (Left, Hover) */}
             <CollapsibleCard title="Automatizaciones operativas" trigger="hover">
                <ul className="list-none space-y-2 pl-1">
                  {['Flujo de facturación', 'Desayuno cumpleaños', 'Reservas de salas', 'Alertas GPS', 'Reportes – Tasa de uso'].map((item, index) => (
                     <li key={index} className="flex gap-2 items-center">
                       <span className="text-purple-600 font-bold text-xs">•</span>
                       <span>{item}</span>
                     </li>
                  ))}
                </ul>
             </CollapsibleCard>

             {/* Card 2: Aplicación en Flota Corporativa (Right, Click) */}
             <CollapsibleCard title="Aplicación en Flota Corporativa">
                <ul className="list-none space-y-2">
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>
                      <strong>Predictivo:</strong> Modelo para anticipar fallas y mantenimientos (+80% precisión).
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>
                      <strong>Gestión:</strong> Dashboard mensual con uso, km, costos, siniestros y alertas.
                    </span>
                  </li>
                </ul>
             </CollapsibleCard>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
