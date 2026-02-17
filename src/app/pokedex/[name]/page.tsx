import { EvolutionClient, Pokemon, PokemonClient } from "pokenode-ts";
import "../../../components/pokeGrid.css";
import { capitalizeFirst, idFromUrl, prettyStat } from "@/helpers/gridHelpers";
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
  const speciesData = await pokemonClient.getPokemonSpeciesByName(
    pokemonData.species.name,
  );
  const evolutionClient = new EvolutionClient();
  const evolutionData = await evolutionClient.getEvolutionChainById(
    idFromUrl(speciesData.evolution_chain.url),
  );

  return (
    <div className="flex flex-col mt-10 gap-8 mb-40">
      <div className="self-center text-center">
        <div className="border rounded-lg shadow-md">
          <img
            className="w-48 h-48 pixelated"
            src={pokemonData.sprites.front_default || ""}
            alt={pokemonData.name}
            loading="lazy"
            decoding="async"
            width={192}
            height={192}
          />
        </div>

        <h2 className="tracking-wide">{capitalizeFirst(pokemonData.name)}</h2>
        <h3 className="text-zinc-600">#{pokemonData.id}</h3>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <h3 className="tracking-wide">
          <b>Basic Info</b>
        </h3>
        <div className="flex">
          <h4 className="">
            {pokemonData.types.length > 1 ? "Types" : "Type"}
          </h4>
          <div className="flex ml-3 gap-2">
            {pokemonData.types.map((t) => (
              <PokeTypeBox key={t.type.name} type={t.type.name} />
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <h4>Abilities</h4>
          {pokemonData.abilities.map((ability) => (
            <div key={ability.ability.name} className="border px-2 shadow-xs">
              {capitalizeFirst(ability.ability.name)}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <h4>Height</h4>
          <div className="border px-2 shadow-xs">
            {pokemonData.height / 10}m
          </div>
        </div>
        <div className="flex gap-2">
          <h4>Weight</h4>
          <div className="border px-2 shadow-xs">
            {pokemonData.weight / 10}kg
          </div>
        </div>
      </div>

      <div>
        <h3 className="tracking-wide">
          <b>Evolution Path</b>
        </h3>
        <EvolutionTree
          chainLink={evolutionData.chain}
          gap={idFromUrl(speciesData.evolution_chain.url) === 67 ? "100" : "40"}
          arrowColor={typesToColors[pokemonData.types[0].type.name]}
        />
      </div>

      <div>
        <h3 className="tracking-wide">
          <b>Stats</b>
        </h3>
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

      {/* <div>
        <h3 className="tracking-wide">
          <b>Moves</b>
        </h3>
        <div className="border rounded-md shadow-md p-6 flex flex-col gap-2 w-full">
          <Table>
            <TableCaption>
              A list of {capitalizeFirst(pokemonData.name)}'s moves
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Move</TableHead>
                <TableHead>Level Learned</TableHead>
                <TableHead>Method Learned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pokemonData.moves.map((move) => {
                return (
                  <TableRow key={move.move.name}>
                    <TableCell>{capitalizeFirst(move.move.name)}</TableCell>
                    <TableCell>
                      {move.version_group_details[0].level_learned_at}
                    </TableCell>
                    <TableCell>
                      {move.version_group_details[0].move_learn_method.name}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div> */}
    </div>
  );
}
