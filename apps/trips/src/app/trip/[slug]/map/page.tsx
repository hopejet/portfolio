import { notFound } from "next/navigation";
import { getTripBySlug, trips } from "@/data";
import { MapWrapper } from "@/components/map-wrapper";

export function generateStaticParams() {
  return trips.map((t) => ({ slug: t.slug }));
}

export default async function MapPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) notFound();

  return (
    <div>
      <h1 className="mb-4 font-heading text-3xl font-bold text-ink">
        Trip Map
      </h1>
      <p className="mb-4 text-sm text-stone">
        All {trip.mapLocations.length} locations across {trip.days.length} days.
      </p>
      <MapWrapper
        locations={trip.mapLocations}
        center={trip.mapCenter}
        zoom={trip.mapZoom}
        totalDays={trip.days.length}
      />
    </div>
  );
}
