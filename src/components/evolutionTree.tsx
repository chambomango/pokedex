import { ChainLink } from "pokenode-ts";
import EvolutionLine from "./evolutionBranches";

export default function EvolutionTree({ chainLink }: { chainLink: ChainLink }) {
  return (
    <div className="flex items-center">
      <EvolutionLine chainLink={chainLink} />
    </div>
  );
}
