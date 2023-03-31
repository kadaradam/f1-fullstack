-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "place" INTEGER NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);
