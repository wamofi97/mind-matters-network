/**
 * Embedded Sanity Studio, served at `/studio`.
 *
 * All routes under `/studio` are handled by this single catch-all so the Studio
 * can manage its own client-side routing. The actual Studio lives in the
 * client-only `Studio` component so the config stays out of the RSC graph.
 */
import Studio from "./Studio";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <Studio />;
}
