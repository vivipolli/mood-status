import { Injectable } from '@nestjs/common';
import { Mood, MoodType } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class MoodService {
  constructor(private prisma: PrismaService) {}

  async getMoods(): Promise<Mood[]> {
    return this.prisma.mood.findMany();
  }

  async createMood(type: MoodType): Promise<Mood> {
    return this.prisma.mood.create({
      data: { type },
    });
  }
}
