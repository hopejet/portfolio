import Link from "next/link";
import type { Trip } from "@/types";

export function TripCard({ trip }: { trip: Trip }) {
  const totalDays = trip.days.length;
  const totalPeople = trip.group.reduce((sum, g) => sum + g.count, 0);

  return (
    <Link
      href={`/trip/${trip.slug}`}
      className="group block rounded-xl border border-mist bg-cream p-6 shadow-sm transition-all hover:border-loch/40 hover:shadow-md"
    >
      <h2 className="font-heading text-2xl font-semibold text-ink group-hover:text-loch transition-colors">
        {trip.title}
      </h2>
      <p className="mt-1 text-sm text-stone">{trip.subtitle}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-loch/10 px-3 py-1 text-xs font-medium text-loch">
          {trip.dates}
        </span>
        <span className="rounded-full bg-heather/10 px-3 py-1 text-xs font-medium text-heather">
          {totalDays} days
        </span>
        <span className="rounded-full bg-moss/10 px-3 py-1 text-xs font-medium text-moss">
          {totalPeople} travellers
        </span>
      </div>
      <div className="mt-3 text-xs text-stone">
        {trip.group.map((g) => `${g.count} ${g.label}`).join(" · ")}
      </div>
    </Link>
  );
}
