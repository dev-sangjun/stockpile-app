// common
export interface OperationResponseDto {
  success: boolean;
  message?: string;
}

// auth
export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

export interface SignInUserDto {
  email: string;
  password: string;
}
