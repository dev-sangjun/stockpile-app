export interface User {
  id: string;
  email: string;
  username: string;
  favoriteStocks: string[];
  goalAmount: number;

  portfolios: Portfolio[];
  investments: Investment[];
  stocks: Stock[];
}

export interface UserInfo {
  id: string;
  email: string;
  username: string;
}

export interface Portfolio {
  id: string;
  investments: Investment[];
  name: string;
  userId: string;
}

export interface PortfolioDetails {
  totalValue: number;
  totalCost: number;
  investmentsCount: number;
  dayChange: number;
}

export interface Investment {
  avgCost: number;
  id: string;
  portfolioId: string;
  quantity: number;
  stockId: string;
  userId: string;
}

export interface InvestmentDetails {
  curPrice: number;
  totalValue: number;
  totalCost: number;
  quantity: number;
  dayChange: number;
}

export interface Investments {
  [key: string]: Investment;
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
  updatedAt: Date;
}

export interface Stocks {
  [key: string]: Stock; // key: stock symbol, value: price
}

export interface Company {
  id: string;
  logo: string;
  name: string;
}

export type EntityType = "PORTFOLIO" | "INVESTMENT";
