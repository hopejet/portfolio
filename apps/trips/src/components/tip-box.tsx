export function TipBox({ tips }: { tips: string[] }) {
  return (
    <div className="my-4 rounded-lg border border-heather/20 bg-heather/5 p-4">
      <h3 className="mb-2 font-heading text-sm font-semibold uppercase tracking-wide text-heather">
        Tips for Today
      </h3>
      <ul className="space-y-1">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
            <span className="mt-0.5 shrink-0 text-heather">•</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}
