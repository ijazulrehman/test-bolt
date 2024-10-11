import { useState, useEffect } from "react";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { useRouter } from "next/router";
import { enqueueSnackbar } from 'notistack';

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    n123: "",
    pokemonPhoto: "",
    type: "",
    description: "",
    height: "",
    weight: "",
    maleGender: "",
    femaleGender: "",
    abilities: "",
    eggGroups: "",
    evolutionDescription: "",
    evolutionPhoto: "",
  });

  useEffect(() => {
    if (id) {
      const fetchPokemonData = async () => {
        try {
          const response = await fetch(`/api/pokemon?id=${id}`);
          if (response.ok) {
            const pokemonData = await response.json();
            setFormData(pokemonData);
          } else {
            console.error("Failed to fetch the pokemon data");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPokemonData();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("n123", formData.n123);
    formDataToSend.append("pokemonPhoto", formData.pokemonPhoto);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("height", formData.height);
    formDataToSend.append("weight", formData.weight);
    formDataToSend.append("maleGender", formData.maleGender);
    formDataToSend.append("femaleGender", formData.femaleGender);
    formDataToSend.append("abilities", formData.abilities);
    formDataToSend.append("eggGroups", formData.eggGroups);
    formDataToSend.append(
      "evolutionDescription",
      formData.evolutionDescription,
    );
    formDataToSend.append("evolutionPhoto", formData.evolutionPhoto); */

    try {
      const response = await fetch(`/api/pokemon?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Pokemon saved successfully:", result);
        enqueueSnackbar("Pokemon saved successfully!", { variant: 'success' });
        setTimeout(() => {
            router.push(`/pokedex/view/${id}`);
        }, 1000);
      } else {
        console.error("Failed to save Pokemon");
        enqueueSnackbar("Failed to save Pokemon", { variant: 'error' });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      enqueueSnackbar("An error occurred while saving Pokemon", { variant: 'error' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("name: ", name);
    console.log("value: ", value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log("name: ", name);
    console.log("value: ", value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Save the file object
      }));
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      n123: "",
      pokemonPhoto: "",
      type: "",
      description: "",
      height: "",
      weight: "",
      maleGender: "",
      femaleGender: "",
      abilities: "",
      eggGroups: "",
      evolutionDescription: "",
      evolutionPhoto: "",
    });
    enqueueSnackbar("Field values cleared", { variant: 'success' });
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="pt mx-auto max-w-lg bg-[#000000CC] p-12">
      <h1 className="mb-4 text-2xl font-bold text-white">Create Pokemon</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex space-x-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="flex-1 rounded border border-gray-300 bg-[#272727] p-2 text-[#FFFFFFB2] placeholder-[#FFFFFFB2]"
            required
          />
          <input
            type="text"
            name="n123"
            placeholder="N° 123"
            value={formData.n123}
            onChange={handleInputChange}
            className="flex-1 rounded border border-gray-300 bg-[#272727] p-2 text-[#FFFFFFB2] placeholder-[#FFFFFFB2]"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-[#FFFFFFB2]">Pokemon Photo</label>
          <input
            type="file"
            accept="image/*"
            name="pokemonPhoto"
            onChange={handleFileChange}
            className="rounded border border-gray-300 bg-[#272727] p-2 text-[#FFFFFFB2] placeholder-[#FFFFFFB2]"
          />
          {formData.pokemonPhoto && (
            <img
                src="/pikachu.png"
                alt="Pokemon Preview"
                className="mt-4 w-40 h-40 object-cover rounded"
            />
            )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full rounded border border-gray-300 bg-[#272727] p-2 text-[#FFFFFFB2] placeholder-[#FFFFFFB2]"
          />
        </div>

        <div className="mb-4">
          <textarea
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleTextAreaChange}
            className="w-full rounded border border-gray-300 bg-[#272727] p-2 text-[#FFFFFFB2] placeholder-[#FFFFFFB2]"
            rows={4}
          />
        </div>

        <div className="mb-4 flex space-x-4">
          <input
            type="text"
            placeholder="Height"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            className="flex-1 rounded border border-gray-300 bg-[#272727] p-2 text-[#FFFFFFB2] placeholder-[#FFFFFFB2]"
          />
          <input
            type="text"
            placeholder="Weight"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            className="flex-1 rounded border border-gray-300 bg-[#272727] p-2 text-[#FFFFFFB2] placeholder-[#FFFFFFB2]"
          />
        </div>

        <div className="mb-4 flex space-x-4">
          <div className="relative flex-1">
            <MaleIcon className="absolute left-2 top-2 text-gray-400" />
            <input
              type="text"
              placeholder="Gender ratio"
              name="maleGender"
              value={formData.maleGender}
              onChange={handleInputChange}
              className="h-10 flex-1 rounded border border-gray-300 bg-[#272727] pl-8 pr-2 text-[#FFFFFFB2] placeholder-[#FFFFFFB2]" // Add padding-left to accommodate the icon
              style={{ width: "calc(13.2rem - 0px)" }}
            />
          </div>
          <div className="relative flex-1">
            <FemaleIcon className="absolute left-2 top-2 text-gray-400" />
            <input
              type="text"
              placeholder="Gender ratio"
              name="femaleGender"
              value={formData.femaleGender}
              onChange={handleInputChange}
              className="h-10 flex-1 rounded border border-gray-300 bg-[#272727] pl-8 pr-2 text-[#FFFFFFB2] placeholder-[#FFFFFFB2]" // Add padding-left to accommodate the icon
              style={{ width: "calc(13.2rem - 0px)" }}
            />
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Abilities"
            name="abilities"
            value={formData.abilities}
            onChange={handleInputChange}
            className="w-full rounded border border-gray-300 bg-[#272727] p-2 text-[#FFFFFFB2] placeholder-[#FFFFFFB2]"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Egg Groups"
            name="eggGroups"
            value={formData.eggGroups}
            onChange={handleInputChange}
            className="w-full rounded border border-gray-300 bg-[#272727] p-2 text-[#FFFFFFB2] placeholder-[#FFFFFFB2]"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Evolution description"
            name="evolutionDescription"
            value={formData.evolutionDescription}
            onChange={handleInputChange}
            className="w-full rounded border border-gray-300 bg-[#272727] p-2 text-[#FFFFFFB2] placeholder-[#FFFFFFB2]"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-[#FFFFFFB2]">Evolution Photo</label>
          <input
            type="file"
            accept="image/*"
            name="evolutionPhoto"
            onChange={handleInputChange}
            className="rounded border border-gray-300 bg-[#272727] p-2 text-[#FFFFFFB2] placeholder-[#FFFFFFB2]"
          />
          {formData.evolutionPhoto && (
            <img
                src="/pikachu.png"
                alt="Pokemon Preview"
                className="mt-4 w-40 h-40 object-cover rounded"
            />
            )}
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            className="rounded border border-gray-300 bg-white p-2 text-black hover:text-white hover:bg-gray-800 hover:border-gray-500"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className="rounded bg-black p-2 text-white hover:border-gray-500 hover:bg-gray-800">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
