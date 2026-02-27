"use client";
import TechStackSection from "@/components/techStackSection";
import GraduationCapIcon from "@/components/icons/GraduationCapIcon";
import MapPinIcon from "@/components/icons/MapPinIcon";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import Link from "next/link";
import React from "react";

export default function Home() {
  const arrowRef = React.useRef<SVGSVGElement | null>(null);

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

  const arrowHideAnimation = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (arrowRef.current && entry.isIntersecting) {
            arrowRef.current.classList.add("arrow-hide");
          }
        });
      });
      observer.observe(node);

      return () => observer.disconnect();
    },
    [],
  );

  const arrowShowAnimation = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (arrowRef.current && entry.isIntersecting) {
            arrowRef.current.classList.remove("arrow-hide");
            arrowRef.current.classList.add("arrow-show");
          }
        });
      });
      observer.observe(node);

      return () => observer.disconnect();
    },
    [],
  );

  const scrollToAboutSection = React.useCallback(() => {
    document
      .getElementById("about-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const stopPropagation = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
      event.stopPropagation(),
    [],
  );

  return (
    <div className="flex flex-col items-center justify-center mx-auto mb-40">
      <span ref={arrowShowAnimation}></span>
      <section className="animate-show max-w-106 h-[100vh]">
        <div className="mt-30 flex flex-col">
          <h4 className="text-muted-foreground flex mb-6 font-semibold text-1xl">
            Full-Stack Software Engineer
          </h4>
          <div className="text-foreground flex mb-4 font-semibold text-7xl">
            benjamin
          </div>
          <div className="text-muted-foreground flex mb-8 font-semibold text-7xl">
            chamberlain
          </div>
        </div>
        <p className="text-justify mb-4 text-muted-foreground max-w-155">
          Hi I'm Ben, welcome to my site. Here I post some of my side projects I
          work on for fun. This site and all of the projects within were created
          using TypeScript, React, and NextJS. To see the code for this site
          click the link to my GitHub.
        </p>
        <button
          className="mt-60 flex mx-auto cursor-pointer"
          onClick={scrollToAboutSection}
        >
          <ArrowDownIcon
            ref={arrowRef}
            className="block cursor-pointer animate-show w-16 mx-auto text-muted-foreground"
          />
        </button>
      </section>

      <section
        ref={sectionAnimations}
        id="about-section"
        className="mb-60 animate-hidden w-200 "
      >
        <span ref={arrowHideAnimation}></span>
        <h2>About Me</h2>
        <hr className="mt-2 mb-6"></hr>
        <p className="text-justify mb-4 text-muted-foreground">
          I'm a full-stack software developer with 4+ years experience
          developing enterprise applications. I've worked in two positions and
          specialize in responsive and clean UIs, scalable API services, and SQL
          management.
        </p>
        <div className="mt-10 flex gap-4 justify-between">
          <div className="flex flex-col items-center">
            <h1 className="pt-4 h-22 content-center text-muted-foreground">
              4+
            </h1>
            <p className="pt-4 px-4 text-muted-foreground">
              Years of Professional
            </p>
            <p className="pb-4 text-muted-foreground">Experience</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-22 content-center">
              <GraduationCapIcon className="pt-4 w-18 h-18 text-muted-foreground" />
            </div>
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Bachelor's Degree</p>
              <p className="text-muted-foreground">in Computer Science</p>
              <p className="text-muted-foreground">
                University of New Hampshire
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-22 content-center">
              <MapPinIcon className="pt-4 w-17 h-17 text-muted-foreground" />
            </div>
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Located in Barrington,</p>
              <p className="text-muted-foreground">New Hampshire</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={sectionAnimations} className="mb-60 animate-hidden w-200 ">
        <h2>Technology Stack</h2>
        <hr className="mt-2 mb-6"></hr>
        <div className="flex flex-col gap-6 justify-between">
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

      <section ref={sectionAnimations} className="mb-100 animate-hidden w-200 ">
        <h2>Projects</h2>
        <hr className="mt-2 mb-6"></hr>
        <div className="w-80 border p-8 rounded-xl">
          <Link
            className="hover:underline hover:decoration-foreground"
            href="/pokedex"
          >
            <h3 className="font-semibold mb-3">Pokédex</h3>
          </Link>
          <p className="text-muted-foreground">
            View pokemon across all nine generations. Search for your favorite
            or filter by type/generation.
          </p>
          {/* <p className="text-muted-foreground">
              Click on a pokemon to view more information about it such as it's
              stats and moves
            </p> */}
          <br />
          <p className="text-muted-foreground mb-5">
            Technical patterns used: filtering, lazy loading, pagination via
            infinite scrolling, search parameter handling.
          </p>
          <div className="source-code">
            <a
              className="text-foreground font-semibold border px-3 py-1 rounded-md"
              href="https://github.com/chambomango/portfolio"
              onClick={stopPropagation}
            >
              Source code
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
