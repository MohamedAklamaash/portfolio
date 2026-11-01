const Chips = ({ items, label }: { items: string[]; label: string }) => (
  <ul aria-label={label} className="flex flex-wrap gap-1.5">
    {items.map((t) => (
      <li key={t} className="chip">
        {t}
      </li>
    ))}
  </ul>
);

export default Chips;
