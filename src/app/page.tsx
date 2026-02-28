"use client";
import TechStackSection from "@/components/techStackSection";
import GraduationCapIcon from "@/components/icons/GraduationCapIcon";
import MapPinIcon from "@/components/icons/MapPinIcon";
import Link from "next/link";
import React from "react";
import { CodeXml } from "lucide-react";

const HEADLINES = [
  "full-stack software engineer",
  "building with typescript & react",
  "turning data into insight",
  "api & database architect",
  "cloud & ci/cd minded",
  "ui/ux focused",
];

export default function Home() {
  const sectionAnimations = React.useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("animate-show", entry.isIntersecting);
      });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const stopPropagation = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
      event.stopPropagation(),
    [],
  );

  const [displayText, setDisplayText] = React.useState("");
  const [headlineIndex, setHeadlineIndex] = React.useState(0);
  const [isBackspacing, setisBackspacing] = React.useState(false);

  React.useEffect(() => {
    const currentHeadline = HEADLINES[headlineIndex];

    //Pause before next backspace animation
    if (!isBackspacing && displayText === currentHeadline) {
      const id = setTimeout(() => setisBackspacing(true), 2000);
      return () => clearTimeout(id);
    }

    //Finished backspacing - prepping to start typing
    if (isBackspacing && displayText === "") {
      setisBackspacing(false);
      setHeadlineIndex((index) => (index + 1) % HEADLINES.length);
      return;
    }

    //Animation effect for typing/backspacing
    const id = setTimeout(
      () =>
        setDisplayText(
          isBackspacing
            ? currentHeadline.slice(0, displayText.length - 1)
            : currentHeadline.slice(0, displayText.length + 1),
        ),
      isBackspacing ? 30 : 80,
    );
    return () => clearTimeout(id);
  }, [displayText, headlineIndex, isBackspacing]);

  return (
    <div className="flex flex-col items-center justify-center mx-auto mb-40">
      <section className="animate-show max-w-207 h-[100vh]">
        <div className="mt-30 flex flex-col">
          <span className="font-mono text-lg text-muted-foreground mb-6 inline-flex items-baseline leading-none">
            <span>// {displayText}</span>
            <span aria-hidden="true" className="caret-blink" />
          </span>
          <div className="text-foreground font-bold text-7xl mb-2">
            benjamin
          </div>
          <div className="text-muted-foreground dark:text-foreground font-bold text-7xl mb-8">
            chamberlain
          </div>
        </div>
        <p className="font-mono text-md m leading-relaxed text-muted-foreground max-w-102">
          Hi, I’m Ben — welcome to my site. I use this space to experiment,
          build, and share projects I’m working on. The full source code for
          everything here is available on my GitHub.
        </p>
      </section>

      {/* About Me */}
      <section
        ref={sectionAnimations}
        id="about-section"
        className="mb-60 animate-hidden max-w-207 w-full"
      >
        <span className="font-mono text-2xl text-foreground">About Me</span>
        <hr className="mt-2 mb-6" />
        <p className="text-justify mb-8 text-muted-foreground">
          I build modern user interfaces with React and TypeScript, using
          Tailwind CSS, Redux, custom hooks, and Jest to ship reliable features.
          I also design and implement APIs, business logic, and data access
          layers in C#, ASP.NET, Python, and Entity Framework backed by SQL
          Server. I have worked at two B2B software companies serving clients
          ranging from Fortune 500 organizations to small local businesses.
        </p>
        <p className="text-justify mb-8 text-muted-foreground">
          I care a lot about staying current with the rapid changes in our
          field, working with AI coding companions, refining my workflow, and
          keeping up with new tools and evolving languages and frameworks while
          collaborating closely with teammates to learn, teach, and ship
          products that deliver real value.
        </p>
        <div className="mt-4 flex gap-4 justify-between">
          <div className="rounded-sm p-4 flex flex-col items-center flex-1">
            <h1 className="h-22 content-center text-muted-foreground dark:text-foreground">
              5+
            </h1>
            <p className="text-center text-sm text-muted-foreground">
              Years of Professional
            </p>
            <p className="text-center text-sm text-muted-foreground">
              Experience
            </p>
          </div>
          <div className="rounded-sm p-4 flex flex-col items-center flex-1">
            <div className="h-22 content-center">
              <GraduationCapIcon className="w-16 h-16 text-muted-foreground dark:text-foreground" />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">
              B.S. Computer Science
              <br />
              University of New Hampshire
            </p>
          </div>
          <div className="rounded-sm p-4 flex flex-col items-center flex-1">
            <div className="h-22 content-center">
              <MapPinIcon className="w-15 h-15 text-muted-foreground dark:text-foreground" />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">
              Barrington,
              <br />
              New Hampshire
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section
        ref={sectionAnimations}
        className="mb-60 animate-hidden max-w-207 w-full"
      >
        <span className="font-mono text-2xl text-foreground">
          Technology Stack
        </span>
        <hr className="mt-2 mb-6" />
        <div className="flex flex-col gap-6">
          <TechStackSection
            title="Languages"
            items={[
              "TypeScript",
              "HTML",
              "CSS",
              "C#",
              "Python",
              "Java",
              "Scala",
              "C++",
              "PowerShell",
              "SQL",
            ]}
          />
          <TechStackSection
            title="Front-End"
            items={["React", "Redux", "Next.js", "Blazor"]}
          />
          <TechStackSection title="Back-End" items={["ASP.NET", "Node.js"]} />
          <TechStackSection
            title="DevOps & Cloud"
            items={[
              "Azure DevOps",
              "Amazon Web Services",
              "Vercel",
              "GitHub Actions",
            ]}
          />
          <TechStackSection
            title="Tools"
            items={["Docker", "Postman", "Git", "GitHub"]}
          />
        </div>
      </section>

      {/* Projects */}
      <section
        ref={sectionAnimations}
        className="mb-100 animate-hidden max-w-207 w-full"
      >
        <span className="font-mono text-2xl text-foreground">
          Project Showcase
        </span>
        <hr className="mt-2 mb-6" />
        <div className="bg-muted p-8 rounded-xl">
          <div className="flex gap-22 items-center justify-center">
            <div>
              <Link
                className="hover:underline hover:decoration-foreground"
                href="/pokedex"
              >
                <h3 className="font-semibold mb-3">Pokédex</h3>
              </Link>
              <p className="text-muted-foreground">
                View Pokémon across all nine generations. Search for your
                favorite and filter by type/generation. Click on a Pokémon to
                learn more about it.
              </p>
              <br />
              <p className="text-muted-foreground mb-5">
                The technical patterns used in this project are described in
                more detail within the README.md of the source code linked
                below.
              </p>
              <div className="source-code">
                <a
                  className="flex w-fit gap-2 text-foreground font-semibold border px-3 py-1 rounded-md"
                  href="https://github.com/chambomango/portfolio"
                  onClick={stopPropagation}
                >
                  <CodeXml />
                  <span>Source Code</span>
                </a>
              </div>
            </div>
            <div className="flex min-h-48 min-w-48 items-center justify-center">
              <img
                className="h-48 w-48 [image-rendering:pixelated]"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/2.gif"
                alt="pokedex-img"
                loading="lazy"
                decoding="async"
                width={192}
                height={192}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
