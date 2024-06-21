import { Module } from '@nestjs/common';
import { MoodController } from './mood.controller';
import { MoodService } from './mood.service';
import { PrismaModule } from './prisma';

@Module({
  imports: [PrismaModule],
  controllers: [MoodController],
  providers: [MoodService],
})
export class MoodModule {}
