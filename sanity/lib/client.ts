import { createClient } from "next-sanity";

import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

/**
 * Sanity read client. `null` until a project id is configured so the app can
 * import this module safely and fall back to bundled content.
 */
export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // `published` perspective + CDN for fast, cacheable public reads.
      useCdn: true,
      perspective: "published",
    })
  : null;
