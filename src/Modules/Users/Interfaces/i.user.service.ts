import { ServiceResponse } from 'src/Helpers/service-response.helper';
import { GetUserDTO } from 'src/Modules/Users/DTOs/get-user.dto';

export interface IUserService {
  getCurrentAsync(id: number): Promise<ServiceResponse<GetUserDTO>>;
}
