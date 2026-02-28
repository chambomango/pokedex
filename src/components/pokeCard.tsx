import Link from "next/link";

export function PokeDisplayCard({ name, id, shiny = false }: { name: string; id: string; shiny?: boolean }) {
  const spriteUrl = shiny
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <Link href={`/${name}`} className="group block focus-visible:outline-none">
      <div className="overflow-hidden rounded-xl bg-card ring-1 ring-inset ring-border shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:ring-red-500/70 hover:shadow-md hover:shadow-red-500/20">
        <div className="flex h-22 items-center justify-center bg-muted/40">
          <img
            className="h-24 w-24 [image-rendering:pixelated]"
            src={spriteUrl}
            alt={name}
            loading="lazy"
            decoding="async"
            width={96}
            height={96}
          />{" "}
        </div>

        <div className="flex items-baseline justify-between px-2.5 py-2">
          <h3 className="truncate text-sm font-medium capitalize text-foreground">
            {name}
          </h3>
          <p className="shrink-0 text-xs text-muted-foreground tabular-nums">
            #{id}
          </p>
        </div>
      </div>
    </Link>
  );
}
