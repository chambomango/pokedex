import { Pokemon } from "pokenode-ts";

export function PokeDisplayCard(props: { name: string; id: string }) {
  return (
    <div className="poke-card">
      <div className="poke-card-image">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
          alt={props.name}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="poke-card-content">
        <h3 className="poke-card-name">{props.name}</h3>
        <p className="poke-card-id">#{props.id}</p>
      </div>
    </div>
  );
}
