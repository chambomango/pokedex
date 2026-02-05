import Socials from "@/components/socials";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center max-w-200 mt-20 mx-auto mb-0">
      <h1 className="mb-2">Ben Chamberlain</h1>
      <p className="text-center mb-2">
        Hi, I'm Ben. Welcome to my site. I'm a full-stack software developer
        with 4+ years experience developing enterprise applications. Here I post
        some of my side projects I work on for fun and to try out new coding
        techniques. This site and all of the projects within were created using
        TypeScript, React, and NextJS. To see the code for this site click on my
        GitHub link below!
      </p>
      <Socials />
      <div className="flex flex-col items-center mt-5">
        <h2 className="mt-3 mb-2">Projects</h2>
        <div className="flex flex-col items-center">
          <Link href="/pokedex">Pokédex App</Link>
          <p className="text-center mb-2">
            Features: Pokémon grid with filtering/search, individual pokémon
            info pages
          </p>
          <p className="text-center mb-2">
            Patterns used: lazy loading, search parameter handling
          </p>
        </div>
      </div>
    </div>
  );
}
