import { notFound } from "next/navigation";
import { getTripBySlug, trips } from "@/data";
import { TipCard } from "@/components/tip-card";

export function generateStaticParams() {
  return trips.map((t) => ({ slug: t.slug }));
}

export default async function TipsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) notFound();

  return (
    <div>
      <h1 className="mb-2 font-heading text-3xl font-bold text-ink">
        Know Before You Go
      </h1>
      <p className="mb-6 text-sm text-stone">
        Practical tips for making the most of your trip.
      </p>

      {/* Trip Scope */}
      {trip.scopeNote && (
        <div className="mb-8 rounded-lg border border-loch/20 bg-loch/5 p-5">
          <h2 className="mb-2 font-heading text-lg font-semibold text-ink">
            Trip Scope
          </h2>
          <p className="text-sm leading-relaxed text-ink/80">
            {trip.scopeNote}
          </p>
        </div>
      )}

      {/* What We're Not Covering */}
      {trip.notCovered && trip.notCovered.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 font-heading text-lg font-semibold text-ink">
            What We&apos;re Not Covering
          </h2>
          <p className="mb-3 text-sm text-stone">
            These iconic sites are excluded due to distance, travel time, or logistics with our group.
          </p>
          <ul className="space-y-2">
            {trip.notCovered.map((site) => (
              <li
                key={site.name}
                className="rounded-lg border border-mist bg-cream p-3"
              >
                <span className="font-medium text-ink">{site.name}</span>
                <span className="text-stone"> — </span>
                <span className="text-sm text-stone">{site.reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {trip.tips.map((tip) => (
          <TipCard key={tip.title} tip={tip} />
        ))}
      </div>
    </div>
  );
}
