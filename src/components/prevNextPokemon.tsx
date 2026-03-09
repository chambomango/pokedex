import { formatPokemonDisplayName } from "@/helpers/formatters";
import Link from "next/link";
import { NamedAPIResource } from "pokenode-ts";
import { ReactNode } from "react";

export default function PrevNextPokemon({
  previousPokemon,
  nextPokemon,
  children,
}: {
  previousPokemon: NamedAPIResource | null;
  nextPokemon: NamedAPIResource | null;
  children?: ReactNode;
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="w-25">
        {previousPokemon && (
          <Link href={`/${previousPokemon.name}`}>
            <div className="flex gap-2 items-center text-foreground text-sm hover:underline">
              <img
                className="w-1.5"
                src="/logos/SVG/arrow-left-wide-line.svg"
              />
              <div className="text-center">
                <div>{formatPokemonDisplayName(previousPokemon.name)}</div>
              </div>
            </div>
          </Link>
        )}
      </div>
      <div>{children}</div>
      <div className="w-25">
        {nextPokemon && (
          <Link href={`/${nextPokemon.name}`}>
            <div className="flex gap-2 items-center text-foreground hover:underline text-sm justify-end">
              <div className="text-center">
                <div>{formatPokemonDisplayName(nextPokemon.name)}</div>
              </div>
              <img
                className="w-1.5"
                src="/logos/SVG/arrow-right-wide-line.svg"
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
