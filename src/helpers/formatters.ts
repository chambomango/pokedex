import { EvolutionDetail } from "pokenode-ts";

export function capitalizeFirst(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDisplayName(value: string): string {
  if (!value) return "";
  return value
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatEvolutionMethod(details?: EvolutionDetail[]) {
  const detail = details?.[0];
  if (!detail) return "";

  if (detail.min_level != null) return `Level ${detail.min_level}`;
  if (detail.item?.name) return `Use ${formatDisplayName(detail.item.name)}`;

  if (detail.trigger?.name === "trade") {
    if (detail.held_item?.name)
      return `Trade holding ${formatDisplayName(detail.held_item.name)}`;
    if (detail.trade_species?.name)
      return `Trade for ${formatPokemonDisplayName(detail.trade_species.name)}`;
    return "Trade";
  }

  if (detail.trigger?.name === "level-up") {
    if (detail.min_happiness != null)
      return `Level up (Happiness ${detail.min_happiness}+)`;
    if (detail.time_of_day)
      return `Level up (${formatDisplayName(detail.time_of_day)})`;
    if (detail.location?.name)
      return `Level up at ${formatDisplayName(detail.location.name)}`;
    return "Level up";
  }

  return detail.trigger?.name
    ? formatDisplayName(detail.trigger.name)
    : "Evolve";
}

export function formatGeneration(rawName: string): string {
  const match = rawName.match(/generation-(.+)/);
  if (!match) throw new Error(`Could not parse generation from ${rawName}`);
  return `Generation ${match[1].toUpperCase()}`;
}

export function formatMoveMethod(s: string): string {
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

export function formatPokemonDisplayName(value: string): string {
  const specialCases: Record<string, string> = {
    "mr-mime": "Mr. Mime",
    "mime-jr": "Mime Jr.",
    "mr-rime": "Mr. Rime",
    "type-null": "Type: Null",
    "jangmo-o": "Jangmo-o",
    "hakamo-o": "Hakamo-o",
    "kommo-o": "Kommo-o",
    "wo-chien": "Wo-Chien",
    "chien-pao": "Chien-Pao",
    "ting-lu": "Ting-Lu",
    "chi-yu": "Chi-Yu",
    "porygon-z": "Porygon-Z",
    "ho-oh": "Ho-Oh",
  };

  const normalized = value.trim().toLowerCase();

  if (specialCases[normalized]) {
    return specialCases[normalized];
  }

  return formatDisplayName(normalized);
}

export function getStatAbbreviation(s: string): string {
  const statToAbbr: Record<string, string> = {
    hp: "HP",
    attack: "ATT",
    defense: "DEF",
    "special-attack": "SPA",
    "special-defense": "SPD",
    speed: "SPE",
  };
  return statToAbbr[s] || "";
}
