export interface CreatePortfolioDto {
  userId: string;
  name: string;
}

export interface PortfolioPostRequestDto {
  portfolioId: string;
}

export interface AddInvestmentToPortfolioDto {
  quantity: number;
  cost: number | undefined;
  userId: string;
  stockId: string;
}
