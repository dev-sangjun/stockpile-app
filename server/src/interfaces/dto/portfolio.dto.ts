export interface PortfolioPostRequestDto {
  portfolioId: string;
}

export interface AddInvestmentToPortfolioDto {
  quantity: number;
  cost: number | undefined;
  stockId: string;
}
