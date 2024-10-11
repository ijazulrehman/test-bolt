import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id, text = "", type = "" } = req.query;
  console.log("id: ", id);
  const pokemonId = id ? Number(id) : null;

  switch (req.method) {
    case "GET": {
      if (pokemonId) {
        // Get single Pokemon by ID
        const pokemon = await prisma.pokedex.findUnique({
          where: { id: pokemonId },
        });
        if (!pokemon) {
          return res.status(404).json({ message: "Pokemon not found" });
        }
        return res.status(200).json(pokemon);
      } else {
        const whereClause: any = {};
        if (text) {
          whereClause.name = {
            contains: text,
            mode: "insensitive",
          };
        }
        if (type) {
          const typeArray = type.split(",");
          whereClause.type = {
            in: typeArray
          };
        }

        const pokemonList = await prisma.pokedex.findMany({
          where: whereClause
        });
        return res.status(200).json(pokemonList);
      }
    }

    case "POST": {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }

      // Create a new Pokémon
      const newPokemon = await prisma.pokedex.create({
        data: req.body,
      });
      return res.status(201).json(newPokemon);
    }

    case "PUT": {
      if (!pokemonId)
        return res.status(400).json({ message: "ID is required" });

      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }

      // Update a Pokémon
      const updatedPokemon = await prisma.pokedex.update({
        where: { id: pokemonId },
        data: req.body,
      });
      return res.status(200).json(updatedPokemon);
    }

    case "DELETE": {
      if (!pokemonId)
        return res.status(400).json({ message: "ID is required" });

      // Delete a Pokémon
      await prisma.pokedex.delete({
        where: { id: pokemonId },
      });
      return res.status(200).json({ message: "Pokemon deleted" });
    }

    default: {
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
}
