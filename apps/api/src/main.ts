import { NestFactory } from '@nestjs/core';
import { MoodModule } from './mood/mood.module';

async function bootstrap() {
  const app = await NestFactory.create(MoodModule);
  app.enableCors();
  await app.listen(3333);
}
bootstrap();
