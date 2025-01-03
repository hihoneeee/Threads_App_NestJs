import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from 'src/Config/typeorm.config';
import { AuthModule } from 'src/Modules/Auth/auth.module';
import { RoleModule } from 'src/Modules/Roles/role.module';
import { JwtModule } from 'src/Modules/Jwt/jwt.module';
import { UserModule } from 'src/Modules/Users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    UserModule,
    AuthModule,
    JwtModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
