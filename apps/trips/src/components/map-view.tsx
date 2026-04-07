"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { MapLocation } from "@/types";

const dayColors: Record<number, string> = {
  1: "#2d6a7e", // loch
  2: "#4a7c59", // moss
  3: "#c97b3a", // whisky
  4: "#6b4c7a", // heather
  5: "#1a1a2e", // ink
  6: "#8a8578", // stone
  7: "#b91c1c", // red
};

function createDayIcon(day: number) {
  const color = dayColors[day] ?? "#8a8578";
  return L.divIcon({
    className: "",
    html: `<div style="
      background: ${color};
      color: white;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    ">${day}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  });
}

export default function MapView({
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
  const [activeDay, setActiveDay] = useState<number | null>(null);

  const filtered = activeDay
    ? locations.filter((loc) => loc.day === activeDay)
    : locations;

  return (
    <div>
      {/* Day filter buttons */}
      <div className="mb-4 flex flex-wrap gap-2" data-no-print>
        <button
          onClick={() => setActiveDay(null)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            activeDay === null
              ? "bg-ink text-cream"
              : "bg-mist text-stone hover:bg-ink/10"
          }`}
        >
          All Days
        </button>
        {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(activeDay === day ? null : day)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              activeDay === day
                ? "text-cream"
                : "bg-mist text-stone hover:opacity-80"
            }`}
            style={
              activeDay === day
                ? { backgroundColor: dayColors[day] ?? "#8a8578" }
                : undefined
            }
          >
            Day {day}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-mist" style={{ height: "500px" }}>
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map((loc, i) => (
            <Marker
              key={`${loc.name}-${i}`}
              position={[loc.lat, loc.lng]}
              icon={createDayIcon(loc.day)}
            >
              <Popup>
                <div style={{ fontFamily: "var(--font-body)" }}>
                  <strong>{loc.name}</strong>
                  <br />
                  <span style={{ fontSize: "12px", color: "#8a8578" }}>
                    Day {loc.day}
                    {loc.time && ` · ${loc.time}`}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-stone">
        {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
          <div key={day} className="flex items-center gap-1">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: dayColors[day] ?? "#8a8578" }}
            />
            Day {day}
          </div>
        ))}
      </div>
    </div>
  );
}
