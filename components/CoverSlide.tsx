
import React from 'react';

// --- Icons ---

const CheckCircleIcon = () => (
  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const PendingCircleIcon = () => (
  <svg className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const CarIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const DeskIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const CenterIcon = () => (
  <svg className="w-12 h-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

// --- Types & Data ---

type Status = 'done' | 'pending';

interface Objective {
  text: string;
  status: Status;
}

interface PillarData {
  id: string;
  title: string;
  budget: string;
  icon: React.ReactNode;
  color: string; // Main color for the pillar
  todayMetric?: string;
  objectives: Objective[];
  subTitle?: string;
}

const pillars: PillarData[] = [
  {
    id: 'real-state',
    title: 'REAL STATE',
    budget: 'USD 853 K (37%)',
    icon: <BuildingIcon />,
    color: 'bg-cyan-500',
    todayMetric: 'HOY: 3160 m2 (317 puestos)',
    objectives: [
      { text: 'Apertura Oficina Reconquista y Villa María (+200 m2)', status: 'done' },
      { text: 'Análisis instalación paneles solares acopio', status: 'pending' },
    ]
  },
  {
    id: 'workplace',
    title: 'WORKPLACE',
    budget: 'USD 476 K (21%)',
    icon: <DeskIcon />,
    color: 'bg-blue-600',
    subTitle: 'GESTIÓN CUENTAS NUEVAS',
    objectives: [
      { text: 'Compra Hardware: Licitación con CRESUD (15-30% ahorro)', status: 'done' },
      { text: 'Automatización circuito facturación', status: 'pending' },
    ]
  },
  {
    id: 'flota',
    title: 'FLOTA AUTOMOTOR',
    budget: 'USD 113 K (5%)',
    icon: <CarIcon />,
    color: 'bg-cyan-400',
    todayMetric: 'HOY: 50 Autos',
    objectives: [
      { text: 'Inc. Amauta Plataforma Mant. Edenred (ahorro 5-10%)', status: 'done' },
      { text: 'Cotización conjunta con Agrofy', status: 'pending' },
    ]
  },
  {
    id: 'beneficios',
    title: 'BENEFICIOS',
    budget: 'USD 848 K (37%)',
    icon: <HeartIcon />,
    color: 'bg-sky-800',
    objectives: [
      { text: 'Sistema de beneficios flexibles', status: 'done' },
      { text: 'Gestión Cuentas Nuevas: Premios Fyo/Amauta', status: 'done' },
      { text: 'Merchandising Amauta', status: 'pending' },
    ]
  }
];

// --- Components ---

const PillarCard: React.FC<{ data: PillarData; quadrant: 'tl' | 'tr' | 'bl' | 'br' }> = ({ data, quadrant }) => {
  // Logic to determine alignment based on quadrant
  const isRight = quadrant === 'tr' || quadrant === 'br';
  
  return (
    <div className={`flex flex-col h-full relative p-4 md:p-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow
      ${isRight ? 'md:text-right items-end' : 'items-start'}
    `}>
      
      {/* Header: Title & Budget */}
      <div className={`flex flex-col gap-1 mb-4 w-full ${isRight ? 'md:items-end' : 'items-start'}`}>
        <div className="flex items-center gap-3 flex-wrap">
            {!isRight && <span className={`${data.color} text-white p-1.5 rounded-lg shadow-sm`}>{data.icon}</span>}
            <h2 className={`text-lg font-bold uppercase tracking-wider text-gray-700`}>{data.title}</h2>
            {isRight && <span className={`${data.color} text-white p-1.5 rounded-lg shadow-sm`}>{data.icon}</span>}
        </div>
        <span className={`inline-block px-2 py-1 text-xs font-bold text-white rounded bg-slate-600 shadow-sm mt-1`}>
          {data.budget}
        </span>
      </div>

      {/* Subtitle / Today Metric */}
      {(data.todayMetric || data.subTitle) && (
        <div className={`mb-4 pb-2 border-b border-gray-200 w-full ${isRight ? 'md:text-right' : ''}`}>
           {data.todayMetric && <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">{data.todayMetric}</p>}
           {data.subTitle && <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{data.subTitle}</p>}
        </div>
      )}

      {/* Objectives */}
      <ul className="space-y-3 w-full flex-grow">
        {data.objectives.map((obj, idx) => (
          <li key={idx} className={`flex items-start gap-3 group ${isRight ? 'md:flex-row-reverse' : ''}`}>
             {/* Status Icon */}
             <div className="mt-0.5 flex-shrink-0 transform group-hover:scale-110 transition-transform">
                {obj.status === 'done' ? <CheckCircleIcon /> : <PendingCircleIcon />}
             </div>
             <span className={`text-sm text-gray-600 font-medium leading-snug ${obj.status === 'pending' ? 'text-gray-400' : ''}`}>
               {obj.text}
             </span>
          </li>
        ))}
      </ul>

    </div>
  );
};

const CoverSlide: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto bg-white min-h-[700px] p-4 md:p-8 rounded-xl shadow-lg border border-gray-200 relative overflow-hidden">
      
      {/* Background Subtle Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent pointer-events-none" />

      {/* Central Title (Mobile) / Icon Hub (Desktop) */}
      <div className="flex md:hidden justify-center mb-6">
         <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-widest border-b-2 border-blue-500 pb-2">Estrategia Operativa</h1>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-40 h-40 bg-white rounded-full border-[6px] border-slate-50 shadow-2xl">
          <div className="flex flex-col items-center justify-center">
            <CenterIcon />
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">Focos</div>
          </div>
      </div>

      {/* Layout: 2x2 Grid with spacing for center hub */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 h-full relative z-10">
        
        {/* Top Left */}
        <div className="flex flex-col justify-end h-full">
            <PillarCard data={pillars[0]} quadrant="tl" />
        </div>

        {/* Top Right */}
        <div className="flex flex-col justify-end h-full">
            <PillarCard data={pillars[1]} quadrant="tr" />
        </div>

        {/* Bottom Left */}
        <div className="flex flex-col justify-start h-full">
             <PillarCard data={pillars[2]} quadrant="bl" />
        </div>

        {/* Bottom Right */}
        <div className="flex flex-col justify-start h-full">
             <PillarCard data={pillars[3]} quadrant="br" />
        </div>

      </div>
      
      {/* Connecting Lines (Behind cards, desktop only) */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200 -z-0 hidden md:block"></div>
      <div className="absolute top-0 left-1/2 h-full w-[1px] bg-slate-200 -z-0 hidden md:block"></div>

    </div>
  );
};

export default CoverSlide;
