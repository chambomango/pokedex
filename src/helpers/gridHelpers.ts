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
  const d = details?.[0];
  if (!d) return "";

  if (d.min_level != null) return `Level ${d.min_level}`;
  if (d.item?.name) return `Use ${prettyName(d.item.name)}`;

  if (d.trigger?.name === "trade") {
    if (d.held_item?.name)
      return `Trade holding ${prettyName(d.held_item.name)}`;
    if (d.trade_species?.name)
      return `Trade for ${prettyName(d.trade_species.name)}`;
    return "Trade";
  }

  if (d.trigger?.name === "level-up") {
    if (d.min_happiness != null)
      return `Level up (Happiness ${d.min_happiness}+)`;
    if (d.time_of_day) return `Level up (${prettyName(d.time_of_day)})`;
    if (d.location?.name) return `Level up at ${prettyName(d.location.name)}`;
    return "Level up";
  }

  return d.trigger?.name ? prettyName(d.trigger.name) : "Evolve";
}
