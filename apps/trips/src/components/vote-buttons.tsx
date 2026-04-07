"use client";

import { useState, useEffect } from "react";
import { useUser } from "./user-identity";
import { getVote, setVote, getAllVotes } from "@/lib/storage";
import type { StoredVote } from "@/types";

export function VoteButtons({
  tripSlug,
  itemId,
}: {
  tripSlug: string;
  itemId: string;
}) {
  const { userName } = useUser();
  const [myVote, setMyVote] = useState<StoredVote | null>(null);
  const [counts, setCounts] = useState({ up: 0, down: 0 });

  useEffect(() => {
    setMyVote(getVote(tripSlug, itemId));
    // Count all votes for this item across all stored data
    const allVotes = getAllVotes();
    const key = `${tripSlug}:${itemId}`;
    const vote = allVotes[key];
    setCounts({
      up: vote === 1 ? 1 : 0,
      down: vote === -1 ? 1 : 0,
    });
  }, [tripSlug, itemId]);

  function handleVote(vote: StoredVote) {
    if (!userName) return;

    const newVote = myVote === vote ? null : vote;
    setVote(tripSlug, itemId, newVote);
    setMyVote(newVote);
    setCounts({
      up: newVote === 1 ? 1 : 0,
      down: newVote === -1 ? 1 : 0,
    });
  }

  return (
    <div className="flex items-center gap-1.5" data-no-print>
      <button
        onClick={() => handleVote(1)}
        disabled={!userName}
        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
          myVote === 1
            ? "bg-moss/20 text-moss"
            : "bg-mist/50 text-stone hover:bg-moss/10 hover:text-moss"
        } disabled:opacity-40 disabled:cursor-not-allowed`}
        title={userName ? "Thumbs up" : "Set your name first"}
      >
        <span className="text-sm">👍</span>
        {counts.up > 0 && <span>{counts.up}</span>}
      </button>
      <button
        onClick={() => handleVote(-1)}
        disabled={!userName}
        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
          myVote === -1
            ? "bg-red-100 text-red-600"
            : "bg-mist/50 text-stone hover:bg-red-50 hover:text-red-500"
        } disabled:opacity-40 disabled:cursor-not-allowed`}
        title={userName ? "Thumbs down" : "Set your name first"}
      >
        <span className="text-sm">👎</span>
        {counts.down > 0 && <span>{counts.down}</span>}
      </button>
    </div>
  );
}
