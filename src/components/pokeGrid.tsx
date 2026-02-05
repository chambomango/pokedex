"use client";
import { NamedAPIResource } from "pokenode-ts";
import { PokeDisplayCard } from "./pokeCard";
import { idFromUrl } from "@/helpers/gridHelpers";
import "./pokeGrid.css";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

type PokeGridProps = {
  pokemonTypes: NamedAPIResource[];
  pokemon: NamedAPIResource[];
};

export default function PokeGrid(props: PokeGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(window.location.search);
      if (value) params.set(name, value);
      else params.delete(name);
      router.push(`/pokedex?${params.toString()}`);
    },
    [router, searchParams],
  );

  const updateType = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      updateParams("type", e.target.value);
    },
    [],
  );

  const updateSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateParams("search", e.target.value);
    },
    [],
  );

  return (
    <div className="pokedex-container">
      <div className="flex justify-between gap-2 mb-2 px-[2px]">
        <input
          id="poke-search-input"
          className="rounded-md border pl-2"
          placeholder="Search"
          onChange={updateSearch}
          defaultValue={searchParams.get("search") || ""}
        ></input>
        <div className="flex gap-2">
          <select
            id="type"
            name="type"
            className="rounded-md border px-3 py-2 text-sm"
            value={searchParams.get("type") || "all"}
            onChange={updateType}
          >
            <option value="all">All Types</option>
            {props.pokemonTypes.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <div className="poke-grid">
          {props.pokemon.map((p) => {
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
      </div>
    </div>
  );
}
