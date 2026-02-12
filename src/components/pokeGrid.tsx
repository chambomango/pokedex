"use client";
import { NamedAPIResource } from "pokenode-ts";
import { PokeDisplayCard } from "./pokeCard";
import {
  capitalizeFirst,
  formatGeneration,
  idFromUrl,
} from "@/helpers/gridHelpers";
import "./pokeGrid.css";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type PokeGridProps = {
  pokemonTypes: NamedAPIResource[];
  generations: NamedAPIResource[];
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

  const updateGen = React.useCallback(
    (value: string) => updateParams("gen", value),
    [],
  );

  const updateType = React.useCallback(
    (value: string) => updateParams("type", value),
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
      <div className="flex justify-between mb-2">
        <input
          id="poke-search-input"
          className="rounded-md border pl-2"
          placeholder="Search"
          onChange={updateSearch}
          defaultValue={searchParams.get("search") || ""}
        ></input>
        <div className="flex gap-3">
          <Select
            value={searchParams.get("gen") || "all"}
            onValueChange={updateGen}
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectLabel>Generations</SelectLabel>
                <SelectItem value="all">All Generations</SelectItem>
                {props?.generations?.map((t) => (
                  <SelectItem key={t.name} value={t.name}>
                    {formatGeneration(t.name)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={searchParams.get("type") || "all"}
            onValueChange={updateType}
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectLabel>Types</SelectLabel>
                <SelectItem value="all">All Types</SelectItem>
                {props.pokemonTypes.map((t) => (
                  <SelectItem key={t.name} value={t.name}>
                    {capitalizeFirst(t.name)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-1">
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
