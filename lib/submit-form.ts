export type SubmissionKind =
  | "contact"
  | "involvement"
  | "eventRegistration"
  | "newsletter";

export type SubmissionPayload = {
  kind: SubmissionKind;
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  interest?: string;
  message?: string;
  eventTitle?: string;
  eventSlug?: string;
  /** Honeypot — leave empty; bots tend to fill it. */
  company?: string;
  source?: string;
};

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Posts a form submission to the `/api/submissions` route handler. Returns a
 * discriminated result so callers can render success/error inline.
 */
export async function submitForm(
  payload: SubmissionPayload
): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        source:
          payload.source ??
          (typeof window !== "undefined" ? window.location.pathname : undefined),
      }),
    });

    const data = (await res.json().catch(() => null)) as SubmitResult | null;

    if (!res.ok || !data?.ok) {
      return {
        ok: false,
        error:
          (data && "error" in data && data.error) ||
          "Something went wrong. Please try again.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}
