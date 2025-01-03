import { IUserService } from 'src/Modules/Users/Interfaces/i.user.service';
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/Modules/Users/Interfaces/i.user.repository';
import { ServiceResponse } from 'src/Helpers/service-response.helper';
import { ServiceResponseExtensions } from 'src/Helpers/response-extension';
import { GetUserDTO } from 'src/Modules/Users/DTOs/get-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly iUserRepository: IUserRepository,
  ) {}

  async getCurrentAsync(id: number): Promise<ServiceResponse<GetUserDTO>> {
    const response = new ServiceResponse<GetUserDTO>();

    try {
      const existingUser = await this.iUserRepository.getUserById(id);
      if (existingUser == null) {
        ServiceResponseExtensions.setNotFound(
          response,
          'Không tìm thấy người này!',
        );
        return response;
      }

      const userDtoInstance = plainToInstance(GetUserDTO, existingUser, {
        excludeExtraneousValues: true,
      });

      response.data = userDtoInstance;
      ServiceResponseExtensions.setSuccess(
        response,
        'Lấy thông tin thành công!',
      );
    } catch (error) {
      ServiceResponseExtensions.setError(response, error.message);
    }

    return response;
  }
}
