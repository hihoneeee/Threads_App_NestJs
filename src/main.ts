import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false, // Thay đổi thành false
      errorHttpStatusCode: 400,
      stopAtFirstError: true,
    }),
  );
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
