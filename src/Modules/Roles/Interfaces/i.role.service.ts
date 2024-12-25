import { ServiceResponse } from 'src/Helpers/service-response.helper';
import { GetRoleDTO } from 'src/Modules/Roles/DTOs/get-role.dto';

export interface IRoleService {
  getRoleById(id: number): Promise<ServiceResponse<GetRoleDTO>>;
}
