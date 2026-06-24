export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

/**
 * `true` once a Sanity project id is present. The site reads this to decide
 * whether to pull content from Sanity or fall back to the bundled seed content
 * in `constants/`, so the app keeps working before the CMS is connected.
 */
export const isSanityConfigured = Boolean(projectId);
