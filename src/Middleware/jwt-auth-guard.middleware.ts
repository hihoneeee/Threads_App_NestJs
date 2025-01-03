import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.replace('Bearer ', '').trim();

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      });
      request.userId = payload.sub;
      return true;
    } catch (error) {
      console.error('JWT Verify Error:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
