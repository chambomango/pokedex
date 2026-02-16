import Link from "next/link";

export function PokeDisplayCard(props: { name: string; id: string }) {
  return (
    <Link href={`/pokedex/${props.name}`}>
      <div className="poke-card">
        <div className="poke-card-image">
          <img
            className="poke-img"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
            alt={props.name}
            loading="lazy"
            decoding="async"
            width={96}
            height={96}
          />
        </div>
        <div className="poke-card-content">
          <h3 className="poke-card-name">{props.name}</h3>
          <p className="poke-card-id">#{props.id}</p>
        </div>
      </div>
    </Link>
  );
}
