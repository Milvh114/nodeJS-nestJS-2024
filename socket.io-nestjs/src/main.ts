import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { Server } from "socket.io";
import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const app = express();
const server = createServer(app);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});


async function bootstrap() {
  
  

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
