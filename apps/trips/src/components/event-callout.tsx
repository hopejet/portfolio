import type { EventCallout as EventCalloutType } from "@/types";

export function EventCallout({ event }: { event: EventCalloutType }) {
  return (
    <div className="my-4 rounded-lg border border-amber-300/40 bg-amber-50 p-4">
      <h3 className="mb-1 font-heading text-sm font-semibold text-amber-800">
        ✦ {event.title}
      </h3>
      <p className="text-sm leading-relaxed text-amber-900/70">
        {event.description}
      </p>
    </div>
  );
}
