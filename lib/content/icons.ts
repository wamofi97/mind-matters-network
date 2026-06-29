import {
  HeartPulse,
  MessagesSquare,
  Moon,
  BatteryLow,
  CalendarHeart,
  PhoneCall,
  BookOpen,
  Users,
  Building2,
  Sparkles,
  HeartHandshake,
  Instagram,
  Linkedin,
  Youtube,
  Facebook,
  Twitter,
  type LucideIcon,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { TikTokIcon } from "@/components/shared/icons";

/** Any icon component that accepts a `className` (Lucide or custom SVG). */
export type IconComponent = ComponentType<{ className?: string } & SVGProps<SVGSVGElement>>;

/**
 * Maps the resource `icon` string keys (stored in Sanity) to Lucide icon
 * components used in the UI. Keep in sync with the `iconOptions` list in
 * `sanity/schemaTypes/resourceType.ts`.
 */
export const resourceIconMap: Record<string, LucideIcon> = {
  heart: HeartPulse,
  message: MessagesSquare,
  moon: Moon,
  battery: BatteryLow,
  calendar: CalendarHeart,
  phone: PhoneCall,
  book: BookOpen,
};

export type ResourceIconKey = keyof typeof resourceIconMap;

export function getResourceIcon(key: string | undefined): LucideIcon {
  return resourceIconMap[key ?? ""] ?? HeartPulse;
}

/**
 * Feature icons used by homepage stats and About values. Keep in sync with the
 * `iconOptions` lists in `sanity/schemaTypes/homeSettingsType.ts` and
 * `aboutSettingsType.ts`.
 */
export const featureIconMap: Record<string, IconComponent> = {
  users: Users,
  book: BookOpen,
  building: Building2,
  sparkles: Sparkles,
  "heart-handshake": HeartHandshake,
  message: MessagesSquare,
};

export function getFeatureIcon(key: string | undefined): IconComponent {
  return featureIconMap[key ?? ""] ?? Sparkles;
}

/**
 * Social icons used on the Contact page. Keep in sync with the `iconOptions`
 * list in `sanity/schemaTypes/contactSettingsType.ts`.
 */
export const socialIconMap: Record<string, IconComponent> = {
  instagram: Instagram,
  tiktok: TikTokIcon,
  youtube: Youtube,
  linkedin: Linkedin,
  facebook: Facebook,
  twitter: Twitter,
};

export function getSocialIcon(key: string | undefined): IconComponent {
  return socialIconMap[key ?? ""] ?? Instagram;
}
