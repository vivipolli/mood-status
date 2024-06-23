import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { Mood, MoodType } from '@repo/db';
import { MoodService } from './mood.service';
import { CreateMoodDto, CreateMoodDtoType } from './mood.dto';

@Controller('moods')
export class MoodController {
  constructor(private readonly moodService: MoodService) {}

  @Get()
  async getMoods(): Promise<Mood[]> {
    const moods = await this.moodService.getMoods();
    return moods.map((item) => {
      return { ...item, type: item.type.toLowerCase() as MoodType };
    });
  }

  @Post()
  async createMood(@Body() data: CreateMoodDtoType): Promise<Mood> {
    const parsedData = CreateMoodDto.safeParse(data);
    if (!parsedData.success) {
      throw new BadRequestException(parsedData.error.errors);
    }
    const mood = await this.moodService.createMood(parsedData.data.type);
    return { ...mood, type: mood.type.toLowerCase() as MoodType };
  }
}
