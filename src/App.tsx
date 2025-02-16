import { useState, useEffect } from "react";
import "./css/App.css";
import PokemonInfo from "./PokemonInfo";
import PokemonContainer from "./PokemonContainer";

type Pokemon = {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  stats: { name: string; value: number }[];
  abilities: string[];
};

function App() {
  const [data, setData] = useState<Pokemon[]>([]); // All fetched Pokémon
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0); // Keeps track of pagination
  const [search, setSearch] = useState(""); // Stores the search input
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const fetchPokemon = async (newOffset: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=200&offset=${newOffset}`
      );
      const json = await response.json();

      const pokemonData = await Promise.all(
        json.results.map(async (pokemon: { name: string; url: string }) => {
          const res = await fetch(pokemon.url);
          const pokeInfo = await res.json();
          return {
            id: pokeInfo.id,
            name: pokeInfo.name,
            image: pokeInfo.sprites.front_default,
            types: pokeInfo.types.map((t: any) => t.type.name),
            height: pokeInfo.height,
            weight: pokeInfo.weight,
            stats: pokeInfo.stats.map((s: any) => ({
              name: s.stat.name,
              value: s.base_stat,
            })),
            abilities: pokeInfo.abilities.map((a: any) => a.ability.name),
          };
        })
      );

      // Filter out duplicates by checking if the Pokémon already exists in data
      setData((prevData) => {
        const newData = pokemonData.filter(
          (newPokemon) => !prevData.some((existingPokemon) => existingPokemon.id === newPokemon.id)
        );
        return [...prevData, ...newData];
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon(offset);
  }, [offset]);

  // Filter the data based on search input, searching through all fetched Pokémon
  const filteredData = data.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleLoadMore = () => {
    const newOffset = offset + 30;
    setOffset(newOffset);
  };

  return (
    <div>
      <h1 className="title">Pokédex</h1>

      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <PokemonContainer filteredData={filteredData} setSelectedPokemon={setSelectedPokemon} />

      {loading && <p>Loading...</p>}

      <button onClick={handleLoadMore} className="load-more-btn">
        Load More
      </button>

      {/* Render the modal */}
      <PokemonInfo selectedPokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
    </div>
  );
}

export default App;
