"use client";

import { usePathname } from "next/navigation";

const getDisplayName = (pathname: string) => {
  if (pathname === "/") return "| Home";
  if (pathname.startsWith("/pokedex")) return "| Pokédex";
  else return "";
};

export default function DisplayPath() {
  const pathname = usePathname();
  return (
    <div className="navBarLogo text-muted-foreground">
      {getDisplayName(pathname)}
    </div>
  );
}
