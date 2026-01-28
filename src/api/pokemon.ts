import { NamedAPIResourceList, PokemonClient } from "pokenode-ts";

export async function getAllPokemon(
  offset?: number,
  limit?: number,
): Promise<NamedAPIResourceList> {
  const api = new PokemonClient();
  return await api.listPokemons(offset, limit);
}
