"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Route } from "next";

const links: { href: Route; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/pokedex", label: "Pokédex" },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map(({ href, label }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <li key={href}>
            <Button
              variant="ghost"
              className={cn(
                "text-foreground rounded-full",
                isActive &&
                  "underline decoration-2 underline-offset-4 text-foreground",
              )}
              asChild
            >
              <Link href={href}>{label}</Link>
            </Button>
          </li>
        );
      })}
    </>
  );
}
