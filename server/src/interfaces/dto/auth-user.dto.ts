export interface AuthUserSignUpDto {
  email: string;
  username: string;
  password: string;
}

export interface AuthUserSignInDto {
  email: string;
  password: string;
}

export interface AuthUserResponseDto {
  id: string;
}
