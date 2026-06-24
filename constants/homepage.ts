import { BookOpen, Building2, Sparkles, Users } from "lucide-react";

export const stats = [
  {
    value: "2445",
    label: "Total Event Participants",
    tone: "coral" as const,
    icon: Users,
  },
  {
    value: "2000",
    label: "Handbooks distributed",
    tone: "butter" as const,
    icon: BookOpen,
  },
  {
    value: "51",
    label: "Partner institutions",
    tone: "mint" as const,
    icon: Building2,
  },
  {
    value: "20",
    label: "Initiatives",
    tone: "lilac" as const,
    icon: Sparkles,
  },
];

export const events = [
  {
    title: "Journaling Circle",
    category: "Wellness",
    date: "May 12",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
    href: "/events/journaling-circle",
  },
  {
    title: "Sunset Mindfulness",
    category: "Mindfulness",
    date: "May 18",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    href: "/events/sunset-mindfulness",
  },
  {
    title: "Open Mic: Real Talk",
    category: "Community",
    date: "May 24",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
    href: "/events/open-mic",
  },
];

export const resources = [
  {
    title: "Anxiety 101 Guide",
    description: "A gentle primer on anxiety — what it is, and how to cope.",
    icon: "heart",
    href: "/resources/anxiety-101",
  },
  {
    title: "Conversation Toolkit",
    description: "Scripts and prompts for checking in on someone you care about.",
    icon: "message",
    href: "/resources/conversation-toolkit",
  },
  {
    title: "Journaling Circle",
    description: "Prompts and practices from our popular community circle.",
    icon: "book",
    href: "/resources/journaling-circle",
  },
];

export const instagramPosts = [
  {
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
    alt: "Friends laughing together",
  },
  {
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80",
    alt: "Youth group outdoors",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&q=80",
    alt: "Community gathering",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
    alt: "Team collaboration",
  },
  {
    image:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&q=80",
    alt: "Students studying together",
  },
  {
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&q=80",
    alt: "Friends at an event",
  },
];

export const communityAvatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
];
