"use client";

import Link from "next/link";
import type { Trip } from "@/types";

export function TripNav({ trip }: { trip: Trip }) {
  return (
    <nav className="sticky top-0 z-40 bg-ink/95 text-cream backdrop-blur-sm" data-no-print>
      <div className="mx-auto flex max-w-5xl items-center gap-1 overflow-x-auto px-4 py-2 text-sm">
        <Link
          href={`/trip/${trip.slug}`}
          className="shrink-0 font-heading text-base font-semibold text-cream hover:text-whisky transition-colors"
        >
          {trip.title}
        </Link>
        <span className="mx-2 text-stone">|</span>
        <div className="flex gap-1">
          {trip.days.map((day) => (
            <Link
              key={day.dayNumber}
              href={`/trip/${trip.slug}/day/${day.dayNumber}`}
              className="shrink-0 rounded px-2 py-1 text-mist hover:bg-cream/10 hover:text-cream transition-colors"
            >
              Day {day.dayNumber}
            </Link>
          ))}
        </div>
        <span className="mx-2 text-stone">|</span>
        <Link
          href={`/trip/${trip.slug}/costs`}
          className="shrink-0 rounded px-2 py-1 text-mist hover:bg-cream/10 hover:text-cream transition-colors"
        >
          Costs
        </Link>
        <Link
          href={`/trip/${trip.slug}/tips`}
          className="shrink-0 rounded px-2 py-1 text-mist hover:bg-cream/10 hover:text-cream transition-colors"
        >
          Tips
        </Link>
        <Link
          href={`/trip/${trip.slug}/map`}
          className="shrink-0 rounded px-2 py-1 text-mist hover:bg-cream/10 hover:text-cream transition-colors"
        >
          Map
        </Link>
      </div>
    </nav>
  );
}
