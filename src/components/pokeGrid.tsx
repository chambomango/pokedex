"use client";
import { NamedAPIResource } from "pokenode-ts";
import { PokeDisplayCard } from "./pokeCard";
import { idFromUrl } from "@/helpers/gridHelpers";
import "./pokeGrid.css";
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
    <div className="pokedex-container">
      <PokeGridToolbar
        pokemonTypes={props.pokemonTypes}
        generations={props.generations}
      />
      <div className="mt-1">
        <div className="poke-grid">
          {visiblePokemon.map((p) => {
            const id = idFromUrl(p.url);
            return (
              <PokeDisplayCard
                key={p.name}
                name={p.name}
                id={id.toString()}
              ></PokeDisplayCard>
            );
          })}
        </div>
        <div ref={loadingCallback} style={{ height: 1 }} />
        {pokemonShown < props.pokemon.length ? (
          <span className="flex justify-center mt-3">Loading...</span>
        ) : null}
      </div>
    </div>
  );
}
