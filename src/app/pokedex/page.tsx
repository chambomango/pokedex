import { PokeDisplayCard } from "@/components/pokeCard";
import { NamedAPIResourceList, Pokemon, PokemonClient } from "pokenode-ts"; // Import the Client
import "./pokedex.css";

export default async function Pokedex() {
  const api = new PokemonClient();
  const list: NamedAPIResourceList = await api.listPokemons(0, 30);
  const pokemons: Pokemon[] = await Promise.all(
    list.results.map((p) => api.getPokemonByName(p.name)),
  );

  return (
    <div className="pokedex-container">
      <h1 className="mb-[8px] text-center">Pokédex Demo</h1>
      {/* <h3 className="mb-[20px] text-center">
        Search for your favorite pokémon or filter by generation/type!
      </h3> */}
      <div>
        <div className="poke-grid">
          {pokemons.map((p) => {
            return <PokeDisplayCard key={p.name} pokemon={p}></PokeDisplayCard>;
          })}
        </div>
      </div>
    </div>
  );
}
