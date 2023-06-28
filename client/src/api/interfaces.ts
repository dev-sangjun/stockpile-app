// common
export interface OperationResponseDto {
  success: boolean;
  message?: string;
}

// auth
export interface SignUpUserDto {
  username: string;
  email: string;
  password: string;
}

export interface SignInUserDto {
  email: string;
  password: string;
}

// investment
export interface AddInvestmentToPortfolioDto {
  stockId: string;
  quantity: number;
  cost: number | undefined;
}

export interface UpdateInvestmentDto {
  quantity?: number;
  avgCost?: number;
}
