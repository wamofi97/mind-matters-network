import { HeartHandshake, MessagesSquare, Sparkles } from "lucide-react";

export const storyStats = [
  {
    value: "2020",
    label: "Founded by 4 students",
    tone: "coral" as const,
  },
  {
    value: "180+",
    label: "Campus chapters",
    tone: "lilac" as const,
  },
];

export const values = [
  {
    title: "Radical kindness",
    description:
      "Care without conditions. Every person deserves to be met where they are.",
    icon: HeartHandshake,
    tone: "coral" as const,
  },
  {
    title: "Real conversations",
    description:
      "No buzzwords. We speak plainly about hard things, together.",
    icon: MessagesSquare,
    tone: "mint" as const,
  },
  {
    title: "Youth-led, always",
    description:
      "Decisions are made by the people we serve. Always.",
    icon: Sparkles,
    tone: "lilac" as const,
  },
];

export const faqs = [
  {
    question: "Is this a crisis service?",
    answer:
      "No. Mind Matters Network is a peer-led community and resource platform, not an emergency or clinical service. If you or someone you know is in crisis, please contact a local helpline or emergency services right away.",
  },
  {
    question: "Do I need to be a student to join?",
    answer:
      "Not at all. While much of our work happens in schools and universities, anyone who cares about youth mental health is welcome to get involved as a member, volunteer, or partner.",
  },
  {
    question: "Are your resources really free?",
    answer:
      "Yes. Our handbooks, toolkits, and event materials are free to access and share. We believe mental health support should never sit behind a paywall.",
  },
  {
    question: "How do I start a chapter?",
    answer:
      "Reach out through our Get Involved page and our team will guide you through setting up a Mind Matters chapter at your institution, including resources, training, and ongoing support.",
  },
];

export type TeamTone = "coral" | "butter" | "mint" | "lilac";

export const team = [
  {
    name: "Sharruda",
    role: "Founding Director",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
    tone: "coral" as TeamTone,
  },
  {
    name: "Masumi",
    role: "Director of Marketing",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    tone: "lilac" as TeamTone,
  },
  {
    name: "Adlin Sofea",
    role: "Co Founder",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80",
    tone: "mint" as TeamTone,
  },
  {
    name: "Courtney Henry",
    role: "Co Founder",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    tone: "butter" as TeamTone,
  },
  {
    name: "Darrell Steward",
    role: "Co Founder",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    tone: "butter" as TeamTone,
  },
  {
    name: "Floyd Miles",
    role: "Co Founder",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
    tone: "coral" as TeamTone,
  },
  {
    name: "Kristin Watson",
    role: "Co Founder",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
    tone: "lilac" as TeamTone,
  },
  {
    name: "Dianne Russell",
    role: "Co Founder",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
    tone: "mint" as TeamTone,
  },
];
