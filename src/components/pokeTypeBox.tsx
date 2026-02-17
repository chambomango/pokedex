import { capitalizeFirst } from "@/helpers/gridHelpers";

const typesToColorsOld: Record<string, string> = {
  normal: "#a8a878",
  fighting: "#c03028",
  flying: "#a890f0",
  poison: "#a040a0",
  ground: "#e0c068",
  rock: "#b8a038",
  bug: "#a8b820",
  ghost: "#705898",
  steel: "#b8b8d0",
  fire: "#f08030",
  water: "#6890f0",
  grass: "#78c850",
  electric: "#f8d030",
  psychic: "#f85888",
  ice: "#98d8d8",
  dragon: "#98d8d8",
  dark: "#98d8d8",
  fairy: "#e397d1",
  stellar: "",
  unknown: "",
};

// Reference: https://www.pokemonaaah.net/art/colordex/
export const typesToColors: Record<string, string> = {
  normal: "#aab09f",
  fighting: "#cb5f48",
  flying: "#7da6de",
  poison: "#b468b7",
  ground: "#cc9f4f",
  rock: "#b2a061",
  bug: "#94bc4a",
  ghost: "#846ab6",
  steel: "#89a1b0",
  fire: "#ea7a3c",
  water: "#539ae2",
  grass: "#71c558",
  electric: "#e5c531",
  psychic: "#e5709b",
  ice: "#70cbd4",
  dragon: "#6a7baf",
  dark: "#736c75",
  fairy: "#e397d1",
  stellar: "#81a596",
  unknown: "#81a596",
};

export default function PokeTypeBox({ type }: { type: string }) {
  const color = typesToColors[type] || "#81a596";
  return (
    <div
      className="w-fit px-2 p-0.5 font-semibold tracking-wider border shadow-sm"
      style={{ backgroundColor: color, color: "white" }}
    >
      {capitalizeFirst(type)}
    </div>
  );
}
