import { capitalizeFirst } from "@/helpers/gridHelpers";
import {
  Layers,
  Sparkles,
  Egg,
  Ruler,
  WeightIcon,
  Users,
  Mars,
  Venus,
} from "lucide-react";
import PokeTypeBox from "./pokeTypeBox";
import { Pokemon, PokemonSpecies } from "pokenode-ts";
import Link from "next/link";

export default function PokemonOverview({
  pokemonData,
  speciesData,
}: {
  pokemonData: Pokemon;
  speciesData: PokemonSpecies;
}) {
  return (
    <div className="flex flex-col min-w-[520px] ">
      <h3 className=" mb-2">Overview</h3>

      <div className="flex flex-col px-8 py-6 gap-4 text-foreground border rounded-lg shadow-sm ">
        {/* TYPES */}
        <div className="flex items-baseline gap-4">
          <div className="w-30 flex items-center gap-2 text-foreground ">
            <Layers className="h-4 w-4 text-muted-foreground" />
            <span>{pokemonData.types.length > 1 ? "Types" : "Type"}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {pokemonData.types.map((t) => (
              <Link key={t.type.name} href={`/?type=${t.type.name}`}>
                <PokeTypeBox type={t.type.name} />
              </Link>
            ))}
          </div>
        </div>

        {/* ABILITIES */}
        <div className="flex items-start gap-4">
          <div className="w-30 flex items-center gap-2 text-foreground ">
            <Sparkles className="h-4 w-4 text-muted-foreground" />
            <span>Abilities</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {pokemonData.abilities.map((ability) => (
              <div
                key={ability.ability.name}
                className="text-muted-foreground pr-2 py-0.5 rounded-sm"
              >
                {capitalizeFirst(ability.ability.name)}
              </div>
            ))}
          </div>
        </div>

        {/* EGG GROUP */}
        <div className="flex items-start gap-4">
          <div className="w-30 flex items-center gap-2 text-foreground ">
            <Egg className="h-4 w-4 text-muted-foreground" />
            <span>Egg Group</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {speciesData.egg_groups.map((eggGroup) => (
              <div
                key={eggGroup.name}
                className="text-muted-foreground pr-2 py-0.5 rounded-sm"
              >
                {capitalizeFirst(eggGroup.name)}
              </div>
            ))}
          </div>
        </div>

        {/* HEIGHT */}
        <div className="flex items-center gap-4">
          <div className="w-30 flex items-center gap-2 text-foreground ">
            <Ruler className="h-4 w-4 text-muted-foreground" />
            <span>Height</span>
          </div>
          <div className="text-muted-foreground">
            {pokemonData.height / 10} m
          </div>
        </div>

        {/* WEIGHT */}
        <div className="flex items-center gap-4">
          <div className="w-30 flex items-center gap-2 text-foreground ">
            <WeightIcon className="h-4 w-4 text-muted-foreground" />
            <span>Weight</span>
          </div>
          <div className="text-muted-foreground">
            {pokemonData.weight / 10} kg
          </div>
        </div>
        {/* GENDER RATIO */}
        <div className="flex items-center gap-4">
          <div className="w-30 flex items-center gap-2 text-foreground ">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>Gender</span>
          </div>

          {speciesData.gender_rate === -1 ? (
            <div className="text-muted-foreground">Genderless</div>
          ) : (
            (() => {
              const femalePct = (speciesData.gender_rate / 8) * 100;
              const malePct = 100 - femalePct;
              return (
                <div className="flex items-center gap-3 text-muted-foreground">
                  {malePct > 0 && (
                    <div className="flex items-center gap-1">
                      <Mars className="h-4 w-4 text-blue-600" />
                      <span>{malePct.toFixed(1)}%</span>
                    </div>
                  )}
                  {malePct > 0 && femalePct > 0 && (
                    <span className="text-muted-foreground">/</span>
                  )}
                  {femalePct > 0 && (
                    <div className="flex items-center gap-1">
                      <Venus className="h-4 w-4 text-pink-600" />
                      <span>{femalePct.toFixed(1)}%</span>
                    </div>
                  )}
                </div>
              );
            })()
          )}
        </div>
      </div>
    </div>
  );
}
