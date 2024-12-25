import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenHelper {
  constructor(private readonly jwtService: JwtService) {} // Add constructor

  async generateJwtToken(
    id: number,
    role: string,
    expire: Date,
  ): Promise<string> {
    const claims = {
      sub: id,
      role: role,
      iat: Math.floor(Date.now() / 1000),
    };

    return this.jwtService.sign(claims, {
      // Use this.jwtService instead of JwtService
      secret: process.env.JWT_SECRET,
      expiresIn: expire.getTime() - Date.now(),
      algorithm: 'HS256',
    });
  }

  async generateJwtRefreshToken(
    id: number,
    role: string,
    expire: Date,
  ): Promise<string> {
    const claims = {
      sub: id,
      role: role,
      iat: Math.floor(Date.now() / 1000),
    };

    return this.jwtService.sign(claims, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: expire.getTime() - Date.now(),
      algorithm: 'HS256',
    });
  }
}
