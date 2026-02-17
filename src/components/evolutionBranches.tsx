import { ChainLink } from "pokenode-ts";
import EvolutionCard from "./evolutionCard";

export default async function EvolutionBranches({
  chainLink,
}: {
  chainLink: ChainLink;
}) {
  const evolutions = chainLink.evolves_to ?? [];

  if (evolutions.length === 0) {
    return <EvolutionCard node={chainLink} />;
  }

  return (
    <>
      <EvolutionCard node={chainLink} />
      <div className="flex flex-col">
        {chainLink.evolves_to.map((nextEvolution) => (
          <EvolutionBranches
            key={nextEvolution.species.name}
            chainLink={nextEvolution}
          />
        ))}
      </div>
    </>
  );
}
