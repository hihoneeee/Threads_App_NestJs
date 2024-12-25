import { ServiceResponse } from 'src/Helpers/service-response.helper';
import { JwtDTO } from './../DTOs/jwt.dto';
export interface IJwtService {
  insertJWTToken(jwtDTO: JwtDTO): Promise<ServiceResponse<JwtDTO>>;
}
