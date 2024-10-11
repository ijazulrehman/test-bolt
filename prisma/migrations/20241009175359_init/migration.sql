-- CreateTable
CREATE TABLE "Pokedex" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "n123" TEXT NOT NULL,
    "pokemonPhoto" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "maleGender" TEXT NOT NULL,
    "femaleGender" TEXT NOT NULL,
    "abilities" TEXT NOT NULL,
    "eggGroups" TEXT NOT NULL,
    "evolutionDescription" TEXT NOT NULL,
    "evolutionPhoto" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pokedex_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Pokedex_name_idx" ON "Pokedex"("name");
