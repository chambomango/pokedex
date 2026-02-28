"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Toggle } from "./ui/toggle";
import { capitalizeFirst, formatGeneration } from "@/helpers/gridHelpers";
import { NamedAPIResource } from "pokenode-ts";

type PokeGridToolbarProps = {
  pokemonTypes: NamedAPIResource[];
  generations: NamedAPIResource[];
  shiny: boolean;
  onShinyToggle: () => void;
};

export default function PokeGridToolbar({
  pokemonTypes,
  generations,
  shiny,
  onShinyToggle,
}: PokeGridToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedType, setSelectedType] = React.useState("");
  const [selectedGen, setSelectedGen] = React.useState("");

  useEffect(() => {
    const type = searchParams.get("type") || "all";
    const gen = searchParams.get("gen") || "all";
    setSelectedType(type);
    setSelectedGen(gen);
  }, [searchParams]);

  const updateParams = React.useCallback(
    (name: string, value?: string) => {
      const params = new URLSearchParams(window.location.search);
      if (value) params.set(name, value);
      else params.delete(name);
      router.push(`/?${params.toString()}`);
    },
    [router],
  );

  const updateGen = React.useCallback(
    (value: string) => {
      setSelectedGen(value);
      updateParams("gen", value === "all" ? undefined : value);
    },
    [updateParams],
  );

  const updateType = React.useCallback(
    (value: string) => {
      setSelectedType(value);
      updateParams("type", value === "all" ? undefined : value);
    },
    [updateParams],
  );

  const updateSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateParams("search", e.target.value);
    },
    [updateParams],
  );

  return (
    <div className="flex justify-between mb-2">
      <Input
        id="poke-search-input"
        className="w-90"
        placeholder="Search"
        autoComplete="off"
        onChange={updateSearch}
        defaultValue={searchParams.get("search") || ""}
      />

      <div className="flex gap-3">
        <Toggle
          pressed={shiny}
          onPressedChange={onShinyToggle}
          aria-label="Toggle shiny sprites"
          variant="outline"
          className="flex data-[state=on]:bg-red-500/15 data-[state=on]:text-red-500 px-6"
        >
          Shiny
        </Toggle>

        <Select value={selectedGen} onValueChange={updateGen}>
          <SelectTrigger className="w-full max-w-48">
            {selectedGen === "" ? (
              <span className="truncate">All Generations</span>
            ) : (
              <SelectValue />
            )}
          </SelectTrigger>

          <SelectContent position="popper">
            <SelectGroup>
              <SelectLabel>Generations</SelectLabel>
              <SelectItem value="all">All Generations</SelectItem>
              {generations.map((t) => (
                <SelectItem key={t.name} value={t.name}>
                  {formatGeneration(t.name)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={updateType}>
          <SelectTrigger className="w-full max-w-48">
            {selectedType === "" ? (
              <span className="truncate">All Types</span>
            ) : (
              <SelectValue />
            )}
          </SelectTrigger>

          <SelectContent position="popper">
            <SelectGroup>
              <SelectLabel>Types</SelectLabel>
              <SelectItem value="all">All Types</SelectItem>
              {pokemonTypes.map((t) => (
                <SelectItem key={t.name} value={t.name}>
                  {capitalizeFirst(t.name)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
