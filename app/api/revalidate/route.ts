import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * On-demand revalidation endpoint for Sanity.
 *
 * A Sanity webhook POSTs here whenever a document is published/changed. We verify
 * the request signature, then revalidate the cache tag matching the document's
 * `_type` (our `sanityFetch` tags every query by document type). The affected
 * pages refresh on their next request instead of waiting for a timer.
 *
 * Setup (see CMS.md):
 *   sanity.io/manage > API > Webhooks > Create
 *     URL:        https://<your-domain>/api/revalidate
 *     Dataset:    production
 *     Trigger on: Create, Update, Delete
 *     Projection: {"_type": _type}
 *     Secret:     same value as SANITY_REVALIDATE_SECRET
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse("Bad request: missing _type", { status: 400 });
    }

    revalidateTag(body._type);

    return NextResponse.json({
      revalidated: true,
      tag: body._type,
      now: Date.now(),
    });
  } catch (err) {
    console.error("Revalidation failed:", err);
    return new NextResponse((err as Error).message, { status: 500 });
  }
}
