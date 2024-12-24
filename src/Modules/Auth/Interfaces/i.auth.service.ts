import { ServiceResponse } from 'src/Helpers/service-response.helper';
import { AuthRegisterDTO } from 'src/Modules/Auth/DTOs/auth-register.dto';

export interface IAuthService {
  register(authRegisterDTO: AuthRegisterDTO): Promise<ServiceResponse<any>>;
}
