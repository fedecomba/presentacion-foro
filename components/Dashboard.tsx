
import React, { useState } from 'react';
import { dashboardData } from '../constants';
import BudgetBreakdownChart from './BudgetBreakdownChart';
import RealStateBreakdown from './RealStateBreakdown';
import FleetBreakdown from './FleetBreakdown';
import BenefitsChart from './BenefitsChart';

// --- Icons for Popovers & Rows ---

const OfficeIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const CarFrontIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" style={{ display: 'none' }} /> 
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 16v-2l-2-5h-3.5c-.77 0-1.47.4-1.88 1.05L12 13H5a2 2 0 00-2 2v3h18zM5 18h2M17 18h2" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);

const BanknotesIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const HeartHandIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const CpuChipIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);

const CurrencyIcon = () => (
  <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const GavelIcon = () => (
  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const TrendingDownIcon = () => (
  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
    <path d="M22 2 12 12" />
  </svg>
);

const LinkIcon = () => (
  <svg className="w-3 h-3 text-blue-500 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

// New icons for Data popover
const RobotIcon = () => (
  <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ChartBarIcon = () => (
  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const BoltIcon = () => (
  <svg className="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const DevicePhoneMobileIcon = () => (
  <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const CheckCircleMiniIcon = () => (
  <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

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

const Dashboard: React.FC = () => {
  const maxOfficeSqm = Math.max(...dashboardData.map(d => d.office.sqm));
  const maxFleet = Math.max(...dashboardData.map(d => d.fleet.total));
  const [hoveredBudgetYear, setHoveredBudgetYear] = useState<string | null>(null);
  const [hoveredRealStateYear, setHoveredRealStateYear] = useState<string | null>(null);
  const [hoveredFleetYear, setHoveredFleetYear] = useState<string | null>(null);
  
  // State for collapsible tabs
  const [activeDataTab, setActiveDataTab] = useState<string | null>(null);

  const toggleDataTab = (tab: string) => {
    setActiveDataTab(prev => prev === tab ? null : tab);
  };

  // Shared style for row headers to ensure consistency and visual hierarchy
  const rowHeaderClass = "text-xs font-semibold text-gray-500 uppercase tracking-wider";
  
  // Highlighting style for "FOCOS 25/26" column
  // Updated: Solid border and inner shadow for a more firm and corporate look
  const focosHighlightClass = "bg-amber-50 border border-amber-200 shadow-inner rounded-xl";

  // Years that have Real State Popover interactions
  const interactiveRealStateYears = ['22/23', '23/24', '24/25', 'FOCOS 25/26'];
  
  // Years that have Fleet Popover interactions
  const interactiveFleetYears = ['22/23', '24/25'];
  
  // Years that have Budget Popover interactions
  const interactiveBudgetYears = ['24/25', 'FOCOS 25/26'];

  return (
    <div className="w-full max-w-7xl mx-auto bg-gray-50 p-4 sm:p-6 md:pr-48 rounded-xl shadow-lg border border-gray-200 relative font-sans">
      {/* Years Header */}
      <div className="grid grid-cols-[1fr,6fr] md:grid-cols-7 gap-4 mb-4">
        <div className="hidden md:block"></div>
        <div className="col-span-6 grid grid-cols-6 gap-4">
          {dashboardData.map(({ year }) => (
            <div 
              key={year} 
              className={`text-center text-sm sm:text-base font-bold text-gray-600 flex items-center justify-center gap-1 ${year === 'FOCOS 25/26' ? focosHighlightClass + ' py-1' : ''}`}
            >
              {year}
              {year === 'FOCOS 25/26' && <TargetIcon />}
            </div>
          ))}
        </div>
      </div>

      {/* Metric Rows */}
      <div className="space-y-3">
        {/* Mt.2 OFICINA */}
        <div className={`grid grid-cols-[1fr,6fr] md:grid-cols-7 gap-4 items-center bg-white p-3 rounded-lg shadow-sm relative transition-all duration-200 ${hoveredRealStateYear ? 'z-50' : ''}`}>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
               <OfficeIcon />
               <span className={rowHeaderClass}>REAL STATE</span>
            </div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide ml-7">Mt2 Oficina</span>
          </div>
          <div className="col-span-6 grid grid-cols-6 gap-4 items-start relative">
            {dashboardData.map(({ year, office }) => (
              <div 
                key={year} 
                className={`flex flex-col items-center justify-end h-16 relative ${year === 'FOCOS 25/26' ? focosHighlightClass + ' px-1' : ''}`}
              >
                <div 
                  className={`font-bold text-sm mt-1 relative
                    ${interactiveRealStateYears.includes(year) ? 'text-blue-800 cursor-pointer underline decoration-dotted decoration-blue-400 underline-offset-4' : 'text-gray-800'}
                  `}
                  onMouseEnter={() => interactiveRealStateYears.includes(year) && setHoveredRealStateYear(year)}
                  onMouseLeave={() => setHoveredRealStateYear(null)}
                >
                  {office.sqm}
                  
                  {/* Real State Popover (24/25) */}
                  {year === '24/25' && hoveredRealStateYear === '24/25' && (
                    <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
                      {/* Triangular arrow pointing up */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#1a1a1a] rotate-45 border-l border-t border-gray-600 z-50"></div>
                      <RealStateBreakdown />
                    </div>
                  )}

                  {/* Real State Popover (23/24) */}
                  {year === '23/24' && hoveredRealStateYear === '23/24' && (
                    <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in w-max">
                      {/* Triangular arrow pointing up */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#1a1a1a] rotate-45 border-l border-t border-gray-600 z-50"></div>
                      <div className="bg-[#1a1a1a] p-3 rounded-lg shadow-2xl border border-gray-700 relative font-sans text-white text-center">
                         <span className="font-bold text-xs tracking-wide"> +250 mt2 sede S.D.E y Parana</span>
                      </div>
                    </div>
                  )}

                  {/* Real State Popover (22/23) */}
                  {year === '22/23' && hoveredRealStateYear === '22/23' && (
                    <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in w-max">
                      {/* Triangular arrow pointing up */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#1a1a1a] rotate-45 border-l border-t border-gray-600 z-50"></div>
                      <div className="bg-[#1a1a1a] p-3 rounded-lg shadow-2xl border border-gray-700 relative font-sans text-white text-center">
                         <span className="font-bold text-xs tracking-wide">+1750 mt2 
                         PB y Piso 1</span>
                      </div>
                    </div>
                  )}

                  {/* Real State Popover (FOCOS 25/26) */}
                  {year === 'FOCOS 25/26' && hoveredRealStateYear === 'FOCOS 25/26' && (
                    <div className="absolute top-full mt-4 left-1/2 transform -translate-x-[85%] z-50 animate-fade-in w-max">
                      {/* Triangular arrow pointing up */}
                      <div className="absolute -top-2 left-[85%] transform -translate-x-1/2 w-4 h-4 bg-[#1a1a1a] rotate-45 border-l border-t border-gray-600 z-50"></div>
                      
                      <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-2xl border border-gray-700 relative font-sans text-white text-left w-[320px]">
                        {/* Header */}
                        <div className="mb-3 border-b border-gray-700 pb-2">
                          <span className="text-amber-500 font-bold text-xs uppercase tracking-wider block">
                            Servicios unificados a nivel regional
                          </span>
                        </div>

                        {/* Bulleted List */}
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2.5">
                            <span className="text-amber-500 text-lg leading-none mt-[-2px]">•</span>
                            <span className="text-xs text-gray-300 font-medium leading-snug">
                              Contratos y SLAs estandarizados.
                            </span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="text-amber-500 text-lg leading-none mt-[-2px]">•</span>
                            <span className="text-xs text-gray-300 font-medium leading-snug">
                              Lograr un único proveedor regional en <strong className="text-white">2 rubros clave</strong>.
                            </span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="text-emerald-400 text-lg leading-none mt-[-2px]">•</span>
                            <span className="text-xs text-gray-300 font-medium leading-snug">
                              Reducción de costos: <strong className="text-emerald-400">10%</strong>.
                            </span>
                          </li>
                        </ul>
                      </div>
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
        <div className={`grid grid-cols-[1fr,6fr] md:grid-cols-7 gap-4 items-center bg-white p-3 rounded-lg shadow-sm relative transition-all duration-200 ${hoveredFleetYear ? 'z-50' : ''}`}>
          <div className="flex items-center gap-2">
             <CarFrontIcon />
             <div className={rowHeaderClass}>AUTOMOTOR</div>
          </div>
          <div className="col-span-6 relative">
            <div className="grid grid-cols-6 gap-4 items-end">
              {dashboardData.map(({ year, fleet }) => (
                <div 
                  key={year} 
                  className={`flex flex-col items-center justify-end relative h-20 ${year === 'FOCOS 25/26' ? focosHighlightClass + ' px-1' : ''}`}
                >
                  {/* Number Value with Hover logic */}
                  <div 
                    className={`font-bold text-sm mb-1 relative z-20
                      ${interactiveFleetYears.includes(year) ? 'cursor-pointer text-blue-800 underline decoration-dotted decoration-blue-400 underline-offset-4' : 'text-gray-800'}
                    `}
                    onMouseEnter={() => interactiveFleetYears.includes(year) && setHoveredFleetYear(year)}
                    onMouseLeave={() => setHoveredFleetYear(null)}
                  >
                    {fleet.total}

                    {/* Fleet Popover (24/25) */}
                    {year === '24/25' && hoveredFleetYear === '24/25' && (
                      <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in w-max">
                         {/* Arrow pointing up (box is below) */}
                         <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#1a1a1a] rotate-45 border-l border-t border-gray-700 z-50"></div>
                         <FleetBreakdown />
                      </div>
                    )}

                    {/* Fleet Popover (22/23) */}
                    {year === '22/23' && hoveredFleetYear === '22/23' && (
                      <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in w-max">
                         {/* Arrow pointing up (box is below) */}
                         <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#1a1a1a] rotate-45 border-l border-t border-gray-700 z-50"></div>
                         <div className="bg-[#1a1a1a] p-3 rounded-lg shadow-2xl border border-gray-700 relative font-sans text-white text-center">
                            <span className="font-bold text-xs tracking-wide">Politica Auto Beneficios</span>
                         </div>
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
               <FleetLegendItem color="bg-amber-500" label="Flota Amauta" />
               <FleetLegendItem color="bg-emerald-400" label="Auto Beneficio" />
               <FleetLegendItem color="bg-slate-500" label="Flota Fyo" />
               <FleetLegendItem color="bg-gray-400" label="Amauta UY" />
            </div>
          </div>
        </div>

        {/* PRESUPUESTO - Updated hover for visibility */}
        <div className={`grid grid-cols-[1fr,6fr] md:grid-cols-7 gap-4 items-center bg-white hover:bg-gray-100 p-3 rounded-lg shadow-sm h-16 relative transition-colors duration-200 ${hoveredBudgetYear ? 'z-50' : ''}`}>
          <div className="flex items-center gap-2">
             <BanknotesIcon />
             <div className={rowHeaderClass}>PRESUPUESTO</div>
          </div>
          <div className="col-span-6 grid grid-cols-6 gap-4">
            {dashboardData.map(({ year, budget }) => (
              <div 
                key={year} 
                className={`text-center flex flex-col items-center justify-center relative ${year === 'FOCOS 25/26' ? focosHighlightClass : ''}`}
                onMouseEnter={() => interactiveBudgetYears.includes(year) && setHoveredBudgetYear(year)}
                onMouseLeave={() => setHoveredBudgetYear(null)}
              >
                 {budget.tag && <GreenTag text={budget.tag} />}
                <div 
                  className={`font-bold text-sm sm:text-base ${budget.color} mt-1.5 ${interactiveBudgetYears.includes(year) ? 'cursor-pointer underline decoration-dotted decoration-gray-400 underline-offset-4 hover:text-blue-800' : ''}`}
                >
                  {budget.value}
                </div>
                
                {/* Popover Chart for 24/25 */}
                {year === '24/25' && hoveredBudgetYear === '24/25' && (
                  <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-[85%] z-50 animate-fade-in">
                     {/* Triangular arrow pointing down, updated color to match dark chart */}
                    <div className="absolute -bottom-2 left-[85%] transform -translate-x-1/2 w-4 h-4 bg-[#1a1a1a] rotate-45 border-r border-b border-gray-700 z-50"></div>
                    <BudgetBreakdownChart />
                  </div>
                )}

                {/* Popover Card for FOCOS 25/26 (USD 1,8 M) */}
                {year === 'FOCOS 25/26' && hoveredBudgetYear === 'FOCOS 25/26' && (
                  <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-[85%] z-50 animate-fade-in w-max">
                     {/* Triangular arrow pointing down */}
                    <div className="absolute -bottom-1.5 left-[85%] transform -translate-x-1/2 w-3 h-3 bg-[#1a1a1a] rotate-45 border-r border-b border-gray-700 z-50"></div>
                    
                    {/* Unified Card with Icons (No Emojis) */}
                    <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-2xl border border-gray-700 relative font-sans text-white text-left w-[320px]">
                        {/* Header with SVG Icon */}
                        <div className="mb-3 border-b border-gray-700 pb-2 flex items-center gap-2">
                          <CurrencyIcon />
                          <span className="text-amber-500 font-bold text-xs uppercase tracking-wider block">
                            Costos y Eficiencia - Ariba SAP
                          </span>
                        </div>

                        {/* Icon List */}
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                             {/* Lupa Icon for Transparency */}
                             <div className="mt-0.5"><SearchIcon /></div>
                             <span className="text-xs text-gray-300 font-medium leading-snug">
                               Trazabilidad y transparencia end-to-end.
                             </span>
                          </li>
                          <li className="flex items-start gap-3">
                             {/* Gavel/Auction Icon */}
                             <div className="mt-0.5"><GavelIcon /></div>
                             <span className="text-xs text-gray-300 font-medium leading-snug">
                               Subastas y comparativas automáticas.
                             </span>
                          </li>
                          <li className="flex items-start gap-3">
                             {/* Trending Down Icon for Savings */}
                             <div className="mt-0.5"><TrendingDownIcon /></div>
                             <span className="text-xs text-gray-300 font-medium leading-snug">
                               Ahorros estimados: <strong className="text-emerald-400">8% – 15%</strong>.
                             </span>
                          </li>
                        </ul>
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

        {/* BENEFICIOS */}
        <div className="grid grid-cols-[1fr,6fr] md:grid-cols-7 gap-4 items-center bg-white p-3 rounded-lg shadow-sm relative z-30">
          <div className="flex flex-col gap-1.5">
             <div className="flex items-center gap-2">
                <HeartHandIcon />
                <div className={rowHeaderClass}>BENEFICIOS</div>
             </div>
             <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide ml-7">Anual x colaborador</span>
          </div>
          <div className="col-span-6 relative">
             {/* Background highlight for the last column (Focos) in Benefits row */}
             <div className="absolute inset-y-0 right-0 w-[16.66%] bg-amber-50 border-l border-amber-200 shadow-inner rounded-r-lg -z-0 pointer-events-none"></div>
             <BenefitsChart />
          </div>
        </div>

        {/* DATOS E IA - Refined Unified Row with internal separators */}
        <div className={`grid grid-cols-[1fr,6fr] md:grid-cols-7 gap-4 items-start bg-white p-3 rounded-lg shadow-sm relative transition-all duration-200 z-0`}>
          <div className="flex items-center gap-2 mt-2">
             <CpuChipIcon />
             <div className={rowHeaderClass}>DATOS E IA</div>
          </div>
          
          <div className="col-span-6 flex flex-col md:flex-row gap-4 items-start">
             {/* Tab 1 */}
             <div 
               className="flex-1 w-full relative"
               onMouseEnter={() => setActiveDataTab('automation')}
               onMouseLeave={() => setActiveDataTab(null)}
             >
                <button 
                  onClick={() => toggleDataTab('automation')}
                  className={`w-full bg-white border ${activeDataTab === 'automation' ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'} rounded-lg px-3 py-2.5 flex items-center justify-between shadow-sm transition-all group text-left cursor-pointer`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${activeDataTab === 'automation' ? 'bg-blue-500' : 'bg-gray-300 group-hover:bg-blue-400'}`}></div>
                    <span className={`text-xs sm:text-sm font-semibold ${activeDataTab === 'automation' ? 'text-blue-800' : 'text-gray-700 group-hover:text-blue-600'}`}>
                      Automatizaciones operativas
                    </span>
                  </div>
                  <div className={`transform transition-transform duration-200 ${activeDataTab === 'automation' ? 'rotate-180 text-blue-500' : 'text-gray-400'}`}>
                    <ChevronDownIcon />
                  </div>
                </button>
                {activeDataTab === 'automation' && (
                  <div className="mt-2 p-4 bg-white shadow-xl border border-gray-200 md:absolute md:top-full md:left-0 md:w-full md:z-50 rounded-lg animate-fade-in">
                      {/* Header matching image */}
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                            <span className="font-bold text-gray-800 text-sm">Automatizaciones operativas</span>
                         </div>
                         <div className="transform rotate-180 text-gray-400">
                             <ChevronDownIcon />
                         </div>
                      </div>

                      {/* List */}
                      <ul className="space-y-2 mb-4 pl-1">
                        <li className="flex items-center gap-2">
                          <CheckCircleMiniIcon />
                          <span className="text-gray-700 text-sm">Flujo de facturación</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircleMiniIcon />
                          <span className="text-gray-700 text-sm">Desayuno cumpleaños</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircleMiniIcon />
                          <span className="text-gray-700 text-sm">Reservas de salas</span>
                        </li>
                        <li className="flex items-center gap-2 pl-0.5">
                           <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mx-1"></div>
                           <span className="text-gray-500 text-sm">Alertas GPS</span>
                        </li>
                        <li className="flex items-center gap-2 pl-0.5">
                           <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mx-1"></div>
                           <span className="text-gray-500 text-sm">Reportes – Tasa de uso</span>
                        </li>
                      </ul>

                      {/* Footer */}
                      <div className="bg-emerald-50 border border-emerald-100 rounded-lg py-2 text-center">
                        <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider">
                          AHORRO: 40 HORAS MENSUALES
                        </span>
                      </div>
                  </div>
                )}
             </div>

             {/* Tab 2 */}
             <div 
               className="flex-1 w-full relative"
               onMouseEnter={() => setActiveDataTab('fleet')}
               onMouseLeave={() => setActiveDataTab(null)}
             >
                <button 
                  onClick={() => toggleDataTab('fleet')}
                  className={`w-full bg-white border ${activeDataTab === 'fleet' ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'} rounded-lg px-3 py-2.5 flex items-center justify-between shadow-sm transition-all group text-left cursor-pointer`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${activeDataTab === 'fleet' ? 'bg-blue-500' : 'bg-gray-300 group-hover:bg-blue-400'}`}></div>
                    <span className={`text-xs sm:text-sm font-semibold ${activeDataTab === 'fleet' ? 'text-blue-800' : 'text-gray-700 group-hover:text-blue-600'}`}>
                      Aplicación en Flota Corporativa
                    </span>
                  </div>
                   <div className={`transform transition-transform duration-200 ${activeDataTab === 'fleet' ? 'rotate-180 text-blue-500' : 'text-gray-400'}`}>
                    <ChevronDownIcon />
                  </div>
                </button>
                {activeDataTab === 'fleet' && (
                  <div className="mt-2 p-3 bg-gray-50 md:bg-white md:shadow-xl md:border-gray-200 md:absolute md:top-full md:left-0 md:w-full md:z-50 rounded-lg border border-gray-100 text-xs text-gray-600 space-y-2 animate-fade-in">
                      <div className="flex items-center gap-2 mb-2">
                         <DevicePhoneMobileIcon />
                         <span className="font-bold text-gray-700 uppercase tracking-wide">Gestión Digital</span>
                      </div>
                       <ul className="space-y-1.5 pl-1">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span><strong>Dashboard:</strong> Uso, reservas y destinos frecuentes.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span><strong>Check-in Digital:</strong> Registro con fotos.</span>
                        </li>
                      </ul>
                      <a 
                        href="https://reserva-autos.vercel.app/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 font-bold hover:underline mt-1 bg-blue-50 w-fit px-2 py-1 rounded"
                      >
                        App Reservas <LinkIcon />
                      </a>
                  </div>
                )}
             </div>

             {/* Tab 3 */}
             <div 
               className="flex-1 w-full relative"
               onMouseEnter={() => setActiveDataTab('ambassador')}
               onMouseLeave={() => setActiveDataTab(null)}
             >
                <button 
                  onClick={() => toggleDataTab('ambassador')}
                  className={`w-full bg-white border ${activeDataTab === 'ambassador' ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'} rounded-lg px-3 py-2.5 flex items-center justify-between shadow-sm transition-all group text-left cursor-pointer`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${activeDataTab === 'ambassador' ? 'bg-blue-500' : 'bg-gray-300 group-hover:bg-blue-400'}`}></div>
                    <span className={`text-xs sm:text-sm font-semibold ${activeDataTab === 'ambassador' ? 'text-blue-800' : 'text-gray-700 group-hover:text-blue-600'}`}>
                      Otros proyectos Embajador IA
                    </span>
                  </div>
                   <div className={`transform transition-transform duration-200 ${activeDataTab === 'ambassador' ? 'rotate-180 text-blue-500' : 'text-gray-400'}`}>
                    <ChevronDownIcon />
                  </div>
                </button>
                {activeDataTab === 'ambassador' && (
                  <div className="mt-2 p-3 bg-gray-50 md:bg-white md:shadow-xl md:border-gray-200 md:absolute md:top-full md:left-0 md:w-full md:z-50 rounded-lg border border-gray-100 text-xs text-gray-600 space-y-2 animate-fade-in">
                      <div className="flex items-center gap-2 mb-2">
                         <TargetIcon />
                         <span className="font-bold text-gray-700 uppercase tracking-wide">Estrategia & Herramientas</span>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5 mb-2">
                         <a href="https://fyo-metrics-vf.vercel.app/" target="_blank" className="block p-1.5 bg-white border border-gray-200 rounded hover:border-blue-300 transition-colors">
                            <span className="font-bold text-gray-800 block">Fyo Metrics</span>
                            <span className="text-[10px] text-blue-500 truncate">fyo-metrics-vf.vercel.app</span>
                         </a>
                         <a href="https://talent-match-ai-five.vercel.app/" target="_blank" className="block p-1.5 bg-white border border-gray-200 rounded hover:border-blue-300 transition-colors">
                            <span className="font-bold text-gray-800 block">TalentMatch AI</span>
                            <span className="text-[10px] text-blue-500 truncate">talent-match-ai.vercel.app</span>
                         </a>
                      </div>
                       <ul className="space-y-1 pl-1 border-t border-gray-100 pt-1.5">
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 font-bold">•</span>
                          <span><strong>Predictivo:</strong> Anticipa fallas (+80% precisión).</span>
                        </li>
                      </ul>
                  </div>
                )}
             </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
