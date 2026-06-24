import "server-only";

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/**
 * Server-only Sanity client with write access.
 *
 * Uses `SANITY_API_WRITE_TOKEN` (Editor permissions) and must never be imported
 * into a client component — the `server-only` import enforces this at build time.
 * Used by route handlers to persist public form submissions.
 */
export const writeClient =
  projectId && process.env.SANITY_API_WRITE_TOKEN
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token: process.env.SANITY_API_WRITE_TOKEN,
        perspective: "raw",
      })
    : null;
