import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ // this code tell NestJS use Pipe logic to use the validation pipe globally everywhere
    whitelist:true
  }))
  await app.listen(3333);
}
bootstrap();
