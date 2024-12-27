import { IsJWT, IsNotEmpty } from 'class-validator';

export class AuthRefreshToken {
  @IsNotEmpty({ message: 'Token không được để trống' })
  @IsJWT({ message: 'Token không đúng định dạng' })
  token: string;
}
