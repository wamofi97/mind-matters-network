/**
 * Sanity Studio configuration.
 *
 * The Studio is embedded in this Next.js app and served at `/studio`
 * (see `app/studio/[[...tool]]/page.tsx`).
 */
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { exportSubmissionsTool } from "./sanity/tools/export-submissions";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "Mind Matters Network",
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  tools: (prev) => [...prev, exportSubmissionsTool],
});
