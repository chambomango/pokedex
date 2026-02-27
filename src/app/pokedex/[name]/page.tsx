import { Pokemon } from "pokenode-ts";
import { capitalizeFirst, idFromUrl, prettyStat } from "@/helpers/gridHelpers";
import { typesToColors } from "@/components/pokeTypeBox";
import { PokemonStatsChart } from "@/components/pokemonStatsChart";
import EvolutionTree from "@/components/evolutionTree";
import { PokemonBreadcrumb } from "@/components/pokemonBreadcrumb";
import MovesTable from "@/components/movesTable";
import PrevNextPokemon from "@/components/prevNextPokemon";
import PokemonOverview from "@/components/pokemonOverview";
import {
  evolutionClient,
  moveClient,
  pokemonClient,
} from "@/singletons/pokenodeTsClients";
import PokemonSpriteViewer from "@/components/pokemonSpriteViewer";
export default async function PokemonPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
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

  const evolutionData = await evolutionClient.getEvolutionChainById(
    idFromUrl(speciesData.evolution_chain.url),
  );

  const blackAndWhite =
    pokemonData.sprites.versions?.["generation-v"]?.["black-white"] ?? null;

  return (
    <div className="mb-40 mx-auto max-w-5xl">
      <PokemonBreadcrumb name={pokemonData.name} />
      <div className="flex justify-between items-baseline">
        <div className="mt-9 flex gap-4">
          <h1 className="tracking-wide">
            {capitalizeFirst(pokemonData.name)}
          </h1>
          <h1 className="font-medium text-muted-foreground">#{pokemonData.id}</h1>
        </div>
        <PrevNextPokemon
          previousPokemon={previousPokemon}
          nextPokemon={nextPokemon}
        />
      </div>
      <div className="mt-6 flex items-start gap-18">
        {/* POKEMON IMAGE */}
        <PokemonSpriteViewer
          pokemonId={pokemonData.id}
          name={capitalizeFirst(pokemonData.name)}
          sprites={{
            frontDefault: pokemonData.sprites.front_default,
            backDefault: pokemonData.sprites.back_default,
            frontShiny: pokemonData.sprites.front_shiny,
            backShiny: pokemonData.sprites.back_shiny,

            frontAnimated: blackAndWhite?.animated?.front_default ?? null,
            backAnimated: blackAndWhite?.animated?.back_default ?? null,
            frontAnimatedShiny: blackAndWhite?.animated?.front_shiny ?? null,
            backAnimatedShiny: blackAndWhite?.animated?.back_shiny ?? null,
          }}
        />
        {/* BASIC INFO SECTION */}
        <PokemonOverview speciesData={speciesData} pokemonData={pokemonData} />
      </div>

      {/* STATS */}
      <div className="mt-8">
        <h3 className=" mb-2">Base Stats</h3>
        {/* todo: add total stat count, range at lvl 50, range at level 100 */}
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

      <div className="mt-8">
        <h3 className=" mb-2">Evolution Path</h3>

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

      <div>
        <h3 className="mt-8 mb-2 ">Moves</h3>
        <MovesTable initialMoves={pokemonData.moves} />
      </div>
    </div>
  );
}
