import { getInstagramPosts } from "@/lib/instagram";
import { getSiteSettings } from "@/lib/content/site";
import { type SectionHeading } from "@/lib/content/page-content";
import { InstagramGallery } from "@/components/sections/home/instagram-gallery";

type InstagramSectionProps = {
  heading: SectionHeading;
};

export async function InstagramSection({ heading }: InstagramSectionProps) {
  const [posts, settings] = await Promise.all([
    getInstagramPosts(),
    getSiteSettings(),
  ]);

  return (
    <InstagramGallery
      posts={posts}
      handle={settings.instagramHandle}
      profileUrl={settings.instagramUrl}
      heading={heading}
    />
  );
}
