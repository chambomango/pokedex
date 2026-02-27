export default function TechStackSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="flex items-baseline ">
      <h4 className="mr-3">{title}</h4>
      <ul className="flex items-baseline gap-2 text-muted-foreground">
        {items.map((item) => (
          <li className="border rounded-sm px-2 py-0.5" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
