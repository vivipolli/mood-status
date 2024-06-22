-- CreateEnum
CREATE TYPE "MoodType" AS ENUM ('PLEASANT', 'EXCITED', 'SAD');

-- CreateTable
CREATE TABLE "Mood" (
    "id" SERIAL NOT NULL,
    "type" "MoodType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("id")
);
