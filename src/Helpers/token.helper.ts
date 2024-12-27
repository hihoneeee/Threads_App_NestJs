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
      secret: process.env.JWT_SECRET,
      expiresIn: Math.floor((expire.getTime() - Date.now()) / 1000),
      algorithm: 'HS256',
    });
  }

  isTokenValid(token: string): boolean {
    try {
      console.log('Token cần kiểm tra:', token);
      this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      return true;
    } catch (error) {
      console.error('Lỗi khi kiểm tra token:', error.message);
      return false;
    }
  }

  getTokenPayload(token: string): { sub: number; role: string } {
    try {
      const actualToken = token.replace('Bearer ', '');
      const decodedToken = this.jwtService.verify(actualToken, {
        secret: process.env.JWT_SECRET,
      });

      return {
        sub: decodedToken?.sub ? Number(decodedToken.sub) : 0,
        role: decodedToken?.role || '',
      };
    } catch (error) {
      console.error('Error decoding token:', error.message);
      return { sub: 0, role: '' };
    }
  }
}
