import { Module } from '@nestjs/common';
import { UserController } from 'src/Modules/Users/user.controller';
import { UserRepository } from 'src/Modules/Users/user.repository';
import { UserService } from 'src/Modules/Users/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
