import Link from "next/link";
import { Space_Grotesk, Source_Code_Pro } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center max-w-200 mt-20 mx-auto mb-0">
      <h1 className={`mb-4 font-semibold text-6xl ${spaceGrotesk.className}`}>
        Ben Chamberlain
      </h1>
      <p
        className={`text-justify mb-4 px-26  text-zinc-600 ${sourceCodePro.className}`}
      >
        Hi I'm Ben, welcome to my site. I'm a full-stack software developer with
        4+ years experience developing enterprise applications. Here I post some
        of my side projects I work on for fun. This site and all of the projects
        within were created using TypeScript, React, and NextJS. To see the code
        for this site visit the portfolio project on my GitHub.
      </p>
      <div className="mt-5 flex flex-col items-center">
        <div className="w-full max-w-xl">
          <Link
            href="/pokedex"
            className="text-center group block rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-lg font-semibold group-hover:underline">
                  Pokémon Viewer{" "}
                  <span className="text-zinc-500">(work-in-progress)</span>
                </h4>
                <p className={`mt-2 text-sm text-zinc-600`}>
                  Pokémon grid with search capabilities and filtering for type.
                </p>
                <p className={`mt-1 text-sm text-zinc-600`}>
                  Patterns: lazy loading, search parameter handling.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
