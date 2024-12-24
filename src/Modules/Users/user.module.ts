import { Module } from '@nestjs/common';
import { UserController } from 'src/Modules/Users/user.controller';
import { UserService } from 'src/Modules/Users/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
