import React, { useState } from 'react';
import { dashboardData } from '../constants';
import RatioChart from './RatioChart';
import BudgetBreakdownChart from './BudgetBreakdownChart';

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

  return (
    <div className="w-full max-w-7xl mx-auto bg-gray-50 p-4 sm:p-6 md:pr-48 rounded-xl shadow-lg border border-gray-200 relative">
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
          <div className="font-bold text-gray-700 text-sm">Mt.2 OFICINA</div>
          <div className="col-span-6 grid grid-cols-6 gap-4 items-start">
            {dashboardData.map(({ year, office }) => (
              <div key={year} className="flex flex-col items-center justify-end h-16">
                 {office.tag && <GreenTag text={office.tag} />}
                <div className="font-bold text-gray-800 text-sm mt-1">{office.sqm}</div>
                {/* Reverted to original rectangular style */}
                <div className="w-full bg-gray-200 rounded h-2 mt-2">
                  <div className="bg-blue-900 h-2 rounded" style={{ width: `${(office.sqm / maxOfficeSqm) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FLOTA AUTOS */}
        <div className="grid grid-cols-[1fr,6fr] md:grid-cols-7 gap-4 items-center bg-white p-3 rounded-lg shadow-sm relative">
          <div className="font-bold text-gray-700 text-sm">FLOTA AUTOS</div>
          <div className="col-span-6 relative">
            <div className="grid grid-cols-6 gap-4 items-end">
              {dashboardData.map(({ year, fleet }) => (
                <div key={year} className="flex flex-col items-center relative h-20">
                  <div className="font-bold text-gray-800 text-sm mb-1">{fleet.total}</div>
                  {/* Stacked bars */}
                  <div className="w-10 bg-gray-200 flex flex-col rounded-t overflow-hidden" style={{ height: `${(fleet.total / maxFleet) * 100}%`}}>
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
               <FleetLegendItem color="bg-teal-700" label="KINTOO" />
               <FleetLegendItem color="bg-lime-400" label="AMAUTA UY" />
               <FleetLegendItem color="bg-purple-600" label="AMAUTA ARG" />
               <FleetLegendItem color="bg-cyan-400" label="FYO" />
            </div>
          </div>
        </div>

        {/* COLABORADORES */}
        <div className="grid grid-cols-[1fr,6fr] md:grid-cols-7 gap-4 items-center bg-white p-3 rounded-lg shadow-sm h-12">
          <div className="font-bold text-gray-700 text-sm">COLABORADORES</div>
          <div className="col-span-6 grid grid-cols-6 gap-4">
            {dashboardData.map(({ year, collaborators }) => (
              <div key={year} className="text-center font-bold text-gray-800 text-sm sm:text-base">{collaborators}</div>
            ))}
          </div>
        </div>
        
        {/* PRESUPUESTO */}
        <div className="grid grid-cols-[1fr,6fr] md:grid-cols-7 gap-4 items-center bg-white p-3 rounded-lg shadow-sm h-16 relative">
          <div className="font-bold text-gray-700 text-sm">PRESUPUESTO</div>
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
      </div>

      {/* Ratio Chart */}
      <div className="mt-8">
        <RatioChart />
      </div>

    </div>
  );
};

export default Dashboard;