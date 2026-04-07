"use client";

import { useState, useEffect } from "react";
import type { MapLocation } from "@/types";

export function MapWrapper({
  locations,
  center,
  zoom,
  totalDays,
}: {
  locations: MapLocation[];
  center: { lat: number; lng: number };
  zoom: number;
  totalDays: number;
}) {
  const [MapComponent, setMapComponent] = useState<React.ComponentType<{
    locations: MapLocation[];
    center: { lat: number; lng: number };
    zoom: number;
    totalDays: number;
  }> | null>(null);

  useEffect(() => {
    import("@/components/map-view").then((mod) => {
      setMapComponent(() => mod.default);
    });
  }, []);

  if (!MapComponent) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-lg border border-mist bg-cream">
        <p className="text-sm text-stone">Loading map...</p>
      </div>
    );
  }

  return (
    <MapComponent
      locations={locations}
      center={center}
      zoom={zoom}
      totalDays={totalDays}
    />
  );
}
