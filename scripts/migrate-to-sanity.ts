/**
 * One-off migration: seeds Sanity with the content currently hardcoded in
 * `constants/`. External (Unsplash) images are uploaded as real Sanity assets
 * so the client can replace them in the Studio.
 *
 * Run once after creating your project and adding env vars:
 *   npm run migrate
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 *   SANITY_API_WRITE_TOKEN (Editor permissions)
 */
import { readFileSync } from "node:fs";
import { basename } from "node:path";

import { createClient, type SanityClient } from "@sanity/client";

import { events } from "../constants/events";
import { resources } from "../constants/resources";
import { team, faqs, storyStats, values } from "../constants/about";
import {
  stats as homeStats,
  communityAvatars,
  communityTestimonials,
} from "../constants/homepage";
import { involvementPaths, volunteerVoices } from "../constants/get-involved";
import { contactDetails, contactSocials } from "../constants/contact";
import { siteConfig, mainNavLinks } from "../constants/navigation";
import {
  getResourceIconKey,
  getFeatureIconKey,
  getSocialIconKey,
} from "../lib/content/icons";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing env. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Cache uploads so the same image URL is only uploaded once per run.
const imageCache = new Map<string, string>();

async function uploadImage(
  c: SanityClient,
  url: string | undefined
): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string } } | undefined> {
  if (!url) return undefined;
  let assetId = imageCache.get(url);
  if (!assetId) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      const filename = url.split("/").pop()?.split("?")[0] || "image.jpg";
      const asset = await c.assets.upload("image", buffer, { filename });
      assetId = asset._id;
      imageCache.set(url, assetId);
      console.log(`  ↑ uploaded ${filename}`);
    } catch (err) {
      console.warn(`  ! failed to upload ${url}: ${(err as Error).message}`);
      return undefined;
    }
  }
  return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

// Upload an image bundled in the repo (path relative to the project root).
async function uploadLocalImage(
  c: SanityClient,
  relPath: string
): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string } } | undefined> {
  let assetId = imageCache.get(relPath);
  if (!assetId) {
    try {
      const buffer = readFileSync(relPath);
      const filename = basename(relPath);
      const asset = await c.assets.upload("image", buffer, { filename });
      assetId = asset._id;
      imageCache.set(relPath, assetId);
      console.log(`  ↑ uploaded ${filename}`);
    } catch (err) {
      console.warn(`  ! failed to upload ${relPath}: ${(err as Error).message}`);
      return undefined;
    }
  }
  return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

const partnerLogoFiles = [
  "assets/institutions/Logo.png",
  "assets/institutions/Logo-1.png",
  "assets/institutions/Logo-2.png",
  "assets/institutions/Logo-3.png",
  "assets/institutions/Logo-4.png",
  "assets/institutions/Logo-5.png",
  "assets/institutions/Logo-6.png",
  "assets/institutions/Logo-7.png",
  "assets/institutions/Logo-8.png",
  "assets/institutions/Logo-9.png",
  "assets/institutions/Logo-10.png",
  "assets/institutions/Logo-11.png",
];

async function migrate() {
  console.log(`Migrating to ${projectId}/${dataset}…\n`);

  // Events
  console.log("Events:");
  for (const e of events) {
    const image = await uploadImage(client, e.image);
    const gallery = (
      await Promise.all(
        e.detail.gallery.map((g) => uploadImage(client, g))
      )
    ).filter(Boolean);
    const facilitators = await Promise.all(
      e.detail.facilitators.map(async (f) => ({
        _type: "facilitator",
        _key: slugify(f.name),
        name: f.name,
        role: f.role,
        bio: f.bio,
        avatar: await uploadImage(client, f.avatar),
      }))
    );

    await client.createOrReplace({
      _id: `event-${e.slug}`,
      _type: "event",
      title: e.title,
      slug: { _type: "slug", current: e.slug },
      status: e.status,
      category: e.category,
      tone: e.tone,
      day: e.day,
      month: e.month,
      image,
      description: e.description,
      summary: e.detail.summary,
      dateLabel: e.detail.dateLabel,
      duration: e.detail.duration,
      host: e.detail.host,
      location: e.detail.location,
      whoFor: e.detail.whoFor,
      whatYouGet: e.detail.whatYouGet,
      agenda: e.detail.agenda.map((a, i) => ({
        _type: "agendaItem",
        _key: `agenda-${i}`,
        time: a.time,
        title: a.title,
        description: a.description,
      })),
      facilitators,
      gallery: gallery.map((g, i) => ({ ...g!, _key: `gallery-${i}` })),
      testimonials: e.detail.testimonials.map((t, i) => ({
        _type: "testimonial",
        _key: `testimonial-${i}`,
        quote: t.quote,
        author: t.author,
      })),
    });
    console.log(`  ✓ ${e.title}`);
  }

  // Resources
  console.log("\nResources:");
  for (const r of resources) {
    await client.createOrReplace({
      _id: `resource-${r.slug}`,
      _type: "resource",
      title: r.title,
      slug: { _type: "slug", current: r.slug },
      category: r.category,
      year: r.year,
      description: r.description,
      icon: getResourceIconKey(r.icon),
      tone: r.tone,
    });
    console.log(`  ✓ ${r.title}`);
  }

  // Team
  console.log("\nTeam:");
  for (const [i, m] of team.entries()) {
    const image = await uploadImage(client, m.image);
    await client.createOrReplace({
      _id: `teamMember-${slugify(m.name)}`,
      _type: "teamMember",
      name: m.name,
      role: m.role,
      tone: m.tone,
      order: i,
      image,
    });
    console.log(`  ✓ ${m.name}`);
  }

  // FAQs
  console.log("\nFAQs:");
  for (const [i, f] of faqs.entries()) {
    await client.createOrReplace({
      _id: `faq-${i}`,
      _type: "faq",
      question: f.question,
      answer: f.answer,
      order: i,
    });
    console.log(`  ✓ ${f.question}`);
  }

  // Testimonials
  console.log("\nTestimonials:");
  for (const [i, t] of communityTestimonials.entries()) {
    await client.createOrReplace({
      _id: `testimonial-${i}`,
      _type: "communityTestimonial",
      quote: t.quote,
      name: t.name,
      meta: t.meta,
      image: await uploadImage(client, t.image),
      imageAlt: t.imageAlt,
      order: i,
    });
    console.log(`  ✓ ${t.name}`);
  }

  // Partners
  console.log("\nPartners:");
  for (const [i, file] of partnerLogoFiles.entries()) {
    await client.createOrReplace({
      _id: `partner-${i}`,
      _type: "partner",
      name: `Institution ${i + 1}`,
      logo: await uploadLocalImage(client, file),
      order: i,
    });
    console.log(`  ✓ Institution ${i + 1}`);
  }

  // Home page (singleton)
  console.log("\nHome page:");
  const heroImage = await uploadImage(client, HERO_IMAGE_URL);
  const avatars = (
    await Promise.all(communityAvatars.map((a) => uploadImage(client, a)))
  ).filter(Boolean);
  await client.createOrReplace({
    _id: "homeSettings",
    _type: "homeSettings",
    heroEyebrow: "A youth-led mental health movement",
    heroTitlePrefix: "Uniting youth for",
    heroTitleHighlight: "mental health",
    heroTitleSuffix: "awareness.",
    heroDescription:
      "We are building a kinder generation through real conversations, free resources, and a community that shows up for each other.",
    heroImage,
    heroPrimaryCtaLabel: "Get Involved",
    heroPrimaryCtaHref: siteConfig.joinHref,
    heroSecondaryCtaLabel: "Learn More",
    heroSecondaryCtaHref: "/about",
    heroBadgePrimary: "you matter 🍁",
    heroBadgeSecondary: "it's okay to not be okay ☘️",
    heroSocialProofCount: "2445+",
    heroSocialProofText: "young people already in the movement",
    eventsLabel: "Upcoming events",
    eventsHeadingLead: "Show up.",
    eventsHeadingEmphasis: "Belong.",
    resourcesLabel: "Free resources",
    resourcesHeadingLead: "Tools for the",
    resourcesHeadingEmphasis: "hard days.",
    testimonialHeading: {
      _type: "sectionHeading",
      label: "Real stories",
      headingLead: "Words from our",
      headingEmphasis: "community.",
    },
    partnersHeading: {
      _type: "sectionHeading",
      label: "Our partners",
      headingLead: "Participating",
      headingEmphasis: "institutions.",
    },
    instagramHeading: {
      _type: "sectionHeading",
      label: "",
      headingLead: "Find us on the",
      headingEmphasis: "gram",
    },
    communityAvatars: avatars.map((a, i) => ({ ...a!, _key: `avatar-${i}` })),
    stats: homeStats.map((s, i) => ({
      _type: "stat",
      _key: `stat-${i}`,
      value: s.value,
      label: s.label,
      tone: s.tone,
      icon: getFeatureIconKey(s.icon),
    })),
  });
  console.log("  ✓ Home page");

  // About page (singleton)
  console.log("\nAbout page:");
  await client.createOrReplace({
    _id: "aboutSettings",
    _type: "aboutSettings",
    hero: {
      _type: "pageHero",
      label: "Our story",
      titleLead: "We started with one",
      titleEmphasis: "honest",
      titleSuffix: "conversation",
      paragraphs: [
        "Mind Matters Network began with a simple but powerful idea: young people deserve a voice in mental health. It started in a small classroom, where a few students gathered to share their struggles, support one another, and learn how to advocate for mental well-being. From those early conversations, MMN has grown into a nationwide youth-led movement — a network that brings together students, educators, and mental health advocates across Malaysia.",
        "Our journey has been one of learning, connection, and impact. We’ve developed resources like the Youth Mental Health Handbook, hosted events in schools and universities, and launched initiatives that give young people the tools to lead change in their communities. Through collaboration and action, we’re building a generation that not only cares about mental health, but also knows how to support each other.",
        "At MMN, we believe that real change starts with us — the youth. By working together, we’re breaking the stigma, starting important conversations, and creating spaces where mental health is valued, understood, and prioritized. Our story is still being written, and we invite you to be part of it.",
      ],
    },
    whyHeading: {
      _type: "sectionHeading",
      label: "Why we exist",
      headingLead: "A generation rewriting the rules of",
      headingEmphasis: "care.",
    },
    whyParagraphs: [
      "Mind Matters Network is a youth platform that brings together mental health initiatives so that it reaches both schools and university students at ground level. Each participating educational institute will be part of the Mind Matters Network which is a Peer Mental Health Group by integrating the Mind Matters programme in their clubs. The participating institute will be supported by the core committee of the Mind Matters Network in terms of proposed activities, resources, networking and training.",
      "In return, the participating institute may conduct a string of activities, suggestions will be provided in the Mind Matters booklet, to highlight and build mental health resilience and skills among their students.",
      "Students will also have the opportunity to join events at national level where they have the opportunity to speak up, network and champion mental health advocacy in our local community.",
    ],
    teamHeading: {
      _type: "sectionHeading",
      label: "The humans",
      headingLead: "Meet the",
      headingEmphasis: "team.",
    },
    valuesHeading: {
      _type: "sectionHeading",
      label: "Our values",
      headingLead: "What we",
      headingEmphasis: "stand for.",
    },
    faqHeading: {
      _type: "sectionHeading",
      label: "FAQ",
      headingLead: "Things",
      headingEmphasis: "people ask.",
    },
    missionText:
      "To make mental wellbeing a daily, normal conversation in every young person's life.",
    visionText:
      "A world where no young person ever feels like they have to struggle alone.",
    storyStats: storyStats.map((s, i) => ({
      _type: "storyStat",
      _key: `storyStat-${i}`,
      value: s.value,
      label: s.label,
      tone: s.tone,
    })),
    values: values.map((v, i) => ({
      _type: "value",
      _key: `value-${i}`,
      title: v.title,
      description: v.description,
      icon: getFeatureIconKey(v.icon),
      tone: v.tone,
    })),
  });
  console.log("  ✓ About page");

  // Get Involved page (singleton)
  console.log("\nGet Involved page:");
  const voices = await Promise.all(
    volunteerVoices.map(async (v, i) => ({
      _type: "voice",
      _key: `voice-${i}`,
      quote: v.quote,
      name: v.name,
      role: v.role,
      tone: v.tone,
      image: await uploadImage(client, v.image),
    }))
  );
  await client.createOrReplace({
    _id: "getInvolvedSettings",
    _type: "getInvolvedSettings",
    hero: {
      _type: "pageHero",
      label: "Get involved",
      titleLead: "Be the friend you",
      titleEmphasis: "wish you'd had.",
      description:
        "Pick a path below. Whatever your time, skill, or geography — there's a way to plug in.",
    },
    voicesHeading: {
      _type: "sectionHeading",
      label: "From our volunteers",
      headingLead: "Why people",
      headingEmphasis: "stick around.",
    },
    paths: involvementPaths.map((p, i) => ({
      _type: "path",
      _key: `path-${i}`,
      key: { _type: "slug", current: p.id },
      emoji: p.emoji,
      title: p.title,
      description: p.description,
      perks: p.perks,
      tone: p.tone,
    })),
    voices,
  });
  console.log("  ✓ Get Involved page");

  // Contact details (singleton)
  console.log("\nContact details:");
  await client.createOrReplace({
    _id: "contactSettings",
    _type: "contactSettings",
    hero: {
      _type: "pageHero",
      label: "Say hi",
      titleLead: "Let's",
      titleEmphasis: "talk.",
      description:
        "Whether you're a young person looking for community, a partner, or just a curious soul — drop us a line.",
    },
    email: contactDetails.email,
    phone: contactDetails.phone,
    addressLines: contactDetails.addressLines,
    hours: contactDetails.hours,
    socials: contactSocials.map((s, i) => ({
      _type: "social",
      _key: `social-${i}`,
      label: s.label,
      icon: getSocialIconKey(s.icon),
      href: s.href,
    })),
  });
  console.log("  ✓ Contact details");

  // Site settings (singleton)
  console.log("\nSite settings:");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    title: siteConfig.name,
    tagline: "A youth-led mental health movement 🌱",
    joinHref: siteConfig.joinHref,
    donateHref: siteConfig.donateHref,
    instagramHandle: siteConfig.instagram,
    instagramUrl: siteConfig.instagramUrl,
    mainNavLinks: mainNavLinks.map((l, i) => ({
      _type: "navLink",
      _key: `nav-${i}`,
      label: l.label,
      href: l.href,
    })),
    footerExploreLinks: [
      { label: "About", href: "/about" },
      { label: "Events", href: "/events" },
      { label: "Resources", href: "/resources" },
      { label: "Get Involved", href: "/get-involved" },
    ].map((l, i) => ({ _type: "link", _key: `explore-${i}`, ...l })),
    footerSupportLinks: [
      { label: "Contact", href: "/contact" },
      { label: "Crisis lines", href: "/crisis-help" },
      { label: "FAQ", href: "/faq" },
      { label: "Privacy", href: "/privacy" },
    ].map((l, i) => ({ _type: "link", _key: `support-${i}`, ...l })),
    socials: [
      { label: "Instagram", icon: "instagram", href: siteConfig.instagramUrl },
      { label: "LinkedIn", icon: "linkedin", href: "https://linkedin.com" },
      { label: "Facebook", icon: "facebook", href: "https://facebook.com" },
      { label: "Twitter", icon: "twitter", href: "https://twitter.com" },
    ].map((s, i) => ({ _type: "social", _key: `social-${i}`, ...s })),
    newsletterHeadingLead: "Get a little goodness",
    newsletterHeadingEmphasis: "in your box.",
    newsletterText:
      "Monthly stories, free toolkits, gentle reminders that you're not alone.",
    newsletterPlaceholder: "you@kind.email",
    newsletterButtonLabel: "Subscribe",
  });
  console.log("  ✓ Site settings");

  // Events page (singleton)
  console.log("\nEvents page:");
  await client.createOrReplace({
    _id: "eventsSettings",
    _type: "eventsSettings",
    hero: {
      _type: "pageHero",
      label: "Events",
      titleLead: "Come as you are.",
      titleEmphasis: "Leave a little lighter.",
      description:
        "From journaling circles to outdoor meditations, our events are made to be soft landings — judgement-free, free to join.",
    },
  });
  console.log("  ✓ Events page");

  // Resources page (singleton)
  console.log("\nResources page:");
  await client.createOrReplace({
    _id: "resourcesSettings",
    _type: "resourcesSettings",
    hero: {
      _type: "pageHero",
      label: "Free resources",
      titleLead: "Tools, words &",
      titleEmphasis: "small comforts.",
      description:
        "Designed by youth, reviewed by professionals — every resource is free to download, share and remix.",
    },
    featured: {
      tag: "Featured · 2024",
      title: "The Big Little Guide to Feeling Things.",
      description:
        "A 60-page illustrated companion for naming, sitting with, and moving through emotions — written by and for young people.",
      href: "/resources/big-little-guide",
      icon: "heart",
    },
  });
  console.log("  ✓ Resources page");

  console.log("\nDone. Open /studio to review your content.");
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
