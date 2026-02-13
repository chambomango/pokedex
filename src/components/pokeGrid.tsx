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

export default function PokeGrid(props: PokeGridProps) {
  const [pokemonShown, setPokemonShown] = React.useState(32);
  const loadingRef = React.useRef<HTMLElement>(null);

  const visiblePokemon = React.useMemo(
    () => props.pokemon.slice(0, pokemonShown),
    [props.pokemon, pokemonShown],
  );

  const showMorePokemon = React.useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const first = entries[0];
      if (!first?.isIntersecting) return;
      console.log("settin");
      setPokemonShown((prev) => Math.min(prev + 32, props.pokemon.length));
    },
    [],
  );

  useEffect(() => {
    if (!loadingRef.current) return;
    const options = { root: null, threshold: 0 };
    let observer = new IntersectionObserver(showMorePokemon, options);
    observer.observe(loadingRef.current);
  }, []);

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
        {pokemonShown < props.pokemon.length ? (
          <span className="flex justify-center mt-3" ref={loadingRef}>
            Loading...
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
