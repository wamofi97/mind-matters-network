import { useEffect, useRef } from "react";
import { type StringInputProps, useClient, useFormValue } from "sanity";

import { apiVersion } from "../env";

/**
 * Renders the normal Status radio, but also auto-advances a submission from
 * "New" to "Read" the first time it's opened in the Studio — like marking an
 * email read. Patches the published document directly (no draft/publish step)
 * and never downgrades a "Read"/"Handled" item.
 */
export function StatusInput(props: StringInputProps) {
  const client = useClient({ apiVersion });
  const id = useFormValue(["_id"]) as string | undefined;
  const value = props.value;
  const patched = useRef(false);

  useEffect(() => {
    if (patched.current || value !== "new" || !id) return;
    patched.current = true;
    const publishedId = id.replace(/^drafts\./, "");
    client
      .patch(publishedId)
      .set({ status: "read" })
      .commit()
      .catch(() => {
        // Allow a retry on the next render if the patch failed.
        patched.current = false;
      });
  }, [client, id, value]);

  return props.renderDefault(props);
}
