"use client";

import * as React from "react";
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";
import type { ChainLink } from "pokenode-ts";
import { formatEvolutionMethod } from "@/helpers/gridHelpers";
import EvolutionCard from "./evolutionCard";

function useRafXarrowUpdate() {
  const updateXarrow = useXarrow();
  const rafId = React.useRef<number | null>(null);

  return React.useCallback(() => {
    if (rafId.current != null) return;

    rafId.current = window.requestAnimationFrame(() => {
      rafId.current = null;
      updateXarrow();
    });
  }, [updateXarrow]);
}

export default function EvolutionBranches({
  chainLink,
  gap,
  arrowColor,
}: {
  chainLink: ChainLink;
  gap: string;
  arrowColor: string;
}) {
  const requestUpdate = useRafXarrowUpdate();

  const evolutions = chainLink.evolves_to ?? [];
  const parentId = `evo-${chainLink.species.name}`;

  React.useLayoutEffect(() => {
    requestUpdate();
  }, []);

  React.useEffect(() => {
    const onResize = () => requestUpdate();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [requestUpdate]);

  React.useEffect(() => {
    requestUpdate();
  }, [evolutions.length, requestUpdate]);

  return (
    <>
      <EvolutionCard node={chainLink} onAssetLoad={requestUpdate} />

      {evolutions.length > 0 && (
        <div className="flex flex-col gap-10">
          {evolutions.map((child) => {
            const childId = `evo-${child.species.name}`;
            const label = formatEvolutionMethod(child.evolution_details);

            return (
              <div
                key={child.species.name}
                className="flex items-center"
                style={{ gap: gap }}
              >
                <EvolutionBranches
                  chainLink={child}
                  arrowColor={arrowColor}
                  gap={gap}
                />
                <Xarrow
                  start={parentId}
                  end={childId}
                  startAnchor="right"
                  endAnchor="left"
                  showHead
                  strokeWidth={2}
                  curveness={0.35}
                  color={arrowColor}
                  labels={
                    label ? (
                      <div className="border text-[11px] text-center text-zinc-500 bg-white dark:bg-zinc-900/70 px-1 rounded max-w-20">
                        {label}
                      </div>
                    ) : null
                  }
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
