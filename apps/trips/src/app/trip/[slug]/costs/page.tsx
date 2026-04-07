import { notFound } from "next/navigation";
import { getTripBySlug, trips } from "@/data";
import { CostTable } from "@/components/cost-table";

export function generateStaticParams() {
  return trips.map((t) => ({ slug: t.slug }));
}

export default async function CostsPage({
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
        Cost Estimate
      </h1>
      <p className="mb-6 text-sm text-stone">
        Estimated costs for {trip.group.map((g) => `${g.count} ${g.label.toLowerCase()}`).join(", ")}.
        Under-4s are free at most attractions and on ScotRail.
      </p>
      <CostTable costs={trip.costs} />
    </div>
  );
}
