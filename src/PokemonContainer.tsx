import "./css/types.css";
import "./css/PokemonContainer.css";

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

type Props = {
  filteredData: Pokemon[];
  setSelectedPokemon: (pokemon: Pokemon) => void;
};

function PokemonContainer({ filteredData, setSelectedPokemon }: Props) {
  return (
    <div className="pokemon-container">
      {filteredData.map((pokemon) => (
        <div
          key={pokemon.id}
          className="pokemon-card"
          onClick={() => setSelectedPokemon(pokemon)}
        >
          <img src={pokemon.image} alt={pokemon.name} />
          <p className="pokemon-name">{pokemon.name}</p>
          <div className="pokemon-types">
            {pokemon.types.map((type, index) => (
              <span key={index} className={`type ${type}`}>
                {type}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PokemonContainer;