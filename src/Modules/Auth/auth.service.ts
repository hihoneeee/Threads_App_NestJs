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
    try {
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
      const accessExpire = 60 * 60 * 1000;
      const refreshExpire = 7 * 24 * 60 * 60 * 1000;
      const accessToken = await this.jwtTokenHelper.generateJwtToken(
        existingUser.id,
        role.value,
        new Date(Date.now() + accessExpire),
      );
      const refreshToken = await this.jwtTokenHelper.generateJwtToken(
        existingUser.id,
        role.value,
        new Date(Date.now() + refreshExpire),
      );

      const jwtDto: JwtDTO = {
        userId: existingUser.id,
        value: refreshToken,
        issue_date: new Date(),
        expired_date: new Date(Date.now() + refreshExpire),
      };

      await this.iJwtService.insertJWTToken(jwtDto);
      res.cookie('threads_access_token', accessToken, {
        httpOnly: true,
        maxAge: accessExpire,
      });
      res.cookie('threads_refresh_token', refreshToken, {
        httpOnly: true,
        maxAge: refreshExpire,
      });
      ServiceResponseExtensions.setSuccess(response, 'Đăng nhập thành công!');
    } catch (error) {
      ServiceResponseExtensions.setError(response, error.message);
    }
    return response;
  }

  async refreshToken(
    refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ServiceResponse<any>> {
    const response = new ServiceResponse();
    try {
      const checkTokenValid =
        await this.jwtTokenHelper.isTokenValid(refreshToken);
      if (checkTokenValid == false) {
        ServiceResponseExtensions.setUnauthorized(
          response,
          'Token không hợp lệ!',
        );
        return response;
      }

      const getUserIdFromToken =
        this.jwtTokenHelper.getTokenPayload(refreshToken);

      const getJwtById = await this.iJwtService.getJwtByUserId(
        getUserIdFromToken.sub,
      );

      if (getJwtById.data.expired_date <= Date.now()) {
        ServiceResponseExtensions.setUnauthorized(
          response,
          'Thời gian đã hết hãy đăng nhập lại!',
        );
        return response;
      }
      const accessExpire = 60 * 60 * 1000;
      const accessToken = await this.jwtTokenHelper.generateJwtToken(
        getUserIdFromToken.sub,
        getUserIdFromToken.role,
        new Date(Date.now() + accessExpire),
      );
      res.cookie('threads_access_token', accessToken, {
        httpOnly: true,
        maxAge: accessExpire,
      });
      ServiceResponseExtensions.setSuccess(
        response,
        'Access token được cấp mới!',
      );
    } catch (error) {
      ServiceResponseExtensions.setError(response, error.message);
    }
    return response;
  }
}
