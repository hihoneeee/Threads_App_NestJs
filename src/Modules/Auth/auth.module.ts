import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from 'src/Database/Entities/user.entity';
import { UserRepository } from 'src/Modules/Users/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { RoleRepository } from 'src/Modules/Roles/role.repository';
import { JwtTokenHelper } from 'src/Helpers/token.helper';
import { RoleEntity } from 'src/Database/Entities/role.entity';
import { JwtEntity } from 'src/Database/Entities/jwt.entity';
import { JwtService } from 'src/Modules/Jwt/jwt.service';
import { JwtRepository } from 'src/Modules/Jwt/jwt.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, JwtEntity]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
    {
      provide: 'IJwtService',
      useClass: JwtService,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IRoleRepository',
      useClass: RoleRepository,
    },
    {
      provide: 'IJwtRepository',
      useClass: JwtRepository,
    },
    JwtTokenHelper,
  ],
  exports: [
    'IAuthService',
    'IJwtService',
    'IUserRepository',
    'IRoleRepository',
    'IJwtRepository', // Added this export
    JwtTokenHelper,
  ],
})
export class AuthModule {}
