"use client";
import { NamedAPIResource } from "pokenode-ts";
import { PokeDisplayCard } from "./pokeCard";
import { idFromUrl } from "@/helpers/gridHelpers";
import PokeGridToolbar from "./pokeGridToolbar";
import React, { useEffect } from "react";

type PokeGridProps = {
  pokemonTypes: NamedAPIResource[];
  generations: NamedAPIResource[];
  pokemon: NamedAPIResource[];
};

const BATCH_SIZE = 32;

export default function PokeGrid(props: PokeGridProps) {
  const [pokemonShown, setPokemonShown] = React.useState(BATCH_SIZE * 2);
  const [shiny, setShiny] = React.useState(false);

  const visiblePokemon = React.useMemo(
    () => props.pokemon.slice(0, pokemonShown),
    [props.pokemon, pokemonShown],
  );

  const loadingCallback = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0]?.isIntersecting) return;
          setPokemonShown((prev) =>
            Math.min(prev + BATCH_SIZE, props.pokemon.length),
          );
        },
        { rootMargin: "300px", threshold: 0 },
      );
      observer.observe(node);

      return () => observer.disconnect();
    },
    [props.pokemon.length],
  );

  React.useEffect(() => setPokemonShown(BATCH_SIZE * 2), [props.pokemon]);
  return (
    <div className="w-full">
      <div className="sticky top-0 z-20 -mx-4 bg-background/90 px-4 pb-3 py-6 backdrop-blur supports-[backdrop-filter]:bg-background/80 rounded-md">
        <PokeGridToolbar
          pokemonTypes={props.pokemonTypes}
          generations={props.generations}
          shiny={shiny}
          onShinyToggle={() => setShiny((s) => !s)}
        />
      </div>

      <div className="mt-1 grid gap-3 sm:gap-4 [grid-template-columns:repeat(auto-fill,minmax(150px,1fr))]">
        {visiblePokemon.map((p) => {
          const id = idFromUrl(p.url);
          return (
            <PokeDisplayCard key={p.name} name={p.name} id={id.toString()} shiny={shiny} />
          );
        })}
      </div>

      <div ref={loadingCallback} className="h-px" />

      {pokemonShown < props.pokemon.length ? (
        <div className="my-6 flex justify-center">
          <span className="text-sm text-muted-foreground">Loading…</span>
        </div>
      ) : null}
    </div>
  );
}
