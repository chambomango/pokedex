import { NamedAPIResource, PokemonClient } from "pokenode-ts"; // Import the Client
import PokeGrid from "@/components/pokeGrid";
import { idFromUrl } from "@/helpers/gridHelpers";

export default async function PokedexPage({
  searchParams, // Can be string | string[] | undefined
}: {
  searchParams?: Promise<{ type: string; search: string }>;
}) {
  const searchParamsResult = await searchParams;
  const selectedType = searchParamsResult?.type || "all";
  const search = searchParamsResult?.search || "";

  const api = new PokemonClient();
  const pokemons: NamedAPIResource[] = (await api.listPokemons(0, 1025))
    .results;
  const pokemonTypes: NamedAPIResource[] = (await api.listTypes(0, 100))
    .results;
  const typesToPokemonNames: Map<string, Set<string>> = new Map();
  await Promise.all(
    pokemonTypes.map(async (type) => {
      const pokemonNames = (
        await api.getTypeById(idFromUrl(type.url))
      ).pokemon.map((res) => res.pokemon.name);
      typesToPokemonNames.set(type.name, new Set(pokemonNames));
    }),
  );

  const pokemonSearchFiltered = search
    ? pokemons.filter((p1) =>
        p1.name.toLowerCase().startsWith(search.toLowerCase()),
      )
    : pokemons;
  const pokemonTypeFiltered =
    selectedType === "all"
      ? pokemonSearchFiltered
      : pokemonSearchFiltered.filter((pok) =>
          typesToPokemonNames.get(selectedType)?.has(pok.name),
        );
  const pokemonFiltered = pokemonTypeFiltered;

  return (
    <div className="flex flex-col mt-[80px] mx-auto">
      <h1 className="mb-[8px] text-center">Pokédex Demo</h1>
      <h3 className="mb-[20px] text-center">
        Search for your favorite pokémon and filter by type!
      </h3>
      <PokeGrid pokemon={pokemonFiltered} pokemonTypes={pokemonTypes} />
    </div>
  );
}
