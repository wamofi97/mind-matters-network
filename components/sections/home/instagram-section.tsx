import { siteConfig } from "@/constants/navigation";
import { getInstagramPosts } from "@/lib/instagram";
import { InstagramGallery } from "@/components/sections/home/instagram-gallery";

export async function InstagramSection() {
  const posts = await getInstagramPosts();

  return (
    <InstagramGallery
      posts={posts}
      handle={siteConfig.instagram}
      profileUrl={siteConfig.instagramUrl}
    />
  );
}
