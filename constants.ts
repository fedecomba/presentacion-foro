import { YearData } from './types';

export const dashboardData: YearData[] = [
  {
    year: '20/21',
    office: { sqm: 1160 },
    fleet: {
      total: 21,
      breakdown: [
        { label: 'AMAUTA ARG', value: 11, color: 'bg-purple-600' },
        { label: 'FYO', value: 10, color: 'bg-cyan-400' },
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
        { label: 'KINTOO', value: 2, color: 'bg-teal-700' },
        { label: 'AMAUTA UY', value: 3, color: 'bg-lime-400' },
        { label: 'AMAUTA ARG', value: 15, color: 'bg-purple-600' },
        { label: 'FYO', value: 12, color: 'bg-cyan-400' },
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
        { label: 'KINTOO', value: 3, color: 'bg-teal-700' },
        { label: 'AMAUTA UY', value: 4, color: 'bg-lime-400' },
        { label: 'AMAUTA ARG', value: 24, color: 'bg-purple-600' },
        { label: 'FYO', value: 15, color: 'bg-cyan-400' },
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
        { label: 'KINTOO', value: 3, color: 'bg-teal-700' },
        { label: 'AMAUTA UY', value: 5, color: 'bg-lime-400' },
        { label: 'AMAUTA ARG', value: 25, color: 'bg-purple-600' },
        { label: 'FYO', value: 16, color: 'bg-cyan-400' },
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
        { label: 'KINTOO', value: 3, color: 'bg-teal-700' },
        { label: 'AMAUTA UY', value: 5, color: 'bg-lime-400' },
        { label: 'AMAUTA ARG', value: 24, color: 'bg-purple-600' },
        { label: 'FYO', value: 16, color: 'bg-cyan-400' },
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
    year: 'P.Y. 25/26',
    office: { sqm: 3265, tag: '¿ Bs. As ?' },
    fleet: {
      total: 48,
      breakdown: [
        { label: 'KINTOO', value: 2, color: 'bg-teal-700' },
        { label: 'AMAUTA UY', value: 4, color: 'bg-lime-400' },
        { label: 'AMAUTA ARG', value: 22, color: 'bg-purple-600' },
        { label: 'FYO', value: 20, color: 'bg-cyan-400' },
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