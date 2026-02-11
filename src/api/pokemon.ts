import { NamedAPIResourceList } from "pokenode-ts";

export async function getGenerations(): Promise<NamedAPIResourceList> {
  return await fetch("https://pokeapi.co/api/v2/generation")
    .then((results) => {
      if (results.ok) return results.json();
      throw new Error(`HTTP Error. Status code: ${results.status}`);
    })
    .catch(console.error);
}

export async function getGenerationById(id: number) {
  return await fetch(`https://pokeapi.co/api/v2/generation/${id}/`)
    .then((results) => {
      if (results.ok) return results.json();
      throw new Error(`HTTP Error. Status code: ${results.status}`);
    })
    .catch(console.error);
}
