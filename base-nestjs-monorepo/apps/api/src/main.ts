import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  await app.listen(3000);
  const swaggerConfig = new DocumentBuilder()
  .setTitle('Title Project')
  .setDescription('description of the project')
  .setVersion('1.0')
  .addTag('Tags')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api', app, document);
}

bootstrap();
