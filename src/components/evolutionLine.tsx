import { idFromUrl } from "@/helpers/gridHelpers";
import Link from "next/link";
import { ChainLink } from "pokenode-ts";

export default async function EvolutionLine({
  chainLink,
}: {
  chainLink: ChainLink;
}) {
  return (
    <>
      <div className="flex items-center">
        <div>
          {/* <img className="w-8" src="/logos/SVG/arrow-right-long-line.svg"></img> */}
        </div>
        <div
          key={chainLink.species.name}
          className="flex flex-col items-center"
        >
          <div>
            <img
              className="w-24 h-24 pixelated"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idFromUrl(chainLink.species.url)}.png`}
              alt={chainLink.species.name}
              loading="lazy"
              decoding="async"
              width={96}
              height={96}
            />
          </div>
          <Link href={`/pokedex/${chainLink.species.name}`}>
            {chainLink.species.name}
          </Link>
        </div>
      </div>
      <div className="flex flex-col">
        {chainLink.evolves_to.map((chain) => (
          <EvolutionLine chainLink={chain} />
        ))}
      </div>
    </>
  );
}
