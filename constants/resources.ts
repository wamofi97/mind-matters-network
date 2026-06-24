import {
  HeartPulse,
  MessagesSquare,
  Moon,
  BatteryLow,
  CalendarHeart,
  PhoneCall,
  type LucideIcon,
} from "lucide-react";

export type ResourceTone = "butter" | "coral" | "mint" | "lilac";
export type ResourceCategory = "Guides" | "Infographics" | "Toolkits";

export type ResourceItem = {
  slug: string;
  title: string;
  category: ResourceCategory;
  year: string;
  description: string;
  icon: LucideIcon;
  tone: ResourceTone;
  href: string;
};

export type FeaturedResource = {
  tag: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export const resourceFilters = [
  { value: "all", label: "All" },
  { value: "Guides", label: "Guides" },
  { value: "Infographics", label: "Infographics" },
  { value: "Toolkits", label: "Toolkits" },
] as const;

export type ResourceFilter = (typeof resourceFilters)[number]["value"];

export const featuredResource: FeaturedResource = {
  tag: "Featured · 2024",
  title: "The Big Little Guide to Feeling Things.",
  description:
    "A 60-page illustrated companion for naming, sitting with, and moving through emotions — written by and for young people.",
  href: "/resources/big-little-guide",
  icon: HeartPulse,
};

export const resources: ResourceItem[] = [
  {
    slug: "anxiety-101",
    title: "Anxiety 101",
    category: "Guides",
    year: "2024",
    description: "A friendly intro to understanding your body's stress signals.",
    icon: HeartPulse,
    tone: "coral",
    href: "/resources/anxiety-101",
  },
  {
    slug: "conversation-toolkit",
    title: "Conversation Toolkit",
    category: "Toolkits",
    year: "2024",
    description: "Scripts for the talks you've been avoiding.",
    icon: MessagesSquare,
    tone: "mint",
    href: "/resources/conversation-toolkit",
  },
  {
    slug: "sleep-mood-map",
    title: "Sleep & Mood Map",
    category: "Infographics",
    year: "2023",
    description: "How rest shapes your emotional weather.",
    icon: Moon,
    tone: "lilac",
    href: "/resources/sleep-mood-map",
  },
  {
    slug: "burnout-recovery",
    title: "Burnout Recovery",
    category: "Guides",
    year: "2024",
    description: "Small steps back to feeling like yourself.",
    icon: BatteryLow,
    tone: "butter",
    href: "/resources/burnout-recovery",
  },
  {
    slug: "self-care-planner",
    title: "Self-Care Planner",
    category: "Toolkits",
    year: "2023",
    description: "A weekly printable to build caring habits.",
    icon: CalendarHeart,
    tone: "coral",
    href: "/resources/self-care-planner",
  },
  {
    slug: "helpline-directory",
    title: "Helpline Directory",
    category: "Infographics",
    year: "2024",
    description: "Numbers to call, when you need a human now.",
    icon: PhoneCall,
    tone: "mint",
    href: "/resources/helpline-directory",
  },
];
