import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const router = useRouter();
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  const [loading, setLoading] = useState(true);

  const typeOptions = ["Electric", "Fire", "Grass"];

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        let value = "";
        if (searchText) {
          value = `?text=${searchText}`;
        }
        if (selectedTypes.length > 0) {
          const typesQuery = selectedTypes.map((type) => type).join(",");
          value = value ? `${value}&type=${typesQuery}` : `?type=${typesQuery}`;
        }
        const result = await fetch(`/api/pokemon${value}`);
        const data = await result.json();
        setPokemons(data);
      } catch (error) {
        console.error("Failed to fetch Pokemon data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, [searchText, selectedTypes]);

  const handleTypeChange = (type: string) => {
    setSelectedTypes(
      (prevTypes) =>
        prevTypes.includes(type)
          ? prevTypes.filter((t) => t !== type)
          : [...prevTypes, type]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchText(value);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex p-20 pt-4">
      <div className="p-12" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
        <h1 className="mb-4 text-2xl font-bold text-white">Pokedex</h1>

        <div className="mb-4 flex items-center justify-between">
          <form className="mr-4 flex w-1/2 items-center">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-white">
                <SearchIcon />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full rounded-lg border-gray-300 bg-[#272727] p-4 ps-10 text-sm text-gray-900 text-white
                hover:border-gray-500 hover:bg-gray-800"
                placeholder="Search Pokemon"
                onChange={handleInputChange}
              />
            </div>
          </form>

          <div className="relative w-1/4">
            <button
              className="flex items-center rounded bg-[#272727] px-4 py-2 pb-3 pt-3 text-white"
              onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            >
              <FilterListIcon className="mr-3" />
              <span className="mr-2">Type</span>
            </button>
            {showTypeDropdown && (
              <div className="absolute mt-2 w-full rounded-lg border-gray-300 bg-[#272727] p-4 text-white
              ">
                {typeOptions.map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeChange(type)}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="flex w-1/4 justify-end">
            <button
              className="flex items-center rounded bg-[#272727] px-4 py-2 pb-3 pt-3 text-white
              hover:border-gray-500 hover:bg-gray-800"
              onClick={() => router.push("/pokedex/create")}
            >
              <AddCircleIcon className="mr-3" />
              New Pokemon
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {pokemons.map((value, idx) => (
            <Link href={"/pokedex/view/" + value.id}>
              <div
                key={value.id}
                className="p-30 rounded-lg border-gray-300 bg-[#272727] pb-4 pt-3 text-center"
              >
                <img src="/pikachu.png" className="mx-auto mb-2" />
                <h3 className="font-bold text-white">{value.n123}</h3>
                <h3 className="text-white">{value.name}</h3>
                <p style={{ color: "#F79328" }}>{value.type}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
