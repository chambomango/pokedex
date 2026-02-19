import { EvolutionDetail } from "pokenode-ts";

export function idFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  if (!match) throw new Error(`Could not parse id from ${url}`);
  return Number(match[1]);
}

export function formatGeneration(rawName: string): string {
  const match = rawName.match(/generation-(.+)/);
  if (!match) throw new Error(`Could not parse generation from ${rawName}`);
  return `Generation ${match[1].toUpperCase()}`;
}

export function capitalizeFirst(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function prettyName(s: string) {
  return s
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function prettyPrintMove(s: string) {
  const parts = s.split("-");
  let partsUppercase: string[] = [];
  parts.forEach((part) =>
    partsUppercase.push(part.charAt(0).toUpperCase() + part.slice(1)),
  );
  return partsUppercase.join(" ");
}

export function prettyMoveMethod(s: string) {
  switch (s) {
    case "machine":
      return "TM/HM";
    case "level-up":
      return "Level Up";
    case "tutor":
      return "Move Tutor";
    case "egg":
      return "Egg Move";
    default:
      return s;
  }
}

export function prettyStat(s: string) {
  const statToAbbr: Record<string, string> = {
    hp: "HP",
    attack: "ATT",
    defense: "DEF",
    "special-attack": "SPA",
    "special-defense": "SPD",
    speed: "SPE",
  };
  return statToAbbr[s];
}

export function formatEvolutionMethod(details?: EvolutionDetail[]) {
  const detail = details?.[0];
  if (!detail) return "";

  if (detail.min_level != null) return `Level ${detail.min_level}`;
  if (detail.item?.name) return `Use ${prettyName(detail.item.name)}`;

  if (detail.trigger?.name === "trade") {
    if (detail.held_item?.name)
      return `Trade holding ${prettyName(detail.held_item.name)}`;
    if (detail.trade_species?.name)
      return `Trade for ${prettyName(detail.trade_species.name)}`;
    return "Trade";
  }

  if (detail.trigger?.name === "level-up") {
    if (detail.min_happiness != null)
      return `Level up (Happiness ${detail.min_happiness}+)`;
    if (detail.time_of_day)
      return `Level up (${prettyName(detail.time_of_day)})`;
    if (detail.location?.name)
      return `Level up at ${prettyName(detail.location.name)}`;
    return "Level up";
  }

  return detail.trigger?.name ? prettyName(detail.trigger.name) : "Evolve";
}
