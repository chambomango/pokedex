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
