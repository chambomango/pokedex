"use client";

import spriteScale from "@/data/spriteScale.json";
import * as React from "react";

import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Sprites = {
  frontDefault?: string | null;
  backDefault?: string | null;
  frontShiny?: string | null;
  backShiny?: string | null;
  frontAnimated?: string | null;
  backAnimated?: string | null;
  frontAnimatedShiny?: string | null;
  backAnimatedShiny?: string | null;
};

function pick(...urls: (string | null | undefined)[]) {
  return urls.find((u) => typeof u === "string" && u.length > 0) ?? null;
}

export default function PokemonSpriteViewer({
  name,
  pokemonId,
  sprites,
}: {
  name: string;
  pokemonId: number;
  sprites: Sprites;
}) {
  const [angle, setAngle] = React.useState<"front" | "back">("front");
  const [isShiny, setIsShiny] = React.useState(false);
  const [animated, setAnimated] = React.useState(false);

  const staticSrc = React.useMemo(() => {
    return isShiny
      ? angle === "back"
        ? pick(sprites.backShiny, sprites.backDefault, sprites.frontDefault)
        : pick(sprites.frontShiny, sprites.frontDefault, sprites.backDefault)
      : angle === "back"
        ? pick(sprites.backDefault, sprites.frontDefault)
        : pick(sprites.frontDefault, sprites.backDefault);
  }, [angle, isShiny, sprites]);

  const animatedSrc = React.useMemo(() => {
    return isShiny
      ? angle === "back"
        ? pick(sprites.backAnimatedShiny, sprites.backAnimated)
        : pick(sprites.frontAnimatedShiny, sprites.frontAnimated)
      : angle === "back"
        ? pick(sprites.backAnimated)
        : pick(sprites.frontAnimated);
  }, [angle, isShiny, sprites]);

  const canAnimate = !!animatedSrc;
  //The animated and static images have varying whitespace surrounding them (static has a lot, animated has none),
  //spriteScale.json stores the ratio to scale each animated image to make the sprites the same size in the box
  const scaleMap = spriteScale as Record<string, number>;
  const animatedScaleFromJson = scaleMap[String(pokemonId)] ?? 1;
  const animatedScale = Math.max(0.25, Math.min(1.0, animatedScaleFromJson));

  React.useEffect(() => {
    if (!canAnimate) setAnimated(false);
  }, [canAnimate]);

  return (
    <div className="flex flex-col">
      <h3 className="mb-2">Sprite</h3>

      <div className="w-fit rounded-lg border px-4 shadow-sm">
        <div className="relative flex h-72 w-72 items-center justify-center">
          {animated && canAnimate ? (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: `scale(${animatedScale})`,
                transformOrigin: "center",
              }}
            >
              <img
                src={animatedSrc!}
                alt={`${name} animated`}
                className="pixelated h-full w-full object-contain"
                decoding="async"
                loading="eager"
                draggable={false}
              />
            </div>
          ) : staticSrc ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={staticSrc}
                alt={name}
                className="pixelated h-full w-full object-contain"
                decoding="async"
                loading="eager"
                draggable={false}
              />
            </div>
          ) : null}
        </div>
      </div>

      <div className=" mt-2.5 flex items-center justify-between gap-4 px-1">
        <ToggleGroup
          type="single"
          size="sm"
          value={angle}
          variant="outline"
          onValueChange={(v) => {
            if (v === "front" || v === "back") setAngle(v);
          }}
          aria-label="Sprite angle"
        >
          <ToggleGroupItem value="front">Front</ToggleGroupItem>
          <ToggleGroupItem value="back">Back</ToggleGroupItem>
        </ToggleGroup>

        <div className="flex items-center gap-2">
          {canAnimate && (
            <Toggle
              variant="outline"
              pressed={animated}
              onPressedChange={setAnimated}
              size="sm"
            >
              Animated
            </Toggle>
          )}

          <Toggle
            variant="outline"
            pressed={isShiny}
            onPressedChange={setIsShiny}
            size="sm"
          >
            Shiny
          </Toggle>
        </div>
      </div>
    </div>
  );
}
