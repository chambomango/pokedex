import Link from "next/link";

export function PokeDisplayCard({ name, id }: { name: string; id: string }) {
  return (
    <Link href={`/pokedex/${name}`} className="group block">
      <div
        className="
          overflow-hidden rounded-lg bg-white
          border border-zinc-200
          shadow-xs
          transition
          hover:shadow-sm hover:border-zinc-400
        "
      >
        <div className="flex items-center justify-center bg-zinc-50/50 px-1">
          <img
            className="h-24 w-24 [image-rendering:pixelated]"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={name}
            loading="lazy"
            decoding="async"
            width={96}
            height={96}
          />
        </div>

        <div className="flex items-baseline justify-between px-3 py-2">
          <h3 className="truncate text-sm font-semibold capitalize text-zinc-800">
            {name}
          </h3>
          <p className="shrink-0 text-xs text-zinc-500">#{id}</p>
        </div>
      </div>
    </Link>
  );
}
