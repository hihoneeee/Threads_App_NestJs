import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtEntity } from 'src/Database/Entities/jwt.entity';
import { IJwtRepository } from 'src/Modules/Jwt/Interfaces/i.jwt.repository';
import { Repository } from 'typeorm';

@Injectable()
export class JwtRepository implements IJwtRepository {
  constructor(
    @InjectRepository(JwtEntity)
    private readonly repository: Repository<JwtEntity>,
  ) {}

  async insertJWTToken(jwt: JwtEntity): Promise<JwtEntity> {
    return await this.repository.save({
      ...jwt,
      user: { id: jwt.userId },
    });
  }

  async getJwtByUserId(id: number): Promise<JwtEntity | null> {
    const jwt = await this.repository.findOne({
      where: { user: { id } },
    });
    return jwt;
  }

  async getJwtById(id: number): Promise<JwtEntity | null> {
    const jwt = await this.repository.findOne({
      where: { id },
    });
    return jwt;
  }

  async updateJwtToken(
    id: number,
    updateData: Partial<
      Pick<JwtEntity, 'value' | 'issue_date' | 'expired_date'>
    >,
  ): Promise<JwtEntity> {
    await this.repository.update(id, updateData);

    return await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });
  }
}
