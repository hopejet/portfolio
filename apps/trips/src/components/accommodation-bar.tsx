import type { AccommodationStop } from "@/types";

const stopColors: Record<string, string> = {
  Glasgow: "bg-loch",
  Edinburgh: "bg-heather",
  "Glasgow Airport": "bg-stone",
};

export function AccommodationBar({ stops }: { stops: AccommodationStop[] }) {
  const totalNights = stops.reduce((sum, s) => sum + s.nights, 0);

  return (
    <div className="rounded-lg border border-mist bg-cream p-4">
      <h3 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wide text-stone">
        Accommodation Plan
      </h3>
      <div className="flex gap-1 overflow-hidden rounded-lg">
        {stops.map((stop) => {
          const width = `${(stop.nights / totalNights) * 100}%`;
          const bg = stopColors[stop.city] ?? "bg-stone";
          return (
            <div
              key={stop.city}
              className={`${bg} px-3 py-2 text-cream`}
              style={{ width }}
            >
              <div className="text-xs font-semibold">{stop.city}</div>
              <div className="text-xs opacity-80">
                {stop.nights} night{stop.nights > 1 ? "s" : ""}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 space-y-1">
        {stops.map((stop) => (
          <p key={stop.city} className="text-xs text-stone">
            <span className="font-medium text-ink">{stop.city}:</span>{" "}
            {stop.area} — {stop.dates}
          </p>
        ))}
      </div>
    </div>
  );
}
