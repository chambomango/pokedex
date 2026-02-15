"use client";

import { usePathname } from "next/navigation";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400"],
});

const getDisplayName = (pathname: string) => {
  if (pathname === "/") return "| Home";
  if (pathname.startsWith("/pokedex")) return "| Pokémon Viewer";
  else return "";
};

export default function DisplayPath() {
  const pathname = usePathname();
  return (
    <div className={`navBarLogo text-zinc-400 ${spaceGrotesk.className}`}>
      {getDisplayName(pathname)}
    </div>
  );
}
