import type { TipCard as TipCardType } from "@/types";

export function TipCard({ tip }: { tip: TipCardType }) {
  return (
    <div className="rounded-lg border border-mist bg-cream p-5">
      <div className="mb-2 text-2xl">{tip.emoji}</div>
      <h3 className="mb-2 font-heading text-lg font-semibold text-ink">
        {tip.title}
      </h3>
      <p className="text-sm leading-relaxed text-ink/70">{tip.description}</p>
    </div>
  );
}
