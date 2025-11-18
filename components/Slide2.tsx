import React from 'react';

const GrowthIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const TeamIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ComplexityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.002l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
);

const ListItem: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({ icon, children }) => (
  <li className="flex items-start">
    <span className="mr-3 mt-1 flex-shrink-0">{icon}</span>
    <span className="text-gray-700">{children}</span>
  </li>
);

const Slide2: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto bg-gray-50 p-4 sm:p-8 rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">Eficiencia operativa con datos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Column 1: Growth */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col">
          <ul className="space-y-3">
            <ListItem icon={<GrowthIcon />}>M² de Oficina: <strong>+181%</strong> (1.160 → 3.265)</ListItem>
            <ListItem icon={<GrowthIcon />}>Flota de Autos: <strong>+128%</strong> (21 → 48)</ListItem>
            <ListItem icon={<GrowthIcon />}>Presupuesto Admin: <strong>+365%</strong> (USD 430K → 2M)</ListItem>
            <ListItem icon={<TeamIcon />}>Dotación Empresa: <strong>+40%</strong> (279 → 391)</ListItem>
            <ListItem icon={<TeamIcon />}>Equipo OM: <strong>3 → 5 personas</strong></ListItem>
            <ListItem icon={<GrowthIcon />}>La relación OM/Nómina se mantuvo entre <strong>1,1% y 1,3%</strong>, sin desbordarse.</ListItem>
          </ul>
          <div className="flex-grow"></div>
          <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center">
            <p className="text-indigo-800 font-bold italic">“No crecimos en una sola dimensión: crecimos en todas al mismo tiempo. La operación se volvió mucho más grande y compleja sin que el equipo creciera en la misma proporción.”</p>
          </div>
        </div>

        {/* Column 2: Complexity */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col">
          <ul className="space-y-3">
            <ListItem icon={<ComplexityIcon />}>Más sedes (PB/Piso 1, SDE, Paraná, Villa María y posible nueva sede Bs As).</ListItem>
            <ListItem icon={<ComplexityIcon />}>Flota más heterogénea, con más autos, más talleres y más gestiones por siniestros, seguros y mantenimiento.</ListItem>
            <ListItem icon={<ComplexityIcon />}>Beneficios más amplios y con mayor necesidad de seguimiento.</ListItem>
          </ul>
          <div className="flex-grow"></div>
          <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center">
            <p className="text-indigo-800 font-bold italic">“No solo administramos más cosas, sino cosas más complejas: Cada año agregamos nuevos servicios, nuevas sedes y más proveedores, y seguimos operando con la misma estructura.”</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Slide2;