import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <div>
        <h1>Ben Chamberlain</h1>
        <h2>Projects</h2>
        <div className="flex flex-col">
          <Link href="/about">Pokedex (demo)</Link>
          <Link href="/about">Blog (demo)</Link>
          <Link href="/about">About Me</Link>
        </div>
        <a href="https://github.com/chambomango/portfolio">GitHub</a>
      </div>
    </div>
  );
}
