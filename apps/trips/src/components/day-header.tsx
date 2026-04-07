import type { Day } from "@/types";

const cityColorMap: Record<string, string> = {
  loch: "bg-loch text-cream",
  heather: "bg-heather text-cream",
  stone: "bg-stone text-cream",
  moss: "bg-moss text-cream",
  whisky: "bg-whisky text-cream",
};

export function DayHeader({ day }: { day: Day }) {
  const badgeClass = cityColorMap[day.cityColor] ?? "bg-stone text-cream";

  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-4">
        <span className="font-heading text-6xl font-bold text-ink/20">
          {day.dayNumber}
        </span>
        <div>
          <h1 className="font-heading text-2xl font-semibold text-ink md:text-3xl">
            {day.title}
          </h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-stone">{day.date}</span>
            <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${badgeClass}`}>
              {day.cityBase}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
