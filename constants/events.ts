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

export const events: EventItem[] = [
  {
    slug: "journaling-circle",
    title: "Journaling Circle",
    category: "Workshop",
    tone: "butter",
    day: "12",
    month: "MAY",
    description: "A guided 90-min session to put feelings on paper. No writing skill required — just curiosity. We'll move through three gentle prompts designed to help you notice what you're feeling, name it, and release a little of it onto the page.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
    status: "upcoming",
    href: "/events/journaling-circle",
    detail: {
      summary:
        "Settle in for a soft, judgement-free evening of guided journaling. We'll move through three gentle prompts designed to help you notice what you're feeling, name it, and release a little of it onto the page. No writing skill required — just curiosity.",
      dateLabel: "Tuesday, May 12, 2026 · 6:00 PM",
      duration: "90 minutes",
      host: "Mind Matters Network",
      location: "The Commons Room, Bandar Sunway",
      whoFor: [
        "Students & young adults (16–30)",
        "First-time journallers welcome",
        "Anyone craving quiet community",
      ],
      whatYouGet: [
        "Three guided prompts you can take home",
        "A mini toolkit for daily emotional check-ins",
        "Tea, snacks, and gentle conversation",
      ],
      agenda: [
        {
          time: "6:00 PM",
          title: "Doors open & tea",
          description: "Settle in, find a seat, grab a warm drink.",
        },
        {
          time: "6:15 PM",
          title: "Welcome & grounding",
          description: "A short breath practice to help you arrive.",
        },
        {
          time: "6:30 PM",
          title: "Guided prompts",
          description: "Three rounds of writing with soft music.",
        },
        {
          time: "7:00 PM",
          title: "Optional sharing circle",
          description: "Share a line, or simply listen.",
        },
        { time: "7:20 PM", title: "Close" },
      ],
      facilitators: [
        {
          name: "Maya Chen",
          role: "Peer Facilitator",
          bio: "Runs our weekly journaling sessions across schools and community spaces.",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
        },
        {
          name: "Devon Park",
          role: "Wellbeing Lead",
          bio: "Trains a national network of peer leads focused on student wellbeing.",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
        },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
      ],
      testimonials: [
        {
          quote:
            "I left feeling lighter than I had in months. The prompts were so well chosen.",
          author: "May, past attendee",
        },
        {
          quote: "It felt safe to just show up as myself. Will be back.",
          author: "Iris, past attendee",
        },
      ],
    },
  },
  {
    slug: "sunset-mindfulness",
    title: "Sunset Mindfulness",
    category: "Outdoor",
    tone: "mint",
    day: "25",
    month: "MAY",
    description: "Outdoor breath + body practice in the park.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    status: "upcoming",
    href: "/events/sunset-mindfulness",
    detail: {
      summary:
        "Wind down the day with a gentle outdoor practice as the sun sets. We'll move through light stretching, breathwork, and a guided meditation on the grass — a soft reset for your nervous system.",
      dateLabel: "Sunday, May 25, 2026 · 6:30 PM",
      duration: "60 minutes",
      host: "Mind Matters Network",
      location: "Taman Tasik Perdana, Kuala Lumpur",
      whoFor: [
        "Anyone needing to slow down",
        "Beginners to meditation",
        "People who think better outdoors",
      ],
      whatYouGet: [
        "A simple breath practice for stressful days",
        "A guided body-scan meditation",
        "Time outdoors with a kind community",
      ],
      agenda: [
        {
          time: "6:30 PM",
          title: "Gather & settle",
          description: "Roll out a mat, get comfortable.",
        },
        {
          time: "6:45 PM",
          title: "Gentle movement",
          description: "Light stretching to release the day.",
        },
        {
          time: "7:05 PM",
          title: "Guided meditation",
          description: "Breath and body-scan as the sun sets.",
        },
        { time: "7:30 PM", title: "Close" },
      ],
      facilitators: [
        {
          name: "Priya Nair",
          role: "Mindfulness Guide",
          bio: "Leads outdoor meditation sessions and teaches breathwork to students.",
          avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
        },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=80",
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
      ],
      testimonials: [
        {
          quote: "The most peaceful hour of my whole week. I slept so well after.",
          author: "Hana, past attendee",
        },
        {
          quote: "Didn't think meditation was for me — this changed my mind.",
          author: "Z, past attendee",
        },
      ],
    },
  },
  {
    slug: "open-mic",
    title: "Open Mic: Real Talk",
    category: "Community",
    tone: "lilac",
    day: "04",
    month: "JUN",
    description: "Share your story. Or just listen.",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
    status: "upcoming",
    href: "/events/open-mic",
    detail: {
      summary:
        "An open, tender evening where young people share what's really going on — through words, music, or poetry. No pressure to perform. Come to share your story, or simply to listen and feel less alone.",
      dateLabel: "Thursday, June 4, 2026 · 7:00 PM",
      duration: "2 hours",
      host: "Mind Matters Network",
      location: "Black Box, Publika, Kuala Lumpur",
      whoFor: [
        "Storytellers, musicians & listeners",
        "Anyone who's felt unheard",
        "First-time sharers especially",
      ],
      whatYouGet: [
        "A warm, judgement-free stage",
        "A community that actually listens",
        "Connection over shared experience",
      ],
      agenda: [
        {
          time: "7:00 PM",
          title: "Doors & mingling",
          description: "Grab a seat and a drink.",
        },
        {
          time: "7:30 PM",
          title: "Open mic begins",
          description: "Sign-ups welcome all night.",
        },
        {
          time: "8:45 PM",
          title: "Closing circle",
          description: "A few words to wrap up together.",
        },
        { time: "9:00 PM", title: "Close" },
      ],
      facilitators: [
        {
          name: "Arif Rahman",
          role: "Community Host",
          bio: "Hosts our open-mic nights and creates space for honest stories.",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
        },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80",
      ],
      testimonials: [
        {
          quote: "I shared something I'd never said out loud. People just held it.",
          author: "Sam, past attendee",
        },
        {
          quote: "Came alone, left with friends. That never happens to me.",
          author: "Nadia, past attendee",
        },
      ],
    },
  },
  {
    slug: "anxiety-101",
    title: "Anxiety 101 Workshop",
    category: "Workshop",
    tone: "butter",
    day: "02",
    month: "APR",
    description: "Tools that actually help when your chest gets tight.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80",
    status: "past",
    href: "/events/anxiety-101",
    detail: {
      summary:
        "A practical, science-backed walkthrough of what anxiety is, why it shows up, and what you can actually do in the moment. Includes a take-home toolkit.",
      dateLabel: "Wednesday, April 2, 2025 · 5:30 PM",
      duration: "90 minutes",
      host: "Mind Matters Network",
      location: "Sunway University, Bandar Sunway",
      whoFor: [
        "Students dealing with exam stress",
        "Anyone curious about anxiety",
      ],
      whatYouGet: [
        "Understand the anxiety cycle",
        "3 grounding tools you'll actually use",
        "Q&A with a clinician",
      ],
      agenda: [
        { time: "5:30 PM", title: "Welcome" },
        { time: "5:45 PM", title: "What anxiety actually is" },
        { time: "6:15 PM", title: "Tools & practice" },
        { time: "6:45 PM", title: "Q&A" },
      ],
      facilitators: [
        {
          name: "Alisha Bello",
          role: "Clinical Psychologist",
          bio: "Works with young people navigating anxiety and burnout.",
          avatar:
            "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80",
        },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80",
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
      ],
      testimonials: [
        {
          quote: "Finally, an explanation that didn't feel patronising.",
          author: "Past attendee",
        },
      ],
    },
  },
  {
    slug: "walk-and-talk",
    title: "Walk & Talk",
    category: "Outdoor",
    tone: "mint",
    day: "18",
    month: "MAR",
    description: "60-minute community walk with peer leads.",
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=80",
    status: "past",
    href: "/events/walk-and-talk",
    detail: {
      summary:
        "A relaxed community walk where the only goal is to move a little and talk a little. Peer leads keep conversation gentle and open — perfect for getting out of your head and into your body.",
      dateLabel: "Tuesday, March 18, 2025 · 8:00 AM",
      duration: "60 minutes",
      host: "Mind Matters Network",
      location: "KLCC Park, Kuala Lumpur",
      whoFor: [
        "Anyone who feels better moving",
        "People new to the community",
      ],
      whatYouGet: [
        "A gentle morning reset",
        "Easy conversation with peer leads",
        "A reason to step away from screens",
      ],
      agenda: [
        { time: "8:00 AM", title: "Meet & warm up" },
        { time: "8:15 AM", title: "The walk begins" },
        { time: "8:50 AM", title: "Cool down & check-in" },
      ],
      facilitators: [
        {
          name: "Tan Wei Ling",
          role: "Peer Lead",
          bio: "Organises our outdoor sessions and walk-and-talk meetups.",
          avatar:
            "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
        },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=80",
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
      ],
      testimonials: [
        {
          quote: "Talking while walking made everything so much easier to say.",
          author: "Past attendee",
        },
      ],
    },
  },
  {
    slug: "campus-summit",
    title: "Campus Summit",
    category: "Community",
    tone: "lilac",
    day: "22",
    month: "FEB",
    description: "200 ambassadors. One unforgettable weekend.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    status: "past",
    href: "/events/campus-summit",
    detail: {
      summary:
        "Our flagship weekend bringing together 200 student ambassadors from across the country for workshops, talks, and the kind of connection that changes how you see your role in mental health.",
      dateLabel: "February 22–23, 2025",
      duration: "2 days",
      host: "Mind Matters Network",
      location: "Putrajaya International Convention Centre",
      whoFor: [
        "Student ambassadors & chapter leads",
        "Anyone ready to drive change",
      ],
      whatYouGet: [
        "Hands-on advocacy workshops",
        "A national peer network",
        "Tools to lead a chapter",
      ],
      agenda: [
        { time: "Day 1", title: "Opening & keynote" },
        { time: "Day 1", title: "Advocacy workshops" },
        { time: "Day 2", title: "Chapter planning labs" },
        { time: "Day 2", title: "Closing & commitments" },
      ],
      facilitators: [
        {
          name: "Sharruda",
          role: "Founding Director",
          bio: "Leads Mind Matters Network and its national ambassador programme.",
          avatar:
            "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80",
        },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
      ],
      testimonials: [
        {
          quote: "200 ambassadors. One unforgettable weekend. I found my people.",
          author: "Past attendee",
        },
      ],
    },
  },
];

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((event) => event.slug === slug);
}

export function getRelatedEvents(slug: string, count = 3): EventItem[] {
  return events.filter((event) => event.slug !== slug).slice(0, count);
}
