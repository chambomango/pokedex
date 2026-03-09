export function idFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  if (!match) throw new Error(`Could not parse id from ${url}`);
  return Number(match[1]);
}
