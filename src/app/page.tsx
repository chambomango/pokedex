import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center max-w-[800px] mt-[80px] mx-auto mb-0">
      <h1>Ben Chamberlain</h1>
      <h2 className="mt-[12px]">Projects</h2>
      <div className="flex flex-col items-center mt-[20px]">
        <div className="flex flex-col items-center">
          <Link href="/pokedex">Pokedex (demo)</Link>
          <Link href="/about">About Me</Link>
        </div>
        <div className="flex justify-between gap-[8px]">
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
          <a href="https://github.com/chambomango/portfolio">
            <div className="flex">
              <Image
                src="/logos/PNG/GitHub_Invertocat_Black.png"
                alt="LinkedIn"
                width={24}
                height={24}
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
