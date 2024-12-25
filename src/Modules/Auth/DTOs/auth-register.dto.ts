import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsEnum,
  IsDefined,
} from 'class-validator';

export class AuthRegisterDTO {
  role_id?: number = 1;

  @IsNotEmpty({ message: 'Username không được để trống' })
  userName: string;

  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email: string;

  @IsNotEmpty({ message: 'Password không được để trống' })
  @MinLength(6, { message: 'Password phải có ít nhất 6 ký tự' })
  password: string;

  @IsDefined({ message: 'Trường sex là bắt buộc' })
  @IsNotEmpty({ message: 'Giới tính không được để trống' })
  @IsEnum(['male', 'female', 'other'], {
    message: 'Giới tính phải là một trong các giá trị: male, female, other',
  })
  sex: 'male' | 'female' | 'other';
}
