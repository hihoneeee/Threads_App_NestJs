import { Inject, Injectable } from '@nestjs/common';
import { ServiceResponse } from 'src/Helpers/service-response.helper';
import { ServiceResponseExtensions } from 'src/Helpers/response-extension';
import { IUserRepository } from 'src/Modules/Users/Interfaces/i.user.repository';
import { AuthRegisterDTO } from './DTOs/auth-register.dto';
import { UserEntity } from 'src/Database/Entities/user.entity';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { IAuthService } from 'src/Modules/Auth/Interfaces/i.auth.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async register(
    authRegisterDTO: AuthRegisterDTO,
  ): Promise<ServiceResponse<any>> {
    const response = new ServiceResponse<any>();

    try {
      const existingUser = await this.userRepository.getByEmail(
        authRegisterDTO.email,
      );
      if (existingUser) {
        ServiceResponseExtensions.setExisting(response, 'Email');
        return response;
      }

      const newUser = plainToInstance(UserEntity, authRegisterDTO);
      newUser.password = await bcrypt.hash(authRegisterDTO.password, 10);

      await this.userRepository.createUser(newUser);

      ServiceResponseExtensions.setSuccess(
        response,
        'User registered successfully!',
      );
      response.data = newUser;
    } catch (error) {
      ServiceResponseExtensions.setError(response, error.message);
    }

    return response;
  }
}
