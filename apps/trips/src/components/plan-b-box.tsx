export function PlanBBox({ text }: { text: string }) {
  return (
    <div className="my-6 rounded-lg border border-loch/20 bg-loch/5 p-4">
      <h3 className="mb-1 font-heading text-sm font-semibold uppercase tracking-wide text-loch">
        Plan B
      </h3>
      <p className="text-sm leading-relaxed text-ink/70">{text}</p>
    </div>
  );
}
