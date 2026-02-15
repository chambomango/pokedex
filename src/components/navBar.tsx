import Link from "next/link";
import Image from "next/image";
import "./navBar.css";

import { Space_Grotesk } from "next/font/google";
import DisplayPath from "./displayPath";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400"],
});

export default async function NavBar({ label }: { label: string }) {
  return (
    <nav className="navBar">
      <div className="flex">
        <Link href="/">
          <div className={`navBarLogo text-zinc-600 ${spaceGrotesk.className}`}>
            Ben
          </div>
        </Link>
        <DisplayPath />
      </div>
      <ul className="navBarLinks">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/pokedex">Pokémon Viewer</Link>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/ben-chamberlain/">
            <div className="flex">
              <Image
                src="/logos/PNG/InBug-Black.png"
                alt="LinkedIn"
                width={24}
                height={24}
              />
            </div>
          </a>
        </li>
        <li>
          <a href="https://github.com/chambomango/portfolio">
            <div className="flex">
              <Image
                src="/logos/PNG/GitHub_Invertocat_Black.png"
                alt="GitHub"
                width={24}
                height={24}
              />
            </div>
          </a>
        </li>
        <li>
          <div>
            <a href="mailto:bchamberlain888@gmail.com">
              <div className="flex">
                <Image
                  className="inline"
                  src="/logos/PNG/email.png"
                  alt="Email"
                  width={24}
                  height={24}
                />
              </div>
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
}
