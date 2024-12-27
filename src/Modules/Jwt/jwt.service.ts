import { plainToInstance } from 'class-transformer';
import { JwtDTO } from './DTOs/jwt.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ServiceResponse } from 'src/Helpers/service-response.helper';
import { IJwtRepository } from 'src/Modules/Jwt/Interfaces/i.jwt.repository';
import { IJwtService } from 'src/Modules/Jwt/Interfaces/i.jwt.service';
import { JwtEntity } from 'src/Database/Entities/jwt.entity';
import { ServiceResponseExtensions } from 'src/Helpers/response-extension';

@Injectable()
export class JwtService implements IJwtService {
  constructor(
    @Inject('IJwtRepository')
    private readonly iJwtRepository: IJwtRepository,
  ) {}

  async insertJWTToken(jwtDTO: JwtDTO): Promise<ServiceResponse<JwtDTO>> {
    const response = new ServiceResponse<any>();
    try {
      const existingJwt = await this.iJwtRepository.getJwtByUserId(
        jwtDTO.userId,
      );
      if (existingJwt) {
        const updateData: Partial<JwtEntity> = {
          value: jwtDTO.value,
          issue_date: jwtDTO.issue_date,
          expired_date: jwtDTO.expired_date,
        };
        await this.iJwtRepository.updateJwtToken(existingJwt.id, updateData);
      } else {
        const newJwt = plainToInstance(JwtEntity, jwtDTO);
        if (newJwt != null) {
          await this.iJwtRepository.insertJWTToken(newJwt);
        } else {
          throw new Error('Unable to map jwtDTO to JWT.');
        }
      }
    } catch (error) {
      ServiceResponseExtensions.setError(response, error.message);
    }
    return response;
  }

  async getJwtByUserId(userId: number): Promise<ServiceResponse<any>> {
    const response = new ServiceResponse<any>();
    try {
      const jwt = await this.iJwtRepository.getJwtByUserId(userId);
      if (jwt == null) {
        ServiceResponseExtensions.setExisting(response, 'Jwt');
        return response;
      }
      response.data = jwt;
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
