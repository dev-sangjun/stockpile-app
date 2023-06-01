export interface Portfolio {
  id: string;
  investments: Investment[];
  name: string;
  userId: string;
}

export interface Investment {
  avgCost: number;
  id: string;
  portfolioId: string;
  quantity: number;
  stockId: string;
  userId: string;
}

export interface Stock {
  c: number;
  company: Company;
  companyId: string;
  d: number;
  dp: number;
  h: number;
  id: string;
  l: number;
  pc: number;
  updated_at: Date;
}

export interface Company {
  id: string;
  logo: string;
  name: string;
}
