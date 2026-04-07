export type FlightInfo = {
  route: string;
  carrier: string;
  datetime: string;
  airport: string;
  flightNumber?: string;
};

export type AccommodationStop = {
  city: string;
  area: string;
  nights: number;
  dates: string;
};

export type TransportInfo = {
  description: string;
  steps: string[];
  cost?: string;
};

export type ActivityBadge =
  | "free"
  | "paid"
  | "kid-friendly"
  | "elder-friendly"
  | "nap-time"
  | "pre-book";

export type ActivityCategory =
  | "culture"
  | "nature"
  | "food"
  | "rest"
  | "transport"
  | "event";

export type Activity = {
  id: string;
  time: string;
  name: string;
  description: string;
  url: string;
  category: ActivityCategory;
  badges: ActivityBadge[];
};

export type EventCallout = {
  title: string;
  description: string;
};

export type Day = {
  dayNumber: number;
  date: string;
  title: string;
  cityBase: string;
  cityColor: string;
  transport?: TransportInfo;
  activities: Activity[];
  planB?: string;
  events?: EventCallout[];
  dayTips?: string[];
};

export type CostItem = {
  label: string;
  value: string;
  note?: string;
};

export type CostSection = {
  items: CostItem[];
  totalRange: string;
  accommodationPlan: string;
  moneySavingTips: string[];
};

export type TipCard = {
  emoji: string;
  title: string;
  description: string;
};

export type MapLocation = {
  name: string;
  lat: number;
  lng: number;
  day: number;
  time?: string;
};

export type NotCoveredSite = {
  name: string;
  reason: string;
};

export type Trip = {
  slug: string;
  title: string;
  subtitle: string;
  dates: string;
  coverImage?: string;
  group: { label: string; count: number }[];
  flights?: { outbound: FlightInfo; return: FlightInfo };
  accommodation: AccommodationStop[];
  scopeNote?: string;
  notCovered?: NotCoveredSite[];
  days: Day[];
  costs: CostSection;
  tips: TipCard[];
  mapLocations: MapLocation[];
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
};

export type StoredVote = 1 | -1;

export type Comment = {
  id: string;
  tripSlug: string;
  itemId: string;
  userName: string;
  body: string;
  createdAt: string;
};
