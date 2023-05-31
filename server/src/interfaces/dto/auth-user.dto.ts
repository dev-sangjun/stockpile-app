export interface AuthUserSignUpRequestDto {
  email: string;
  username: string;
  password: string;
}

export interface AuthUserSignInRequestDto {
  email: string;
  password: string;
}

export interface AuthUserResponseDto {
  id: string;
}

export interface AccessTokenResponseDto {
  accessToken: string;
}
