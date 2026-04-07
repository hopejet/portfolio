"use client";

import { useState, useEffect } from "react";
import { useUser } from "./user-identity";
import { getComments, addComment } from "@/lib/storage";
import type { Comment } from "@/types";

export function CommentSection({
  tripSlug,
  itemId,
}: {
  tripSlug: string;
  itemId: string;
}) {
  const { userName } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    setComments(getComments(tripSlug, itemId));
  }, [tripSlug, itemId]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !userName) return;
    const comment = addComment(tripSlug, itemId, userName, input.trim());
    setComments((prev) => [...prev, comment]);
    setInput("");
  }

  return (
    <div className="mt-1" data-no-print>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-xs font-medium text-stone hover:text-ink transition-colors"
      >
        {comments.length > 0
          ? `${comments.length} comment${comments.length > 1 ? "s" : ""}`
          : "Add comment"}
        {expanded ? " ▾" : " ▸"}
      </button>

      {expanded && (
        <div className="mt-2 space-y-2">
          {comments.map((c) => (
            <div key={c.id} className="rounded-lg bg-cream/80 px-3 py-2 text-sm">
              <div className="flex items-baseline gap-2">
                <span className="font-medium text-ink">{c.userName}</span>
                <span className="text-xs text-stone">
                  {new Date(c.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="mt-0.5 text-ink/70">{c.body}</p>
            </div>
          ))}

          {userName ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Write a comment..."
                className="min-w-0 flex-1 rounded-lg border border-mist bg-cream px-3 py-1.5 text-sm text-ink placeholder:text-stone/50 focus:border-loch focus:outline-none focus:ring-1 focus:ring-loch"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="shrink-0 rounded-lg bg-loch px-3 py-1.5 text-xs font-medium text-cream hover:bg-loch/90 disabled:opacity-40 transition-colors"
              >
                Post
              </button>
            </form>
          ) : (
            <p className="text-xs text-stone">Set your name to comment.</p>
          )}
        </div>
      )}
    </div>
  );
}
