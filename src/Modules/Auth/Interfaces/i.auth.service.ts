import { ServiceResponse } from 'src/Helpers/service-response.helper';
import { AuthLoginDTO } from 'src/Modules/Auth/DTOs/auth-login.dto';
import { AuthRegisterDTO } from 'src/Modules/Auth/DTOs/auth-register.dto';
import { Response } from 'express';

export interface IAuthService {
  register(authRegisterDTO: AuthRegisterDTO): Promise<ServiceResponse<any>>;
  login(
    authLoginDTO: AuthLoginDTO,
    res: Response,
  ): Promise<ServiceResponse<any>>;
}
