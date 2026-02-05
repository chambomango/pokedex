import Image from "next/image";

export default function Socials() {
  return (
    <div className="flex justify-between gap-3">
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
  );
}
