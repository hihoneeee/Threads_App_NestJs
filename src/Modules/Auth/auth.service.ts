import { IJwtService } from 'src/Modules/Jwt/Interfaces/i.jwt.service';
import { AuthLoginDTO } from './DTOs/auth-login.dto';
import { Inject, Injectable, Res } from '@nestjs/common';
import { ServiceResponse } from 'src/Helpers/service-response.helper';
import { ServiceResponseExtensions } from 'src/Helpers/response-extension';
import { IUserRepository } from 'src/Modules/Users/Interfaces/i.user.repository';
import { AuthRegisterDTO } from './DTOs/auth-register.dto';
import { UserEntity } from 'src/Database/Entities/user.entity';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { IAuthService } from 'src/Modules/Auth/Interfaces/i.auth.service';
import { JwtTokenHelper } from 'src/Helpers/token.helper';
import { IRoleRepository } from 'src/Modules/Roles/Interfaces/i.role.repository';
import { JwtDTO } from 'src/Modules/Jwt/DTOs/jwt.dto';
import { Response } from 'express';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserRepository')
    private readonly iUserRepository: IUserRepository,
    @Inject('IRoleRepository')
    private readonly iRoleRepository: IRoleRepository,
    @Inject('IJwtService')
    private readonly iJwtService: IJwtService,
    private readonly jwtTokenHelper: JwtTokenHelper,
  ) {}
  async register(
    authRegisterDTO: AuthRegisterDTO,
  ): Promise<ServiceResponse<any>> {
    const response = new ServiceResponse<any>();

    try {
      const existingUser = await this.iUserRepository.getByEmail(
        authRegisterDTO.email,
      );
      if (existingUser) {
        ServiceResponseExtensions.setExisting(response, 'Email');
        return response;
      }

      const newUser = plainToInstance(UserEntity, authRegisterDTO);
      newUser.password = await bcrypt.hash(authRegisterDTO.password, 10);
      await this.iUserRepository.createUser(newUser);

      ServiceResponseExtensions.setSuccess(
        response,
        'Tạo tài khoản thành công!',
      );
    } catch (error) {
      ServiceResponseExtensions.setError(response, error.message);
    }

    return response;
  }

  async login(
    authLoginDTO: AuthLoginDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ServiceResponse<any>> {
    const response = new ServiceResponse<any>();
    const existingUser = await this.iUserRepository.getByEmail(
      authLoginDTO.email,
    );

    if (!existingUser) {
      ServiceResponseExtensions.setNotFound(response, 'Email');
      return response;
    }

    const isPasswordValid = await bcrypt.compare(
      authLoginDTO.password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      ServiceResponseExtensions.setUnauthorized(
        response,
        'Mật khẩu không chính xác!',
      );
      return response;
    }

    const role = await this.iRoleRepository.getRoleById(existingUser.role.id);
    const refreshTokenExpiry = new Date(Date.now() + 604800000);
    const accessToken = await this.jwtTokenHelper.generateJwtToken(
      existingUser.id,
      role.value,
      new Date(Date.now() + 3600000),
    );
    const refreshToken = await this.jwtTokenHelper.generateJwtRefreshToken(
      existingUser.id,
      role.value,
      refreshTokenExpiry,
    );

    const jwtDto: JwtDTO = {
      userId: existingUser.id,
      value: refreshToken,
      issue_date: new Date(),
      expired_date: new Date(Date.now() + 604800000),
    };

    await this.iJwtService.insertJWTToken(jwtDto);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: refreshTokenExpiry.getTime() - Date.now(),
    });

    response.accessToken = accessToken;
    ServiceResponseExtensions.setSuccess(response, 'Đăng nhập thành công!');
    return response;
  }
}
