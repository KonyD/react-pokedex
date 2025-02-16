import "./css/PokemonInfo.css";

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
  selectedPokemon: Pokemon | null;
  onClose: () => void; // Function to close modal
};

function PokemonInfo({ selectedPokemon, onClose }: Props) {
  if (!selectedPokemon) return null; // Don't render if no Pokémon is selected

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <h2>
          {selectedPokemon.name} #
          {selectedPokemon.id.toString().padStart(4, "0")}
        </h2>
        <img src={selectedPokemon.image} alt={selectedPokemon.name} />
        <p>
          <strong>Height:</strong> {selectedPokemon.height / 10} m
        </p>
        <p>
          <strong>Weight:</strong> {selectedPokemon.weight / 10} kg
        </p>
        <div className="pokemon-types">
          {selectedPokemon.types.map((type, index) => (
            <span key={index} className={`type ${type}`}>
              {type}
            </span>
          ))}
        </div>
        <h3>Base Stats:</h3>
        <div className="base-stats">
          {selectedPokemon.stats.map((stat, index) => (
            <p key={index}>
              <strong>{stat.name}:</strong> {stat.value}
            </p>
          ))}
        </div>
        <h3>Abilities:</h3>
        <div className="pokemon-abilities">
          {selectedPokemon.abilities.map((ability, index) => (
            <p key={index}>{ability}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonInfo;
