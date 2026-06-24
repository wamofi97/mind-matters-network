import { type NextRequest, NextResponse } from "next/server";

import { writeClient } from "@/sanity/lib/write-client";

export const runtime = "nodejs";

const KINDS = [
  "contact",
  "involvement",
  "eventRegistration",
  "newsletter",
] as const;
type SubmissionKind = (typeof KINDS)[number];

const MAX_FIELD = 500;
const MAX_MESSAGE = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort, in-memory rate limit. Resets on cold start — fine for low volume.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function clean(value: unknown, max = MAX_FIELD): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim().slice(0, max);
  return trimmed.length > 0 ? trimmed : undefined;
}

function badRequest(error: string) {
  return NextResponse.json({ ok: false, error }, { status: 400 });
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return badRequest("Invalid request body.");
  }

  // Honeypot: real users never fill this. Pretend success to not tip off bots.
  if (clean(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const kind = body.kind as SubmissionKind;
  if (!KINDS.includes(kind)) {
    return badRequest("Unknown submission type.");
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again shortly." },
      { status: 429 }
    );
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const phone = clean(body.phone);
  const message = clean(body.message, MAX_MESSAGE);

  // Newsletter signups are email-only; every other kind collects a name.
  if (kind !== "newsletter" && !name) {
    return badRequest("Please enter your name.");
  }
  if (email && !EMAIL_RE.test(email)) {
    return badRequest("Please enter a valid email address.");
  }

  const doc: { _type: string; [key: string]: unknown } = {
    _type: "submission",
    kind,
    status: "new",
    name,
    submittedAt: new Date().toISOString(),
    source: clean(body.source),
  };

  if (kind === "newsletter") {
    if (!email) return badRequest("Please enter your email.");
    doc.email = email;
  }

  if (kind === "contact") {
    if (!email) return badRequest("Please enter your email.");
    doc.email = email;
    doc.subject = clean(body.subject);
    doc.message = message;
  }

  if (kind === "involvement") {
    if (!email) return badRequest("Please enter your email.");
    doc.email = email;
    doc.phone = phone;
    doc.interest = clean(body.interest);
    doc.message = message;
  }

  if (kind === "eventRegistration") {
    if (!email) return badRequest("Please enter your email.");
    doc.email = email;
    doc.phone = phone;
    doc.eventTitle = clean(body.eventTitle);
    const eventSlug = clean(body.eventSlug);
    doc.eventSlug = eventSlug;

    // Link to the Sanity event document when it exists (events may come from
    // bundled fallback content, in which case there's no document to reference).
    if (writeClient && eventSlug) {
      try {
        const eventId = await writeClient.fetch<string | null>(
          '*[_type == "event" && slug.current == $slug][0]._id',
          { slug: eventSlug }
        );
        if (eventId) {
          doc.event = { _type: "reference", _ref: eventId, _weak: true };
        }
      } catch {
        // Non-fatal: keep the denormalized slug/title.
      }
    }
  }

  if (!writeClient) {
    console.error("Submission failed: Sanity write client is not configured.");
    return NextResponse.json(
      { ok: false, error: "Submissions are not configured." },
      { status: 500 }
    );
  }

  try {
    await writeClient.create(doc);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Submission create failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
