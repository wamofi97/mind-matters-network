export type EventStatus = "upcoming" | "past";
export type EventTone = "butter" | "coral" | "mint" | "lilac";

export type AgendaItem = {
  time: string;
  title: string;
  description?: string;
};

export type Facilitator = {
  name: string;
  role: string;
  bio: string;
  avatar?: string;
};

export type Testimonial = {
  quote: string;
  author: string;
};

export type EventDetail = {
  summary: string;
  dateLabel: string;
  duration: string;
  host: string;
  location: string;
  whoFor: string[];
  whatYouGet: string[];
  agenda: AgendaItem[];
  facilitators: Facilitator[];
  gallery: string[];
  testimonials: Testimonial[];
};

export type EventItem = {
  slug: string;
  title: string;
  category: string;
  tone: EventTone;
  day: string;
  month: string;
  description: string;
  image: string;
  status: EventStatus;
  href: string;
  detail: EventDetail;
};

export const eventFilters = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
] as const;

export type EventFilter = (typeof eventFilters)[number]["value"];
