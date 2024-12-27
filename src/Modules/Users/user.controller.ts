import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/Middleware/jwt-auth-guard.middleware';
import { IUserService } from 'src/Modules/Users/Interfaces/i.user.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject('IUserser') private readonly iUserService: IUserService,
  ) {}
  @Get('current')
  @UseGuards(JwtAuthGuard)
  async getCurrent(@Req() request: any, @Res() res: any): Promise<any> {
    const userId = request.userId;
    if (!userId) {
      return { success: false, message: 'Invalid token!' };
    }
    const serviceResponse = await this.iUserService.getCurrentAsync(userId);
    if (serviceResponse.statusCode === HttpStatus.OK) {
      return res.status(HttpStatus.OK).json({
        success: serviceResponse.success,
        message: serviceResponse.message,
        accessToken: serviceResponse.accessToken,
      });
    } else {
      return res.status(serviceResponse.statusCode).json({
        success: false,
        message: serviceResponse.message,
      });
    }
  }
}
