import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ // this code tell NestJS use Pipe logic to use the validation pipe globally everywhere
    whitelist:true// bình thường dto chỉ có 2 trường nhưng chúng ta gửi 3 trường và nó vẫn in ra 3 trường nên phải dùng cái này để gửi đúng request
  }))
  await app.listen(3333);
}
bootstrap();
