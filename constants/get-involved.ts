export type PathTone = "coral" | "butter" | "mint";

export type InvolvementPath = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  perks: string[];
  tone: PathTone;
};

export const involvementPaths: InvolvementPath[] = [
  {
    id: "volunteer",
    emoji: "🙌",
    title: "Volunteer",
    description:
      "Help run events, moderate circles, or design resources.",
    perks: ["Flexible hours", "Training included", "Remote-friendly"],
    tone: "coral",
  },
  {
    id: "ambassador",
    emoji: "🎓",
    title: "Campus Ambassador",
    description:
      "Start or grow a chapter at your school. We give you the kit and a buddy.",
    perks: ["Starter kit", "Mentor support", "Lead a team"],
    tone: "butter",
  },
  {
    id: "partner",
    emoji: "🤝",
    title: "Partner",
    description:
      "For organisations, schools, and brands who want to do good, together.",
    perks: ["Co-built programs", "Shared reach", "Real impact"],
    tone: "mint",
  },
];

export const interestOptions = [
  { value: "volunteer", label: "Volunteer" },
  { value: "ambassador", label: "Campus Ambassador" },
  { value: "partner", label: "Partner" },
  { value: "other", label: "Something else" },
];

export type VoiceTone = "butter" | "mint" | "coral";

export type VolunteerVoice = {
  quote: string;
  name: string;
  role: string;
  image: string;
  tone: VoiceTone;
};

export const volunteerVoices: VolunteerVoice[] = [
  {
    quote: "I came to give back. I left with a chosen family.",
    name: "Aanya",
    role: "Volunteer · 2 years",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
    tone: "butter",
  },
  {
    quote: "Best 4 hours of my month, every month.",
    name: "Rohan",
    role: "Campus Ambassador",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
    tone: "mint",
  },
  {
    quote: "Real impact. Real friends. No fluff.",
    name: "Malik",
    role: "Partner Lead",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    tone: "coral",
  },
];
