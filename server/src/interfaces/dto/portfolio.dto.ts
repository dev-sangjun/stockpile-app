export interface PortfolioGetRequestDto {
  userId: string;
}

export interface PortfolioCreateRequestDto {
  userId: string;
  name: string;
}

export interface PortfolioPostRequestDto {
  portfolioId: string;
}

export interface InvestmentAddRequestDto {
  quantity: number;
  cost: number;
  userId: string;
  stockId: string;
}
