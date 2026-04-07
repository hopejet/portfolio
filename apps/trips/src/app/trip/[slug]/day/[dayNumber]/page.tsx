import { notFound } from "next/navigation";
import Link from "next/link";
import { getTripBySlug, trips } from "@/data";
import { DayHeader } from "@/components/day-header";
import { TransportBox } from "@/components/transport-box";
import { TimelineItem } from "@/components/timeline-item";
import { PlanBBox } from "@/components/plan-b-box";
import { EventCallout } from "@/components/event-callout";
import { TipBox } from "@/components/tip-box";
import { ActivityInteractions } from "@/components/activity-interactions";

export function generateStaticParams() {
  return trips.flatMap((t) =>
    t.days.map((d) => ({ slug: t.slug, dayNumber: String(d.dayNumber) }))
  );
}

export default async function DayPage({
  params,
}: {
  params: Promise<{ slug: string; dayNumber: string }>;
}) {
  const { slug, dayNumber: dayStr } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) notFound();

  const dayNumber = parseInt(dayStr, 10);
  const day = trip.days.find((d) => d.dayNumber === dayNumber);
  if (!day) notFound();

  const prevDay = trip.days.find((d) => d.dayNumber === dayNumber - 1);
  const nextDay = trip.days.find((d) => d.dayNumber === dayNumber + 1);

  return (
    <div>
      <DayHeader day={day} />

      {day.transport && <TransportBox transport={day.transport} />}

      {day.events?.map((event, i) => (
        <EventCallout key={i} event={event} />
      ))}

      {/* Timeline */}
      <div className="mt-6">
        {day.activities.map((activity, i) => (
          <TimelineItem
            key={activity.id}
            activity={activity}
            isLast={i === day.activities.length - 1}
          >
            <ActivityInteractions tripSlug={slug} itemId={activity.id} />
          </TimelineItem>
        ))}
      </div>

      {day.planB && <PlanBBox text={day.planB} />}
      {day.dayTips && day.dayTips.length > 0 && <TipBox tips={day.dayTips} />}

      {/* Day Navigation */}
      <div className="mt-8 flex justify-between border-t border-mist pt-4">
        {prevDay ? (
          <Link
            href={`/trip/${slug}/day/${prevDay.dayNumber}`}
            className="text-sm font-medium text-loch hover:underline"
          >
            ← Day {prevDay.dayNumber}: {prevDay.title}
          </Link>
        ) : (
          <Link
            href={`/trip/${slug}`}
            className="text-sm font-medium text-loch hover:underline"
          >
            ← Overview
          </Link>
        )}
        {nextDay ? (
          <Link
            href={`/trip/${slug}/day/${nextDay.dayNumber}`}
            className="text-sm font-medium text-loch hover:underline"
          >
            Day {nextDay.dayNumber}: {nextDay.title} →
          </Link>
        ) : (
          <Link
            href={`/trip/${slug}`}
            className="text-sm font-medium text-loch hover:underline"
          >
            Overview →
          </Link>
        )}
      </div>
    </div>
  );
}
