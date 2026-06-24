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

// Instagram's private web profile endpoint. Undocumented and unofficial: it
// works from a browser/residential IP but is frequently blocked when called
// from server/datacenter IPs (Vercel etc.), so we always keep a static
// fallback. The app id is the public Instagram web client id.
const IG_APP_ID = "936619743392459";
const IG_ENDPOINT = "https://www.instagram.com/api/v1/users/web_profile_info/";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

// Minimal shape of the fields we read from the response.
type IgCaptionEdge = { node?: { text?: string } };
type IgMediaNode = {
  id?: string;
  shortcode?: string;
  display_url?: string;
  thumbnail_src?: string;
  accessibility_caption?: string;
  edge_media_to_caption?: { edges?: IgCaptionEdge[] };
};
type IgWebProfileResponse = {
  data?: {
    user?: {
      edge_owner_to_timeline_media?: { edges?: { node?: IgMediaNode }[] };
    };
  };
};

function buildAlt(node: IgMediaNode): string {
  const caption = node.edge_media_to_caption?.edges?.[0]?.node?.text;
  const raw = node.accessibility_caption || caption || "";
  const trimmed = raw.replace(/\s+/g, " ").trim();
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

/**
 * Fetches the latest Instagram posts for the configured username via
 * Instagram's web profile endpoint, falling back to curated static images when
 * the request is blocked or fails (so the section never renders empty).
 */
export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const username = siteConfig.instagramUsername;
  const url = `${IG_ENDPOINT}?username=${encodeURIComponent(username)}`;

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
      // Revalidate hourly so new posts show up without a rebuild.
      next: { revalidate: 3600 },
    });
    if (!res.ok) return getFallbackPosts();

    const data = (await res.json()) as IgWebProfileResponse;
    const edges = data.data?.user?.edge_owner_to_timeline_media?.edges;
    if (!edges?.length) return getFallbackPosts();

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
          alt: buildAlt(node),
        };
      })
      .filter((post): post is InstagramPost => post !== null)
      .slice(0, MAX_POSTS);

    return posts.length ? posts : getFallbackPosts();
  } catch {
    return getFallbackPosts();
  }
}
