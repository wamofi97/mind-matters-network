import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Build a Sanity CDN URL for an image asset. Returns an empty string when the
 * source is missing so callers can fall back gracefully.
 */
export function urlForImage(source: SanityImageSource | undefined | null) {
  if (!source) return "";
  return builder.image(source).auto("format").fit("max").url();
}
