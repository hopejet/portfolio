import type { Trip } from "@/types";
import { scotland } from "./trips/scotland";

export const trips: Trip[] = [scotland];

export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find((t) => t.slug === slug);
}
