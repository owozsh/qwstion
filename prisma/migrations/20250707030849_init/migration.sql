-- CreateTable
CREATE TABLE "Presentation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slides" JSONB NOT NULL,

    CONSTRAINT "Presentation_pkey" PRIMARY KEY ("id")
);
