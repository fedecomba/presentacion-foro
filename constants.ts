import { YearData } from './types';

export const dashboardData: YearData[] = [
  {
    year: '20/21',
    office: { sqm: 1160 },
    fleet: {
      total: 24,
      breakdown: [
        { label: 'Amauta UY', value: 2, color: 'bg-gray-400' },
        { label: 'Fyo', value: 5, color: 'bg-slate-500' },
        { label: 'Auto Beneficio', value: 5, color: 'bg-emerald-400' },
        { label: 'Amauta', value: 12, color: 'bg-amber-500' },
      ],
    },
    collaborators: 279,
    budget: { value: 'USD 430 K', color: 'text-gray-700' },
    ratio: {
      barValue: 3,
      ratio: '1,1%',
      label: ['Of. Manager', 'Recepcion x 2'],
      wavy: ['Recepcion x 2']
    },
  },
  {
    year: '21/22',
    office: { sqm: 1160 },
    fleet: {
      total: 32,
      breakdown: [
        { label: 'Amauta UY', value: 3, color: 'bg-gray-400' },
        { label: 'Fyo', value: 8, color: 'bg-slate-500' },
        { label: 'Auto Beneficio', value: 5, color: 'bg-emerald-400' },
        { label: 'Amauta', value: 16, color: 'bg-amber-500' },
      ],
    },
    collaborators: 320,
    budget: { value: 'USD 688 K', color: 'text-gray-700' },
    ratio: {
      barValue: 3,
      ratio: '0,9%',
      label: ['Of. Manager', 'Recepcion x 2'],
      wavy: ['Recepcion x 2']
    },
  },
  {
    year: '22/23',
    office: { sqm: 2910, tag: '+ PB +Piso 1' },
    fleet: {
      total: 46,
      breakdown: [
        { label: 'Amauta UY', value: 4, color: 'bg-gray-400' },
        { label: 'Fyo', value: 9, color: 'bg-slate-500' },
        { label: 'Auto Beneficio', value: 11, color: 'bg-emerald-400' },
        { label: 'Amauta', value: 22, color: 'bg-amber-500' },
      ],
    },
    collaborators: 353,
    budget: { value: 'USD 1,3 M', color: 'text-gray-700' },
    ratio: {
      barValue: 5,
      ratio: '1,4%',
      label: ['+ Lider OM', '+ Asist. Oficina', 'Recepcion x2'],
      wavy: ['Recepcion x2']
    },
  },
  {
    year: '23/24',
    office: { sqm: 3160, tag: '+ SDE + PARANÁ' },
    fleet: {
      total: 49,
      breakdown: [
        { label: 'Amauta UY', value: 4, color: 'bg-gray-400' },
        { label: 'Fyo', value: 9, color: 'bg-slate-500' },
        { label: 'Auto Beneficio', value: 12, color: 'bg-emerald-400' },
        { label: 'Amauta', value: 24, color: 'bg-amber-500' },
      ],
    },
    collaborators: 383,
    budget: { value: 'USD 1,7 M', color: 'text-gray-700' },
    ratio: {
      barValue: 6,
      ratio: '1,6%',
      label: ['+ A. Compras'],
      wavy: ['A. Compras']
    },
  },
  {
    year: '24/25',
    office: { sqm: 3265, tag: '+ V. Maria' },
    fleet: {
      total: 48,
      breakdown: [
        { label: 'Amauta UY', value: 3, color: 'bg-gray-400' },
        { label: 'Fyo', value: 9, color: 'bg-slate-500' },
        { label: 'Auto Beneficio', value: 12, color: 'bg-emerald-400' },
        { label: 'Amauta', value: 24, color: 'bg-amber-500' },
      ],
    },
    collaborators: 400,
    budget: { value: 'USD 2 M', color: 'text-gray-700' },
    ratio: {
      barValue: 5,
      ratio: '1,3%',
      label: ['Salida 1 Recep.'],
      wavy: ['Salida 1 Recep.']
    },
  },
  {
    year: 'FOCOS 25/26',
    office: { sqm: 3265, tag: '¿ Bs. As ?' },
    fleet: {
      total: 48,
      breakdown: [
        { label: 'Amauta UY', value: 3, color: 'bg-gray-400' },
        { label: 'Fyo', value: 9, color: 'bg-slate-500' },
        { label: 'Auto Beneficio', value: 12, color: 'bg-emerald-400' },
        { label: 'Amauta', value: 24, color: 'bg-amber-500' },
      ],
    },
    collaborators: 400,
    budget: { value: 'USD 1,8 M', color: 'text-gray-700' },
    ratio: {
      barValue: 5,
      ratio: '1,3%',
      label: ['+ Asis. Directores', '- Recep. x1'],
      wavy: ['Asis. Directores', 'Recep. x1']
    },
  },
];