import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class AuthRegisterDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}