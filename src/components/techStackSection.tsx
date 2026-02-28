export default function TechStackSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="flex flex-col gap-2 items-baseline ">
      <h4 className="mr-3 font-medium font-base">{title}</h4>
      <ul className="flex flex-wrap items-baseline gap-2 text-muted-foreground">
        {items.map((item) => (
          <li className="border rounded-full px-2 py-0.5 font-mono" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
