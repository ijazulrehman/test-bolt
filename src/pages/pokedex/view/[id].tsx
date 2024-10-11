import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { enqueueSnackbar } from 'notistack';

export default function PokemonDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchPokemonDetails = async () => {
        try {
          const result = await fetch(`/api/pokemon?id=${id}`);
          const data = await result.json();
          console.log("data: ", data);
          setPokemon(data);
        } catch (error) {
          console.error("Failed to fetch Pokemon data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPokemonDetails();
    }
  }, [id]);

  const handleDelete = async () => {
    const deletePokemon = async () => {
        try {
          const result = await fetch(`/api/pokemon?id=${id}`, {
            method: "DELETE"
          });
          const data = await result.json();
          console.log("data: ", data);
          enqueueSnackbar("Pokemon deleted successfully!", { variant: 'success' });
          setTimeout(() => {
            router.push(`/pokedex`);
        }, 1000);
        } catch (error) {
          console.error("Failed to delete Pokemon:", error);
          enqueueSnackbar("Failed to delete Pokemon.", { variant: 'error' });

        }
      };
      deletePokemon();
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-20 pt-4">
      <div className="flex justify-between bg-[#000000B2] p-8 pl-4">
        <div className="relative w-2/5">
          <button
            className="absolute left-4 top-4 flex items-center rounded py-2 pl-4 pr-4 text-white"
            onClick={() => router.back()}
          >
            <ArrowBackIcon className="mr-2 text-white" />
          </button>

          <div className="flex justify-center pt-14">
            <img
              src="/pikachu.png"
              width={450}
              height={450}
              className="object-cover"
            />
          </div>
        </div>

        <div className="w-3/5 pl-8 pr-4">
          <div className="mb-4 flex justify-end">
            <button
              className="mr-2 flex items-center rounded bg-[#333333] py-2 pl-2 pr-4 text-white"
              onClick={() => router.push(`/pokedex/edit/${id}`)}
            >
              <EditIcon className="mr-2 text-white" />
              Edit
            </button>

            <button
              className="flex items-center rounded bg-[#333333] px-2 py-2 pr-3 text-white"
              onClick={handleDelete}
            >
              <DeleteIcon className="mr-2 text-white" />
              Delete
            </button>
          </div>

          <div className="rounded-lg bg-[#272727] p-6">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold text-white">{pokemon?.name}</h2>
              <h3 className="text-xl text-white">{pokemon?.n123}</h3>
            </div>

            <p className="text-lg text-[#F79328]">{pokemon?.type}</p>
            <p className="mt-2 text-white">{pokemon?.description}</p>

            {/* Additional Information */}
            <div className="mt-4 text-white">
              <div className="grid grid-cols-3 gap-4">
                {/* Left Column: Height */}
                <div>
                  <span className="font-bold">Height:</span>
                  <p>{pokemon?.height}</p>
                </div>

                {/* Center Column: Weight */}
                <div>
                  <span className="font-bold">Weight:</span>
                  <p>{pokemon?.weight}</p>
                </div>

                {/* Right Column: Gender Ratio */}
                <div>
                  <span className="font-bold">Gender Ratio:</span>
                  <p>
                    {pokemon?.maleGender} ♂ {pokemon?.femaleGender} ♀
                  </p>
                </div>
              </div>
            </div>

            {/* Abilities and Egg Groups */}
            <div className="mt-4 grid grid-cols-2 gap-4 text-white">
              <div>
                <h4 className="font-bold">Abilities:</h4>
                <p>{pokemon?.abilities}</p>
              </div>
              <div>
                <h4 className="font-bold">Egg Groups:</h4>
                <p>{pokemon?.eggGroups}</p>
              </div>
            </div>

            {/* Evolutions */}
            <div className="mt-4 text-white">
              <h4 className="font-bold">Evolutions:</h4>
              <p>{pokemon?.evolutionDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
