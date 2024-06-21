import { NestFactory } from '@nestjs/core';
import { MoodModule } from './mood.module';

async function bootstrap() {
  const app = await NestFactory.create(MoodModule);
  await app.listen(3000);
}
bootstrap();
