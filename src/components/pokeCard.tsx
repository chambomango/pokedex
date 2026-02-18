import Link from "next/link";

export function PokeDisplayCard({ name, id }: { name: string; id: string }) {
  return (
    <Link
      href={`/pokedex/${name}`}
      className="group block focus-visible:outline-none"
    >
      <div className="overflow-hidden rounded-xl bg-white ring-1 ring-inset ring-zinc-200 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md hover:ring-zinc-300">
        <div className="flex h-22 items-center justify-center bg-zinc-50/40">
          <img
            className="h-24 w-24 [image-rendering:pixelated]"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={name}
            loading="lazy"
            decoding="async"
            width={96}
            height={96}
          />{" "}
        </div>

        <div className="flex items-baseline justify-between px-2.5 py-2">
          <h3 className="truncate text-sm font-medium capitalize text-zinc-800">
            {name}
          </h3>
          <p className="shrink-0 text-xs text-zinc-500 tabular-nums">#{id}</p>
        </div>
      </div>
    </Link>
  );
}
