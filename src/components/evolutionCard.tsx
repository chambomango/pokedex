import { capitalizeFirst, idFromUrl } from "@/helpers/gridHelpers";
import Link from "next/link";
import { ChainLink } from "pokenode-ts";

export default function EvolutionCard({
  node,
  onAssetLoad,
}: {
  node: ChainLink;
  onAssetLoad?: () => void;
}) {
  const id = idFromUrl(node.species.url);
  const name = node.species.name;

  return (
    <div
      id={`evo-${name}`}
      key={name}
      className="flex flex-col items-center"
      data-evo-node={name}
    >
      <img
        className="w-24 h-24 pixelated"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={name}
        loading="lazy"
        decoding="async"
        width={96}
        height={96}
        onLoad={onAssetLoad}
      />
      <Link
        className="hover:underline hover:decoration-zinc-600"
        href={`/pokedex/${name}`}
      >
        {capitalizeFirst(name)}
      </Link>
    </div>
  );
}
