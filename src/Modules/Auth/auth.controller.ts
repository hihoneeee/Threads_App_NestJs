import { Controller, Post, Body, Inject, HttpStatus } from '@nestjs/common';
import { AuthRegisterDTO } from './DTOs/auth-register.dto';
import { IAuthService } from 'src/Modules/Auth/Interfaces/i.auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
  ) {}

  @Post('register')
  async register(@Body() authRegisterDTO: AuthRegisterDTO) {
    const serviceResponse = await this.authService.register(authRegisterDTO);

    if (serviceResponse.success) {
      return {
        success: serviceResponse.success,
        message: serviceResponse.message,
        data: serviceResponse.data,
      };
    } else {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        success: serviceResponse.success,
        message: serviceResponse.message,
      };
    }
  }
}
