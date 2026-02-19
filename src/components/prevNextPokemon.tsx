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
  children: ReactNode;
}) {
  return (
    <div className="mb-2 flex justify-between items-baseline">
      <div className="w-34">
        {previousPokemon && (
          <Link href={`/pokedex/${previousPokemon.name}`}>
            <div className="flex gap-2 items-center text-zinc-600 text-sm hover:underline">
              <img
                className="w-1.5"
                src="/logos/SVG/arrow-left-wide-line.svg"
              />
              <div className="text-center">
                <div>
                  {capitalizeFirst(previousPokemon.name)}{" "}
                  {/* <span className="tracking-wide">{"("}</span> */}#
                  {idFromUrl(previousPokemon.url)}
                  {/* <span className="tracking-wide">{")"}</span> */}
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
      <div>{children}</div>
      <div className="w-34">
        {nextPokemon && (
          <Link href={`/pokedex/${nextPokemon.name}`}>
            <div className="flex gap-2 items-center text-zinc-600 hover:underline text-sm justify-end">
              <div className="text-center">
                <div>
                  {capitalizeFirst(nextPokemon.name)}{" "}
                  {/* <span className="tracking-wide">{"("}</span> */}#
                  {idFromUrl(nextPokemon.url)}
                  {/* <span className="tracking-wide">{")"}</span> */}
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
