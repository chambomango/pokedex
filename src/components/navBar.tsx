import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import ThemeToggle from "./themeToggle";
import GitHubIcon from "./icons/GitHubIcon";

export interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "border-b border-border/40 bg-background/80 backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-xl italic text-red-500 transition-opacity hover:opacity-70 [font-family:var(--font-display)]"
        >
          Pokédex
        </Link>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild className="text-red-500 hover:text-red-400">
            <Link
              href="https://github.com/chambomango/pokedex"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source on GitHub"
            >
              <GitHubIcon className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
