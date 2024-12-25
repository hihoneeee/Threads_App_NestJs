import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtEntity } from 'src/Database/Entities/jwt.entity';
import { JwtRepository } from 'src/Modules/Jwt/jwt.repository';
import { JwtService } from 'src/Modules/Jwt/jwt.service';

@Module({
  imports: [TypeOrmModule.forFeature([JwtEntity])],
  providers: [
    {
      provide: 'IJwtService',
      useClass: JwtService,
    },
    {
      provide: 'IJwtRepository',
      useClass: JwtRepository,
    },
  ],
  exports: ['IJwtService', 'IJwtRepository'],
})
export class JwtModule {}
