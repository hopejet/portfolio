import { notFound } from "next/navigation";
import Link from "next/link";
import { getTripBySlug, trips } from "@/data";
import { AccommodationBar } from "@/components/accommodation-bar";

export function generateStaticParams() {
  return trips.map((t) => ({ slug: t.slug }));
}

export default async function TripOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) notFound();

  const hasEarlyFlight = trip.flights?.return;

  return (
    <div>
      {/* Hero */}
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold text-ink md:text-5xl">
          {trip.title}
        </h1>
        <p className="mt-1 text-lg text-stone">{trip.subtitle}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-loch/10 px-4 py-1.5 text-sm font-medium text-loch">
            {trip.dates}
          </span>
          {trip.group.map((g) => (
            <span
              key={g.label}
              className="rounded-full bg-heather/10 px-4 py-1.5 text-sm font-medium text-heather"
            >
              {g.count} {g.label}
            </span>
          ))}
        </div>
      </div>

      {/* Flight Info */}
      {trip.flights && (
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-mist bg-cream p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-stone">
              Outbound
            </div>
            <p className="mt-1 text-sm text-ink">{trip.flights.outbound.route}</p>
            <p className="text-xs text-stone">
              {trip.flights.outbound.carrier} · Arrive{" "}
              {new Date(trip.flights.outbound.datetime).toLocaleString("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="rounded-lg border border-mist bg-cream p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-stone">
              Return
            </div>
            <p className="mt-1 text-sm text-ink">{trip.flights.return.route}</p>
            <p className="text-xs text-stone">
              {trip.flights.return.carrier}{" "}
              {trip.flights.return.flightNumber && `(${trip.flights.return.flightNumber})`} · Depart{" "}
              {new Date(trip.flights.return.datetime).toLocaleString("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      )}

      {/* Departure Warning */}
      {hasEarlyFlight && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-800">
            ⚠️ Departure Warning
          </p>
          <p className="text-sm text-red-700">
            Flight {trip.flights!.return.flightNumber} departs at{" "}
            {new Date(trip.flights!.return.datetime).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            on {trip.days[trip.days.length - 1]?.date} — be at the airport by 07:30!
          </p>
        </div>
      )}

      {/* Accommodation */}
      <div className="mb-8">
        <AccommodationBar stops={trip.accommodation} />
      </div>

      {/* Day Navigation */}
      <h2 className="mb-4 font-heading text-xl font-semibold text-ink">
        Daily Itinerary
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {trip.days.map((day) => (
          <Link
            key={day.dayNumber}
            href={`/trip/${trip.slug}/day/${day.dayNumber}`}
            className="group rounded-lg border border-mist bg-cream p-4 transition-all hover:border-loch/40 hover:shadow-sm"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-2xl font-bold text-ink/20">
                {day.dayNumber}
              </span>
              <div>
                <h3 className="font-heading text-base font-semibold text-ink group-hover:text-loch transition-colors">
                  {day.title}
                </h3>
                <p className="text-xs text-stone">
                  {day.date} · {day.cityBase}
                </p>
              </div>
            </div>
            <p className="mt-2 text-xs text-stone">
              {day.activities.length} activities
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div className="mt-8 flex gap-3">
        <Link
          href={`/trip/${trip.slug}/costs`}
          className="rounded-lg border border-whisky/30 bg-whisky/5 px-4 py-3 text-sm font-medium text-whisky hover:bg-whisky/10 transition-colors"
        >
          View Costs →
        </Link>
        <Link
          href={`/trip/${trip.slug}/tips`}
          className="rounded-lg border border-heather/30 bg-heather/5 px-4 py-3 text-sm font-medium text-heather hover:bg-heather/10 transition-colors"
        >
          Travel Tips →
        </Link>
        <Link
          href={`/trip/${trip.slug}/map`}
          className="rounded-lg border border-moss/30 bg-moss/5 px-4 py-3 text-sm font-medium text-moss hover:bg-moss/10 transition-colors"
        >
          View Map →
        </Link>
      </div>
    </div>
  );
}
