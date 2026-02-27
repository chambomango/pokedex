"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import ThemeToggle from "./themeToggle";
import NavLinks from "./navLinks";
import { Button } from "@/components/ui/button";
import GitHubIcon from "./icons/GitHubIcon";
import LinkedInIcon from "./icons/LinkedInIcon";
import EmailIcon from "./icons/EmailIcon";

const SCROLL_THRESHOLD = 120;

export default function NavBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-2 z-50 flex justify-center px-4 py-2 pointer-events-none">
      <nav
        className={cn(
          "flex items-center gap-1 px-3 py-1 border rounded-full bg-background/70 backdrop-blur-sm shadow-sm pointer-events-auto transition-all duration-300",
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-3 pointer-events-none",
        )}
      >
        <Link href="/">
          <span className="px-2">Ben Chamberlain</span>
        </Link>
        <span className="text-muted-foreground px-1">|</span>
        <ul className="flex flex-row items-center">
          <NavLinks />
        </ul>
        <span className="text-muted-foreground px-1">|</span>
        <ul className="flex flex-row items-center gap-0.5">
          <li>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <a href="https://www.linkedin.com/in/ben-chamberlain/">
                <LinkedInIcon className="h-4 w-4 text-foreground" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <a href="https://github.com/chambomango/portfolio">
                <GitHubIcon className="h-4 w-4 text-foreground" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <a href="mailto:bchamberlain888@gmail.com">
                <EmailIcon className="h-4 w-4 text-foreground" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </li>
        </ul>
        <span className="text-muted-foreground px-1">|</span>
        <ul>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </div>
  );
}
