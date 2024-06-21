import { Controller, Get, Post, Body } from '@nestjs/common';
import { Mood, MoodType } from '@prisma/client';
import { MoodService } from './mood.service';

@Controller('moods')
export class MoodController {
  constructor(private readonly moodService: MoodService) {}

  @Get()
  async getMoods(): Promise<Mood[]> {
    return this.moodService.getMoods();
  }

  @Post()
  async createMood(@Body() data: { type: MoodType }): Promise<Mood> {
    return this.moodService.createMood(data.type);
  }
}
