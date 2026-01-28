import { Pokemon } from "pokenode-ts";

export function PokeDisplayCard(props: { pokemon: Pokemon }) {
  console.log(props.pokemon.sprites.front_default);
  return (
    <div className="poke-card">
      <div className="poke-card-image">
        <img
          src={props.pokemon.sprites.front_default ?? ""}
          alt={props.pokemon.name}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="poke-card-content">
        <h3 className="poke-card-name">{props.pokemon.name}</h3>
        <p className="poke-card-id">#{props.pokemon.id}</p>
      </div>
    </div>
  );
}
