import type { CostSection } from "@/types";

export function CostTable({ costs }: { costs: CostSection }) {
  return (
    <div>
      <div className="rounded-lg border border-whisky/30 bg-cream">
        <div className="divide-y divide-dotted divide-mist">
          {costs.items.map((item, i) => (
            <div key={i} className="flex items-start justify-between gap-4 px-4 py-3">
              <div>
                <span className="text-sm font-medium text-ink">{item.label}</span>
                {item.note && (
                  <p className="text-xs text-stone">{item.note}</p>
                )}
              </div>
              <span className="shrink-0 text-sm font-semibold text-whisky">
                {item.value}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t-2 border-whisky/40 px-4 py-4">
          <span className="font-heading text-lg font-bold text-ink">
            Estimated Total
          </span>
          <span className="font-heading text-xl font-bold text-whisky">
            {costs.totalRange}
          </span>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-mist bg-cream p-4">
        <h3 className="mb-2 font-heading text-sm font-semibold uppercase tracking-wide text-stone">
          Accommodation Plan
        </h3>
        <p className="text-sm leading-relaxed text-ink/70">
          {costs.accommodationPlan}
        </p>
      </div>

      <div className="mt-6 rounded-lg border border-moss/20 bg-moss/5 p-4">
        <h3 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wide text-moss">
          Money-Saving Tips
        </h3>
        <ul className="space-y-1.5">
          {costs.moneySavingTips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
              <span className="mt-0.5 shrink-0 text-moss">✓</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
