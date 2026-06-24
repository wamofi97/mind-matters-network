import "server-only";

import type { QueryParams } from "next-sanity";

import { client } from "./client";

/**
 * Thin wrapper around the Sanity client for use in Server Components.
 *
 * Results are cached and tagged by document type so they can be revalidated on
 * demand from the Sanity publish webhook (`app/api/revalidate`). The `revalidate`
 * time acts as a safety net: even if a webhook is ever missed, content self-heals
 * within this window.
 */
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
  revalidate = 3600,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
}): Promise<QueryResponse> {
  if (!client) {
    throw new Error(
      "Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID in your environment."
    );
  }

  return client.fetch<QueryResponse>(query, params, {
    next: {
      revalidate,
      tags,
    },
  });
}
