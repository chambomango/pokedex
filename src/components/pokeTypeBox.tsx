import { capitalizeFirst } from "@/helpers/gridHelpers";

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
      className="w-fit px-2.5 p-1 font-semibold tracking-wider border rounded-full"
      style={{ backgroundColor: color, color: "white" }}
    >
      {capitalizeFirst(type)}
    </div>
  );
}
