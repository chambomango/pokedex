import { EvolutionClient, Pokemon, PokemonClient } from "pokenode-ts";
import "../../../components/pokeGrid.css";
import { capitalizeFirst, idFromUrl } from "@/helpers/gridHelpers";
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
import { BarChartHorizontal } from "@/components/ui/barcharthorizontal";
import EvolutionLine from "@/components/evolutionLine";

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

  //Todo... all one table, sorting on all, default to level learned down and level-up fowwn for method. Dropdown to only show certain methods. Split button for each generation...
  ///After: Lazy load the first 30? and load more when scroll?

  return (
    <div className="flex flex-col mt-10 gap-8">
      <div className="self-center text-center">
        <div
          className="border rounded-lg"
          style={{
            boxShadow: `0 4px 6px -1px ${typesToColors[pokemonData.types[0].type.name]}`,
          }}
        >
          <img
            className="w-48 h-48 pixelated"
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            loading="lazy"
            decoding="async"
            width={192}
            height={192}
          />
        </div>

        <h2>{capitalizeFirst(pokemonData.name)}</h2>
        <h3>#{pokemonData.id}</h3>
      </div>
      <h3>
        <b>Evolution Line</b>
      </h3>
      <div className="flex items-center">
        <EvolutionLine chainLink={evolutionData.chain} />{" "}
      </div>
      <div className="mt-8 flex flex-col gap-4">
        <h3>
          <b>Basic Info</b>
        </h3>
        <div className="flex">
          <h4 className="">Type</h4>
          <div className="flex ml-3 shadow-sm">
            {pokemonData.types.map((t) => (
              <PokeTypeBox key={t.type.name} type={t.type.name} />
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <h4>Abilities</h4>
          {pokemonData.abilities.map((ability) => (
            <div key={ability.ability.name} className="border px-2 shadow-xs">
              {capitalizeFirst(ability.ability.name)}
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <h4>Height</h4>
          <div className="border px-2 shadow-xs">
            {pokemonData.height / 10}m
          </div>
        </div>
        <div className="flex gap-3">
          <h4>Weight</h4>
          <div className="border px-2 shadow-xs">
            {pokemonData.weight / 10}kg
          </div>
        </div>
      </div>
      <div>
        <h3>
          <b>Stats</b>
        </h3>
        <BarChartHorizontal
          chartData={pokemonData.stats.map((stat) => {
            return {
              key: stat.stat.name,
              value: stat.base_stat,
            };
          })}
          barColor={typesToColors[pokemonData.types[0].type.name]}
        />
      </div>
      <div>
        <h3>
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
      </div>
    </div>
  );
}
