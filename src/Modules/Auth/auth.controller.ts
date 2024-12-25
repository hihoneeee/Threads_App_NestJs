import {
  Controller,
  Post,
  Body,
  Inject,
  HttpStatus,
  HttpException,
  Res,
} from '@nestjs/common';
import { AuthRegisterDTO } from './DTOs/auth-register.dto';
import { IAuthService } from 'src/Modules/Auth/Interfaces/i.auth.service';
import { AuthLoginDTO } from 'src/Modules/Auth/DTOs/auth-login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
  ) {}

  @Post('register')
  async register(@Body() authRegisterDTO: AuthRegisterDTO) {
    const serviceResponse = await this.authService.register(authRegisterDTO);

    if (serviceResponse.statusCode == HttpStatus.OK) {
      return {
        success: serviceResponse.success,
        message: serviceResponse.message,
      };
    } else {
      throw new HttpException(
        {
          success: false,
          message: serviceResponse.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  async login(@Body() authLoginDTO: AuthLoginDTO, @Res() res: Response) {
    const serviceResponse = await this.authService.login(authLoginDTO, res);

    if (serviceResponse.statusCode == HttpStatus.OK) {
      return {
        success: serviceResponse.success,
        message: serviceResponse.message,
      };
    } else {
      throw new HttpException(
        {
          success: false,
          message: serviceResponse.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
