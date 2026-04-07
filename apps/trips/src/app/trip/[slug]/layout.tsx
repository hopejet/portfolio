import { notFound } from "next/navigation";
import { getTripBySlug, trips } from "@/data";
import { TripNav } from "@/components/nav";

export function generateStaticParams() {
  return trips.map((t) => ({ slug: t.slug }));
}

export default async function TripLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) notFound();

  return (
    <>
      <TripNav trip={trip} />
      <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
    </>
  );
}
