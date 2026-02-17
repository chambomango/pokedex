import { idFromUrl } from "@/helpers/gridHelpers";
import Link from "next/link";
import { ChainLink } from "pokenode-ts";

export default async function EvolutionCard({ node }: { node: ChainLink }) {
  const id = idFromUrl(node.species.url);
  const name = node.species.name;

  return (
    <div key={name} className="flex flex-col items-center">
      <img
        className="w-24 h-24 pixelated"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={name}
        loading="lazy"
        decoding="async"
        width={96}
        height={96}
      />
      <Link href={`/pokedex/${name}`}>{name}</Link>
    </div>
  );
}
