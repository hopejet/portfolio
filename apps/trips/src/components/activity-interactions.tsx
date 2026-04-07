"use client";

import { VoteButtons } from "./vote-buttons";
import { CommentSection } from "./comment-section";

export function ActivityInteractions({
  tripSlug,
  itemId,
}: {
  tripSlug: string;
  itemId: string;
}) {
  return (
    <div className="mt-2 space-y-1">
      <VoteButtons tripSlug={tripSlug} itemId={itemId} />
      <CommentSection tripSlug={tripSlug} itemId={itemId} />
    </div>
  );
}
