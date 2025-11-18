
export interface FleetBreakdown {
  label: string;
  value: number;
  color: string;
}

export interface YearData {
  year: string;
  office: {
    sqm: number;
    tag?: string;
  };
  fleet: {
    total: number;
    breakdown: FleetBreakdown[];
  };
  collaborators: number;
  budget: {
    value: string;
    tag?: string;
    color: string;
  };
  ratio: {
    barValue: number;
    ratio: string;
    label: string[];
    wavy?: string[];
  };
}
