import type { Activity, ActivityBadge, ActivityCategory } from "@/types";

const categoryColors: Record<ActivityCategory, string> = {
  culture: "bg-heather",
  nature: "bg-moss",
  food: "bg-whisky",
  rest: "bg-stone",
  transport: "bg-loch",
  event: "bg-amber-500",
};

const badgeStyles: Record<ActivityBadge, { bg: string; text: string; label: string }> = {
  free: { bg: "bg-moss/15", text: "text-moss", label: "Free" },
  paid: { bg: "bg-whisky/15", text: "text-whisky", label: "Paid" },
  "kid-friendly": { bg: "bg-loch/15", text: "text-loch", label: "Kid-friendly" },
  "elder-friendly": { bg: "bg-heather/15", text: "text-heather", label: "Elder-friendly" },
  "nap-time": { bg: "bg-amber-100", text: "text-amber-700", label: "Nap time" },
  "pre-book": { bg: "bg-red-100", text: "text-red-700", label: "Pre-book!" },
};

export function TimelineItem({
  activity,
  isLast,
  children,
}: {
  activity: Activity;
  isLast: boolean;
  children?: React.ReactNode;
}) {
  const dotColor = categoryColors[activity.category] ?? "bg-stone";

  return (
    <div className="relative flex gap-4 pb-8">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div className={`h-3 w-3 shrink-0 rounded-full ${dotColor} ring-2 ring-parchment`} />
        {!isLast && <div className="w-px grow bg-mist" />}
      </div>

      {/* Content */}
      <div className="-mt-0.5 min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-baseline gap-2">
          <span className="text-xs font-medium text-stone">{activity.time}</span>
          <h3 className="font-heading text-lg font-semibold text-ink">
            <a
              href={activity.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-loch transition-colors"
            >
              {activity.name}
              <span className="ml-1 text-xs text-stone/60">↗</span>
            </a>
          </h3>
        </div>

        <p className="mb-2 text-sm leading-relaxed text-ink/70">
          {activity.description}
        </p>

        {activity.badges.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {activity.badges.map((badge) => {
              const style = badgeStyles[badge];
              return (
                <span
                  key={badge}
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${style.bg} ${style.text}`}
                >
                  {style.label}
                </span>
              );
            })}
          </div>
        )}

        {/* Slot for vote buttons + comments */}
        {children}
      </div>
    </div>
  );
}
