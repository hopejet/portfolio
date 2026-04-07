import type { Comment, StoredVote } from "@/types";

const STORAGE_KEY = "trip-planner";

type StoredData = {
  userName: string;
  votes: Record<string, StoredVote>;
  comments: Comment[];
};

function load(): StoredData {
  if (typeof window === "undefined") {
    return { userName: "", votes: {}, comments: [] };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { userName: "", votes: {}, comments: [] };
}

function save(data: StoredData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// --- User Name ---

export function getUserName(): string {
  return load().userName;
}

export function setUserName(name: string) {
  const data = load();
  data.userName = name;
  save(data);
}

// --- Votes ---

function voteKey(tripSlug: string, itemId: string) {
  return `${tripSlug}:${itemId}`;
}

export function getVote(tripSlug: string, itemId: string): StoredVote | null {
  const data = load();
  return data.votes[voteKey(tripSlug, itemId)] ?? null;
}

export function setVote(tripSlug: string, itemId: string, vote: StoredVote | null) {
  const data = load();
  const key = voteKey(tripSlug, itemId);
  if (vote === null) {
    delete data.votes[key];
  } else {
    data.votes[key] = vote;
  }
  save(data);
}

export function getAllVotes(): Record<string, StoredVote> {
  return load().votes;
}

// --- Comments ---

export function getComments(tripSlug: string, itemId: string): Comment[] {
  const data = load();
  return data.comments.filter(
    (c) => c.tripSlug === tripSlug && c.itemId === itemId
  );
}

export function getAllComments(tripSlug: string): Comment[] {
  return load().comments.filter((c) => c.tripSlug === tripSlug);
}

export function addComment(tripSlug: string, itemId: string, userName: string, body: string): Comment {
  const data = load();
  const comment: Comment = {
    id: crypto.randomUUID(),
    tripSlug,
    itemId,
    userName,
    body,
    createdAt: new Date().toISOString(),
  };
  data.comments.push(comment);
  save(data);
  return comment;
}
