import {
  EvolutionClient,
  Move,
  MoveClient,
  Pokemon,
  PokemonClient,
  PokemonMoveVersion,
} from "pokenode-ts";
import {
  capitalizeFirst,
  idFromUrl,
  prettyMoveMethod,
  prettyPrintMove,
  prettyStat,
} from "@/helpers/gridHelpers";
import PokeTypeBox, { typesToColors } from "@/components/pokeTypeBox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PokemonStatsChart } from "@/components/pokemonStatsChart";
import EvolutionTree from "@/components/evolutionTree";
import Link from "next/link";
import { PokemonBreadcrumb } from "@/components/pokemonBreadcrumb";
import { MoveWithVersions } from "@/app/definitions/moveDefinitions";
import MovesTable from "@/components/movesTable";

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const pokemonClient = new PokemonClient();
  const pokemonData: Pokemon = await pokemonClient.getPokemonByName(
    name as string,
  );

  const hasPrev = pokemonData.id > 1;
  const hasNext = pokemonData.id < 1025;
  const offset = hasPrev ? pokemonData.id - 2 : 0;
  const limit = (hasPrev ? 1 : 0) + 1 + (hasNext ? 1 : 0);
  const surroundingPokemon = await pokemonClient.listPokemons(offset, limit);

  const currentPokemonIndex = hasPrev ? 1 : 0;
  const previousPokemon = hasPrev
    ? surroundingPokemon.results[currentPokemonIndex - 1]
    : null;
  const nextPokemon = hasNext
    ? surroundingPokemon.results[currentPokemonIndex + 1]
    : null;

  const speciesData = await pokemonClient.getPokemonSpeciesByName(
    pokemonData.species.name,
  );

  const evolutionClient = new EvolutionClient();
  const evolutionData = await evolutionClient.getEvolutionChainById(
    idFromUrl(speciesData.evolution_chain.url),
  );

  const moveClient = new MoveClient();
  const moveTasks: Promise<MoveWithVersions>[] = pokemonData.moves.map(
    async (move) => {
      const moveData = await moveClient.getMoveByName(move.move.name);
      return { ...moveData, version_group_details: move.version_group_details };
    },
  );
  const moves: MoveWithVersions[] = await Promise.all(moveTasks);

  return (
    <div className="mt-4 mb-40 max-w-6xl">
      <PokemonBreadcrumb name={pokemonData.name} />
      <div className="mt-8 flex justify-between items-center">
        <div className="w-40">
          {previousPokemon && (
            <Link href={`/pokedex/${previousPokemon.name}`}>
              <div className="flex gap-2 items-center text-zinc-600 hover:underline">
                <img
                  className="w-2"
                  src="/logos/SVG/arrow-left-wide-line.svg"
                />
                <div className="text-center">
                  <div>
                    #{idFromUrl(previousPokemon.url)}{" "}
                    {capitalizeFirst(previousPokemon.name)}
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className="w-40">
          {nextPokemon && (
            <Link href={`/pokedex/${nextPokemon.name}`}>
              <div className="flex gap-2 items-center text-zinc-600 hover:underline justify-end">
                <div className="text-center">
                  <div className="">
                    #{idFromUrl(nextPokemon.url)}{" "}
                    {capitalizeFirst(nextPokemon.name)}
                  </div>
                </div>
                <img
                  className="w-2"
                  src="/logos/SVG/arrow-right-wide-line.svg"
                />
              </div>
            </Link>
          )}
        </div>
      </div>
      <h2 className="tracking-wide text-center mt-6">
        {capitalizeFirst(pokemonData.name)}
      </h2>
      <h3 className="text-zinc-600 text-center">#{pokemonData.id}</h3>

      <div className="mt-8 flex justify-between items-start h-81">
        <div className="h-full flex flex-col">
          <h3 className="font-semibold mb-2">Basic Info</h3>
          <div className="flex flex-col px-8 py-4 h-full justify-between border rounded-lg shadow-sm text-zinc-800">
            <div className="flex items-baseline ">
              <h4 className="mr-1">
                {pokemonData.types.length > 1 ? "Types" : "Type"}
              </h4>
              <div className="flex ml-3 gap-2">
                {pokemonData.types.map((t) => (
                  <Link key={t.type.name} href={`/pokedex?type=${t.type.name}`}>
                    <PokeTypeBox type={t.type.name} />
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h4 className="mr-1">Abilities</h4>
              {pokemonData.abilities.map((ability) => (
                <div
                  key={ability.ability.name}
                  className="text-zinc-500 font-semibold px-2 py-0.5 rounded-sm"
                >
                  {capitalizeFirst(ability.ability.name)}
                </div>
              ))}
            </div>
            <div className="flex items-baseline gap-2">
              <h4 className="mr-1">Egg Group</h4>
              {speciesData.egg_groups.map((eggGroup) => (
                <div
                  key={eggGroup.name}
                  className="text-zinc-500 font-semibold px-2 py-0.5 rounded-sm"
                >
                  {capitalizeFirst(eggGroup.name)}
                </div>
              ))}
            </div>
            <div className="flex items-baseline gap-4">
              <h4>Height</h4>
              <div className="text-zinc-500 font-semibold">
                {pokemonData.height / 10} m
              </div>
            </div>
            <div className="flex items-baseline gap-4">
              <h4>Weight</h4>
              <div className="text-zinc-500 font-semibold">
                {pokemonData.weight / 10} kg
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="h-9" />
          <div className="w-fit border rounded-xl shadow-sm px-4">
            <img
              className="w-72 h-72 pixelated"
              src={pokemonData.sprites.front_default || ""}
              alt={pokemonData.name}
              loading="lazy"
              decoding="async"
              width={192}
              height={192}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mt-8 mb-2 font-semibold">Stats</h3>
        <PokemonStatsChart
          chartData={pokemonData.stats.map((stat) => {
            return {
              key: prettyStat(stat.stat.name),
              value: stat.base_stat,
            };
          })}
          barColor={typesToColors[pokemonData.types[0].type.name]}
        />
      </div>

      <div>
        <h3 className="mt-8 font-semibold mb-2">Evolution Path</h3>

        <div className="flex justify-self-center">
          <EvolutionTree
            chainLink={evolutionData.chain}
            gap={
              idFromUrl(speciesData.evolution_chain.url) === 67
                ? "400px"
                : "160px"
            }
            arrowColor={typesToColors[pokemonData.types[0].type.name]}
          />
        </div>
      </div>

      <div>
        <h3 className="mt-8 mb-2 font-semibold">Moves</h3>
        <MovesTable moves={moves} />
      </div>
    </div>
  );
}
