import { plainToInstance } from 'class-transformer';
import { Inject, Injectable } from '@nestjs/common';
import { ServiceResponse } from 'src/Helpers/service-response.helper';
import { ServiceResponseExtensions } from 'src/Helpers/response-extension';
import { GetRoleDTO } from 'src/Modules/Roles/DTOs/get-role.dto';
import { IRoleRepository } from 'src/Modules/Roles/Interfaces/i.role.repository';
import { IRoleService } from 'src/Modules/Roles/Interfaces/i.role.service';

@Injectable()
export class RoleService implements IRoleService {
  constructor(
    @Inject('IRoleRepository')
    private readonly iRoleRepository: IRoleRepository,
  ) {}

  async getRoleById(id: number): Promise<ServiceResponse<GetRoleDTO>> {
    const response = new ServiceResponse<any>();

    try {
      const role = await this.iRoleRepository.getRoleById(id);
      response.data = plainToInstance(GetRoleDTO, role);
      ServiceResponseExtensions.setSuccess(response, 'Lấy vai trò thành công!');
    } catch (error) {
      ServiceResponseExtensions.setError(response, error.message);
    }

    return response;
  }
}
