
import React from 'react';

const CostIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ExperienceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const DataIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const SectionCard: React.FC<{ title: string; icon: React.ReactNode; colorClass: string; children: React.ReactNode }> = ({ title, icon, colorClass, children }) => (
  <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
    <div className={`${colorClass} p-4 flex items-center space-x-3 border-b border-gray-100`}>
      <div className="bg-white p-2 rounded-lg shadow-sm ring-1 ring-black/5">
        {icon}
      </div>
      <h2 className="text-lg font-bold text-gray-800 leading-tight">{title}</h2>
    </div>
    <div className="p-5 flex-grow flex flex-col gap-6">
      {children}
    </div>
  </div>
);

const Objective: React.FC<{ title: string; items: React.ReactNode[] }> = ({ title, items }) => (
  <div className="flex flex-col">
    <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3 border-l-4 border-gray-300 pl-3 py-0.5 bg-gray-50 rounded-r line-clamp-2 leading-relaxed">
      {title}
    </h3>
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start text-sm text-gray-600 group">
            <span className="mr-2 text-gray-400 text-[10px] mt-1.5 group-hover:text-gray-600 transition-colors">●</span>
            <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Slide3: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto bg-gray-50 p-4 sm:p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Focos OM y Compras 2026</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-stretch">
        
        {/* A) Costos y Eficiencia */}
        <SectionCard title="Costos y Eficiencia" icon={<CostIcon />} colorClass="bg-green-50">
          <Objective 
            title="Compras digitales con Ariba SAP" 
            items={[
              "Trazabilidad y transparencia end-to-end.",
              "Subastas y comparativas automáticas.",
              <>Ahorros estimados: <strong>8%–15%</strong>.</>
            ]} 
          />
          <div className="border-t border-dashed border-gray-200"></div>
          <Objective 
            title="Servicios unificados a nivel regional" 
            items={[
              "Contratos y SLAs estandarizados.",
              <>Lograr un único proveedor regional en <strong>2 rubros clave</strong>.</>,
              <>Reducción de costos: <strong>10%</strong>.</>
            ]} 
          />
        </SectionCard>

        {/* B) Experiencia, Espacios y Movilidad */}
        <SectionCard title="Experiencia y Espacios" icon={<ExperienceIcon />} colorClass="bg-purple-50">
          <Objective 
            title="Sistema de beneficios flexibles" 
            items={[
              <>Alcanzar una tasa de adopción superior al <strong>80%</strong>.</>,
              <>Medir satisfacción de usuarios y obtener <strong>+4/5</strong> en la encuesta anual.</>
            ]} 
          />
          <div className="border-t border-dashed border-gray-200"></div>
          <Objective 
            title="Homogeneizar modelo de servicio" 
            items={[
              "Implementar el modelo en las tres sedes principales.",
              <>Reducir reclamos y tickets operativos en <strong>20%</strong>.</>
            ]} 
          />
        </SectionCard>

        {/* C) Datos e Inteligencia Artificial */}
        <SectionCard title="Datos e IA" icon={<DataIcon />} colorClass="bg-blue-50">
          <Objective 
            title="Aplicación en Flota Corporativa" 
            items={[
              <>Predictivo: Modelo que anticipe fallas y mantenimientos con <strong>+80% de precisión</strong>.</>,
              "Gestión: Dashboard mensual con uso, km, costos, siniestros, mantenimientos y alertas."
            ]} 
          />
          <div className="border-t border-dashed border-gray-200"></div>
          <Objective 
            title="Automatización Operativa" 
            items={[
              <>Procesos: Automatizar <strong>5 flujos clave</strong> (cadetería, desayunos, alertas, reservas, reportes).</>,
              <>Impacto: Liberar <strong>+50 horas mensuales</strong> del equipo.</>
            ]} 
          />
        </SectionCard>

      </div>
    </div>
  );
};

export default Slide3;
