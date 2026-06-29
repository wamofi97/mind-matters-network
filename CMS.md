# Content Management (Sanity CMS)

This site uses [Sanity](https://www.sanity.io/) as a headless CMS. The editing
interface (Sanity Studio) is **embedded in this app** and served at `/studio`,
so there is nothing extra to deploy or host.

Content that is CMS-managed today:

| Content              | Studio section            | Pages it powers                       |
| -------------------- | ------------------------- | ------------------------------------- |
| Events               | Events                    | `/events`, `/events/[slug]`           |
| Resources            | Resources                 | `/resources`                          |
| Team                 | Team                      | `/about` (Meet the team)              |
| FAQs                 | FAQs                      | `/about` (Things people ask)          |
| Testimonials         | Testimonials              | `/` (Words from our community)        |
| Partners             | Partners                  | `/` (Participating institutions)      |
| Home page            | Pages → Home page         | `/` (hero, stats, all section headings) |
| About page           | Pages → About page        | `/about` (hero, mission/vision, story, values, all headings) |
| Events page          | Pages → Events page       | `/events` (hero)                      |
| Resources page       | Pages → Resources page    | `/resources` (hero)                   |
| Get Involved page    | Pages → Get Involved page | `/get-involved` (hero, paths, voices) |
| Contact details      | Pages → Contact details   | `/contact` (hero, email, address, socials) |
| Site settings        | Pages → Site settings     | Navbar + footer (links, socials, nav, join/donate, Instagram handle, newsletter copy) |

The "Pages" entries are **singletons** — single documents you edit in place
rather than lists. Each page's hero and section headings (the pill label + the
big title, where the accent word shows in coral) are editable there.

The homepage **"Upcoming events"** and **"Free resources"** teasers are not
edited separately — they automatically show the first few items from the Events
and Resources collections, so editing those collections keeps the homepage in
sync. The Instagram strip pulls live posts from the Instagram feed (via Behold);
only its handle/URL is editable, under **Site settings**.

> Sanity is the **single source of truth** for the content above. The loaders in
> `lib/content/` read straight from Sanity — there is no bundled seed content to
> fall back to, so a missing field renders empty and a missing singleton document
> throws a clear error. Keep the singleton documents published and populated.

---

## One-time setup (developer)

### 1. Create a Sanity project (free)

Either via the dashboard or the CLI:

- **Dashboard:** go to <https://www.sanity.io/manage>, create a project, and add
  a dataset named `production`. Copy the **Project ID**.
- **CLI:** `npx sanity login` then `npx sanity projects create`.

### 2. Add environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

```ini
NEXT_PUBLIC_SANITY_PROJECT_ID="<your project id>"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-10-01"
SANITY_API_WRITE_TOKEN="<write token>"   # optional: only for write-access scripts
```

The write token (created at **sanity.io/manage → API → Tokens** with **Editor**
permission) is only needed if you add a script that writes to Sanity. The running
site only reads, so it is otherwise optional. Never expose it in the browser (note
it has no `NEXT_PUBLIC_` prefix).

### 3. Allow the Studio origin (CORS)

In **sanity.io/manage → API → CORS origins**, add the URLs where the Studio runs
(with credentials allowed):

- `http://localhost:3000`
- your production domain, e.g. `https://mindmatters.example.com`

### 4. Add content in the Studio

The dataset for this project is already seeded. For a brand-new/empty dataset,
open `http://localhost:3000/studio` and create the documents directly: the seven
**Pages** singletons (Home, About, Events, Resources, Get Involved, Contact, Site
settings) plus entries in each collection (Events, Resources, Team, FAQs,
Testimonials, Partners). Because there is no fallback content, the singletons must
exist and be published for their pages to render.

---

## Daily use (client / editor)

1. Go to `https://<your-domain>/studio` (or `http://localhost:3000/studio` in
   development) and log in with the Google/GitHub/email account that was invited
   to the project.
2. Pick a section in the left sidebar (Events, Resources, Team, FAQs, Testimonials, Partners).
3. Create or edit a document. Each event has two tabs:
   - **Card** — what shows on the events grid (title, image, date badge, status).
   - **Detail page** — the full event page (agenda, facilitators, gallery, etc.).
4. Click **Publish**. With the revalidation webhook set up (below), changes appear
   on the website within a few seconds. Without it, they still appear within an
   hour (a safety-net timer).

Inviting the client: **sanity.io/manage → Members → Invite**.

---

## Instant updates (revalidation webhook)

The site caches CMS content for speed. A webhook tells it to refresh the moment
something is published, so edits go live in seconds instead of waiting for the
hourly safety-net timer.

One-time setup (developer):

1. Pick a long random string as a shared secret and set it as
   `SANITY_REVALIDATE_SECRET` in `.env.local` (and in your hosting env vars).
2. In **sanity.io/manage → API → Webhooks → Create webhook**:
   - **URL:** `https://<your-domain>/api/revalidate`
   - **Dataset:** `production`
   - **Trigger on:** Create, Update, Delete
   - **Filter:** (leave blank)
   - **Projection:** `{"_type": _type}`
   - **HTTP method:** `POST`
   - **API version:** `v2024-10-01` (or later)
   - **Secret:** the same value as `SANITY_REVALIDATE_SECRET`
3. Save. Publish any document and it should appear on the live site within a few
   seconds.

The endpoint lives at `app/api/revalidate/route.ts`. It verifies the webhook
signature, then calls `revalidateTag(_type)` — every query is tagged by its
document type (see `sanity/lib/fetch.ts`), so the right pages refresh.

> Note: revalidation only affects the deployed site, not `localhost` (Sanity
> can't reach your machine). To test the flow locally, expose your dev server
> with a tunnel (e.g. `ngrok`) and point the webhook at the tunnel URL.

---

## How it fits together (developer reference)

```
sanity.config.ts            Studio config (schemas + plugins), basePath /studio
app/studio/[[...tool]]/      Embedded Studio route (client-only Studio wrapper)
app/api/revalidate/         Webhook endpoint that refreshes cache on publish
sanity/
  env.ts                    Reads env (project id, dataset, api version)
  lib/client.ts             Read client (CDN, published perspective)
  lib/fetch.ts              sanityFetch() helper for Server Components
  lib/image.ts              urlForImage() — builds CDN image URLs
  structure.ts              Studio sidebar layout
  schemaTypes/              Document + object schemas
lib/content/                App-facing data layer (Sanity → typed data)
  events.ts  resources.ts  team.ts  faqs.ts  testimonials.ts  partners.ts  icons.ts
  home.ts  about-settings.ts  get-involved.ts  contact.ts  site.ts
  events-settings.ts  resources-settings.ts
  page-content.ts           Shared hero/heading shapes + normalize helpers
```

Data is fetched in **Server Components** (the page files) and passed to the
existing client components as props. Results are cached and tagged so they can
be revalidated on demand (see `revalidate`/`tags` in `sanity/lib/fetch.ts`).

### Adding a new editable field

1. Add the field to the relevant schema in `sanity/schemaTypes/`.
2. Add it to the GROQ projection + type in the matching `lib/content/*.ts`.
3. Use it in the component.

### Content not yet in the CMS

Almost all on-page copy now lives in Sanity — every page hero and section heading
is editable under its **Pages** singleton.

What remains hardcoded is a small set of design-furniture items:

- **Button microcopy** (e.g. "Register", "Download") and SVG decorations.
- Live **Instagram posts**, which come from the Instagram feed integration
  (`lib/instagram.ts`), not Sanity. Only the @handle/URL is editable.

Any of these can be moved into Sanity later following the same pattern
(schema → `lib/content` query → wire the section component).
