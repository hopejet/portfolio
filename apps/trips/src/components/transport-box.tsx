import type { TransportInfo } from "@/types";

export function TransportBox({ transport }: { transport: TransportInfo }) {
  return (
    <div className="mb-6 rounded-lg border border-moss/30 bg-moss/5 p-4">
      <h3 className="mb-2 font-heading text-sm font-semibold uppercase tracking-wide text-moss">
        Getting There
      </h3>
      <p className="mb-3 text-sm text-ink/80">{transport.description}</p>
      <div className="space-y-1.5">
        {transport.steps.map((step, i) => (
          <div key={i} className="flex items-start gap-2 text-sm">
            <span className="mt-0.5 shrink-0 text-moss">→</span>
            <span className="text-ink/70">{step}</span>
          </div>
        ))}
      </div>
      {transport.cost && (
        <p className="mt-3 text-xs font-medium text-moss">{transport.cost}</p>
      )}
    </div>
  );
}
