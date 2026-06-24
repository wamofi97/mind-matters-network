import { instagramPosts as fallbackPosts } from "@/constants/homepage";
import { siteConfig } from "@/constants/navigation";

export type InstagramPost = {
  id: string;
  image: string;
  permalink: string;
  alt: string;
};

const MAX_POSTS = 6;
const FALLBACK_ALT = "Mind Matters Network on Instagram";

// --- Instagram private web endpoint (works locally, blocked on Vercel) -------
const IG_APP_ID = "936619743392459";
const IG_ENDPOINT = "https://www.instagram.com/api/v1/users/web_profile_info/";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

function clampAlt(raw: string | undefined | null): string {
  const trimmed = (raw || "").replace(/\s+/g, " ").trim();
  if (!trimmed) return FALLBACK_ALT;
  return trimmed.length > 140 ? `${trimmed.slice(0, 137)}…` : trimmed;
}

function getFallbackPosts(): InstagramPost[] {
  return fallbackPosts.slice(0, MAX_POSTS).map((post, i) => ({
    id: `fallback-${i}`,
    image: post.image,
    permalink: siteConfig.instagramUrl,
    alt: post.alt,
  }));
}

// --- Behold JSON feed (reliable on Vercel) -----------------------------------
// Only the fields we use; see https://github.com/BeholdSocial/behold-types.
type BeholdSize = { mediaUrl?: string | null };
type BeholdPost = {
  id?: string;
  permalink?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  altText?: string;
  prunedCaption?: string;
  caption?: string;
  sizes?: {
    small?: BeholdSize;
    medium?: BeholdSize;
    large?: BeholdSize;
    full?: BeholdSize;
  };
};
type BeholdFeed = { posts?: BeholdPost[] };

async function fetchFromBehold(feedUrl: string): Promise<InstagramPost[] | null> {
  try {
    const res = await fetch(feedUrl, { next: { revalidate: 3600 } });
    if (!res.ok) return null;

    const data = (await res.json()) as BeholdFeed | BeholdPost[];
    const rawPosts = Array.isArray(data) ? data : data.posts;
    if (!rawPosts?.length) return null;

    const posts = rawPosts
      .map((post, i): InstagramPost | null => {
        const image =
          post.sizes?.medium?.mediaUrl ||
          post.sizes?.large?.mediaUrl ||
          post.sizes?.small?.mediaUrl ||
          post.sizes?.full?.mediaUrl ||
          post.thumbnailUrl ||
          post.mediaUrl;
        if (!image) return null;
        return {
          id: post.id ?? `ig-${i}`,
          image,
          permalink: post.permalink || siteConfig.instagramUrl,
          alt: clampAlt(post.altText || post.prunedCaption || post.caption),
        };
      })
      .filter((post): post is InstagramPost => post !== null)
      .slice(0, MAX_POSTS);

    return posts.length ? posts : null;
  } catch {
    return null;
  }
}

type IgNode = {
  id?: string;
  shortcode?: string;
  display_url?: string;
  thumbnail_src?: string;
  accessibility_caption?: string;
  edge_media_to_caption?: { edges?: { node?: { text?: string } }[] };
};
type IgResponse = {
  data?: {
    user?: { edge_owner_to_timeline_media?: { edges?: { node?: IgNode }[] } };
  };
};

async function fetchFromInstagram(): Promise<InstagramPost[] | null> {
  const url = `${IG_ENDPOINT}?username=${encodeURIComponent(
    siteConfig.instagramUsername
  )}`;
  try {
    const res = await fetch(url, {
      headers: {
        "x-ig-app-id": IG_APP_ID,
        "User-Agent": USER_AGENT,
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "X-Requested-With": "XMLHttpRequest",
        Referer: siteConfig.instagramUrl,
        // Instagram rejects the request ("SecFetch Policy violation") unless
        // these look like a same-origin browser XHR.
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as IgResponse;
    const edges = data.data?.user?.edge_owner_to_timeline_media?.edges;
    if (!edges?.length) return null;

    const posts = edges
      .map(({ node }, i): InstagramPost | null => {
        if (!node) return null;
        const image = node.display_url || node.thumbnail_src;
        if (!image) return null;
        return {
          id: node.id ?? `ig-${i}`,
          image,
          permalink: node.shortcode
            ? `https://www.instagram.com/p/${node.shortcode}/`
            : siteConfig.instagramUrl,
          alt: clampAlt(
            node.accessibility_caption ||
              node.edge_media_to_caption?.edges?.[0]?.node?.text
          ),
        };
      })
      .filter((post): post is InstagramPost => post !== null)
      .slice(0, MAX_POSTS);

    return posts.length ? posts : null;
  } catch {
    return null;
  }
}

/**
 * Returns the latest Instagram posts.
 *
 * Preference order:
 *  1. Behold JSON feed (BEHOLD_FEED_URL) — reliable in production / on Vercel.
 *  2. Instagram's private web endpoint — works from residential IPs (local dev)
 *     but is blocked on datacenter IPs, so it's only a convenience fallback.
 *  3. Curated static images — so the section never renders empty.
 */
export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const feedUrl = process.env.BEHOLD_FEED_URL;

  const posts = feedUrl
    ? await fetchFromBehold(feedUrl)
    : await fetchFromInstagram();

  return posts ?? getFallbackPosts();
}
