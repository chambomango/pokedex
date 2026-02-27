import { capitalizeFirst, idFromUrl } from "@/helpers/gridHelpers";
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
          <Link href={`/pokedex/${previousPokemon.name}`}>
            <div className="flex gap-2 items-center text-foreground text-sm hover:underline">
              <img
                className="w-1.5"
                src="/logos/SVG/arrow-left-wide-line.svg"
              />
              <div className="text-center">
                <div>
                  {capitalizeFirst(previousPokemon.name)}
                  {/* {" "} */}
                  {/* {idFromUrl(previousPokemon.url)} */}
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
      <div>{children}</div>
      <div className="w-25">
        {nextPokemon && (
          <Link href={`/pokedex/${nextPokemon.name}`}>
            <div className="flex gap-2 items-center text-foreground hover:underline text-sm justify-end">
              <div className="text-center">
                <div>
                  {capitalizeFirst(nextPokemon.name)}
                  {/* {" "} */}
                  {/* {idFromUrl(nextPokemon.url)} */}
                </div>
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
