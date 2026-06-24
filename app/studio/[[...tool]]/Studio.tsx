"use client";

/**
 * Client-only wrapper for the embedded Studio. Importing `sanity.config` here
 * (inside a Client Component) keeps it out of the React Server Component graph,
 * which otherwise fails because the Studio calls `createContext` at load.
 */
import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";

export default function Studio() {
  // `display: contents` keeps the Studio's own full-height layout intact while
  // giving us a hook (`.studio-root`) to scope overrides that counteract the
  // site's global base styles leaking in from the shared root layout.
  return (
    <div className="studio-root" style={{ display: "contents" }}>
      <NextStudio config={config} />
    </div>
  );
}
