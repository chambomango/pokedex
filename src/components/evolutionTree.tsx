"use client";
import { ChainLink } from "pokenode-ts";
import { Xwrapper } from "react-xarrows";
import EvolutionBranches from "./evolutionBranches";

export default function EvolutionTree({
  chainLink,
  gap,
  arrowColor,
}: {
  chainLink: ChainLink;
  gap: string;
  arrowColor: string;
}) {
  return (
    <div
      className="flex items-center border rounded-lg shadow-sm w-fit p-4"
      style={{ gap: gap }}
    >
      <Xwrapper>
        <EvolutionBranches
          chainLink={chainLink}
          arrowColor={arrowColor}
          gap={gap}
        />
      </Xwrapper>
    </div>
  );
}
