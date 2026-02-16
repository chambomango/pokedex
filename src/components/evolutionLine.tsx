import { idFromUrl } from "@/helpers/gridHelpers";
import Link from "next/link";
import { ChainLink, EvolutionClient } from "pokenode-ts";
import { JSX } from "react";

export default async function EvolutionLine({
  chainUrl,
}: {
  chainUrl: string;
}) {
  const evolutionClient = new EvolutionClient();
  const evolutionData = await evolutionClient.getEvolutionChainById(
    idFromUrl(chainUrl),
  );

  const evolutionLine: { evolution: JSX.Element; level: number }[] = [];

  function addToEvolulutionLine(
    evChain: ChainLink,
    evLine: { evolution: JSX.Element; level: number }[],
    currentLevel: number,
  ) {
    evLine.push({
      evolution: (
        <div key={evChain.species.name} className="flex flex-col items-center">
          <div>
            <img
              className="w-24 h-24 pixelated"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idFromUrl(evChain.species.url)}.png`}
              alt={evChain.species.name}
              loading="lazy"
              decoding="async"
              width={96}
              height={96}
            />
          </div>
          <Link href={`/pokedex/${evChain.species.name}`}>
            {evChain.species.name}
          </Link>
        </div>
      ),
      level: currentLevel,
    });

    if (evChain.evolves_to === null) return;
    else {
      evChain.evolves_to.forEach((chain) => {
        addToEvolulutionLine(chain, evolutionLine, currentLevel++);
      });
    }
  }
  addToEvolulutionLine(evolutionData.chain, evolutionLine, 0);

  return (
    <div className="flex space-between max-w-400">
      {evolutionLine.map((line) => line.evolution)}
    </div>
  );
}
