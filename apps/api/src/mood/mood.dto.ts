import { z } from 'zod';
import { MoodType } from '@repo/db';

export const CreateMoodDto = z.object({
  type: z
    .enum([MoodType.PLEASANT, MoodType.EXCITED, MoodType.SAD])
    .transform((val) => val.toUpperCase() as MoodType),
});

export type CreateMoodDtoType = z.infer<typeof CreateMoodDto>;
