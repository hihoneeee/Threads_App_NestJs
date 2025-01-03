import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenHelper {
  constructor(private readonly jwtService: JwtService) {} // Add constructor

  async generateJwtAccessToken(
    id: number,
    role: string,
    expire: Date,
  ): Promise<string> {
    const claims = {
      sub: id,
      role: role,
      iat: Math.floor(Date.now() / 1000),
    };

    const expiresIn = Math.floor((expire.getTime() - Date.now()) / 1000);
    return this.jwtService.sign(claims, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn,
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

    const expiresIn = Math.floor((expire.getTime() - Date.now()) / 1000);
    return this.jwtService.sign(claims, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn,
      algorithm: 'HS256',
    });
  }

  isRefreshTokenValid(token: string): boolean {
    try {
      const trimmedToken = token.trim();
      this.jwtService.verify(trimmedToken, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      });
      return true;
    } catch (error) {
      console.error('Lỗi khi kiểm tra token:', error.message);
      return false;
    }
  }

  getTokenPayload(
    type: 'access' | 'refresh',
    token: string,
  ): { type: string; sub: number; role: string } {
    try {
      const trimmedToken = token.replace('Bearer ', '').trim();
      let decodedToken: any;

      if (type === 'access') {
        decodedToken = this.jwtService.verify(trimmedToken, {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        });
      } else if (type === 'refresh') {
        decodedToken = this.jwtService.verify(trimmedToken, {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        });
      } else {
        throw new Error('Invalid token type');
      }

      return {
        type,
        sub: decodedToken?.sub ? Number(decodedToken.sub) : 0,
        role: decodedToken?.role || '',
      };
    } catch (error) {
      console.error('Error decoding token:', error.message);
      return { type, sub: 0, role: '' };
    }
  }
}
