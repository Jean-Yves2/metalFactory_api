import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginResponseDto {
  access_token: string;
  refresh_token: string;
  user: {
    firstName: string;
    lastName: string;
    userType: string;
    role: string;
  };
}
