import { UserService } from './user.service';
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
  private readonly _userService: UserService;
  constructor(userService: UserService) {
    this._userService = userService;
  }
  @Get()
  GetUsers(): string {
    return 'aaaa';
  }
}
