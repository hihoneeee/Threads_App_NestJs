import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/Database/Entities/user.entity';
import { JwtAuthGuard } from 'src/Middleware/jwt-auth-guard.middleware';
import { UserController } from 'src/Modules/Users/user.controller';
import { UserRepository } from 'src/Modules/Users/user.repository';
import { UserService } from 'src/Modules/Users/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: 'IUserService',
      useClass: UserService,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    JwtAuthGuard,
  ],
  exports: ['IUserService', 'IUserRepository'],
  controllers: [UserController],
})
export class UserModule {}
