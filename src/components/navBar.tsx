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
        "border-b border-border/40 bg-background/70 backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-xl font-bold tracking hover:opacity-80 transition-opacity"
        >
          Pokédex
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild>
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
