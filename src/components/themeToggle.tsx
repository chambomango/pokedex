"use client";

import { ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const THEME_OPTIONS = [
  {
    value: "light",
    label: "Light",
    ball: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/premier-ball.png",
  },
  {
    value: "dark",
    label: "Dark",
    ball: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/luxury-ball.png",
  },
  {
    value: "system",
    label: "System",
    ball: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
  },
] as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const current =
    THEME_OPTIONS.find((o) => o.value === theme) ?? THEME_OPTIONS[1];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="border w-30 cursor-pointer justify-start gap-2 px-2 text-red-500 hover:text-red-400"
        >
          <img
            src={current.ball}
            alt=""
            width={20}
            height={20}
            className="scale-[1.5]"
          />
          <span className="text-sm">{current.label}</span>
          <ChevronDown className="ml-auto size-3 opacity-80" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {THEME_OPTIONS.map((o) => (
          <DropdownMenuItem key={o.value} onClick={() => setTheme(o.value)}>
            <img
              src={o.ball}
              alt=""
              width={20}
              height={20}
              className="scale-[1.5]"
            />
            {o.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
