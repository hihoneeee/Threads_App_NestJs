import { JwtEntity } from 'src/Database/Entities/jwt.entity';

export interface IJwtRepository {
  insertJWTToken(jwt: JwtEntity): Promise<JwtEntity>;
  getJwtByUserId(id: number): Promise<JwtEntity | null>;
  updateJwtToken(
    id: number,
    updateData: Partial<
      Pick<JwtEntity, 'value' | 'issue_date' | 'expired_date'>
    >,
  ): Promise<JwtEntity>;
  getJwtById(id: number): Promise<JwtEntity | null>;
}
