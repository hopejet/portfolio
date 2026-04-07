import { trips } from "@/data";
import { TripCard } from "@/components/trip-card";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-heading text-4xl font-bold text-ink">Trip Planner</h1>
      <p className="mt-2 text-stone">
        Vote on sights, leave comments, plan together.
      </p>
      <div className="mt-8 grid gap-4">
        {trips.map((trip) => (
          <TripCard key={trip.slug} trip={trip} />
        ))}
      </div>
    </main>
  );
}
