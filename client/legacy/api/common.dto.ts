export interface OperationResponseDto {
  success: boolean;
  message?: string;
}

export interface AddInvestmentToPortfolioDto {
  quantity: number;
  cost: number | undefined;
  stockId: string;
}

export interface DeleteInvestmentFromPortfolioDto {
  portfolioId: string;
  investmentId: string;
}

export interface UpdateInvestmentDto {
  quantity?: number;
  avgCost?: number;
}
