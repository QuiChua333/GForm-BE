import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { initApplication } from '@/app';

async function bootstrap() {
  const app = await initApplication();

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);
}
bootstrap();
