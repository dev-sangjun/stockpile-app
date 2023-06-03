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
  cost: number | undefined;
  userId: string;
  stockId: string;
}
