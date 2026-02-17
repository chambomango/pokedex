import { NamedAPIResource, PokemonClient } from "pokenode-ts";
import PokeGrid from "@/components/pokeGrid";
import { idFromUrl } from "@/helpers/gridHelpers";
import { getGenerationById, getGenerations } from "@/api/pokemon";

export default async function PokedexPage({
  searchParams,
}: {
  searchParams?: Promise<{ type: string; gen: string; search: string }>;
}) {
  const searchParamsResult = await searchParams;
  const selectedType = searchParamsResult?.type;
  const selectedGen = searchParamsResult?.gen;
  const search = searchParamsResult?.search || "";

  const api = new PokemonClient();
  const pokemons: NamedAPIResource[] = (await api.listPokemons(0, 1025))
    .results;
  const pokemonTypes: NamedAPIResource[] = (await api.listTypes(0, 100))
    .results;
  const typesToPokemon: Map<string, Set<string>> = new Map();
  await Promise.all(
    pokemonTypes.map(async (type) => {
      const pokemonNames = (
        await api.getTypeById(idFromUrl(type.url))
      ).pokemon.map((res) => res.pokemon.name);
      typesToPokemon.set(type.name, new Set(pokemonNames));
    }),
  );
  const generations: NamedAPIResource[] = (await getGenerations()).results;
  const gensToPokemon: Map<string, Set<string>> = new Map();
  await Promise.all(
    generations.map(async (gen) => {
      const pokemonNames = (
        await getGenerationById(idFromUrl(gen.url))
      ).pokemon_species.map((pok: NamedAPIResource) => pok.name);
      gensToPokemon.set(gen.name, new Set(pokemonNames));
    }),
  );

  const name = search.toLowerCase();

  const pokemonForType =
    selectedType === undefined ? null : typesToPokemon.get(selectedType);
  const pokemonForGen =
    selectedGen === undefined ? null : gensToPokemon.get(selectedGen);
  let pokemonFiltered = pokemons.filter((pok) => {
    if (name && !pok.name.toLowerCase().startsWith(name)) return false;
    if (pokemonForType && !pokemonForType.has(pok.name)) return false;
    if (pokemonForGen && !pokemonForGen.has(pok.name)) return false;
    return true;
  });

  return (
    <div className="mx-auto flex flex-col px-4 pt-14 sm:pt-18">
      <div className="mb-6">
        <h1 className="text-4xl font-semibold tracking-wide text-zinc-800">
          Interactive Pokédex
        </h1>

        <p className="mt-3 text-base text-zinc-600">
          Explore Pokémon by generation and type. Select any Pokémon to view
          detailed stats, abilities, and evolution data.
        </p>

        <p className="mt-2 text-xs text-zinc-500">
          Pokémon and Pokédex are trademarks of Nintendo. This project is a
          fan-made application for educational purposes only.
        </p>
      </div>

      <PokeGrid
        pokemon={pokemonFiltered}
        pokemonTypes={pokemonTypes}
        generations={generations}
      />
    </div>
  );
}
