import type { SanityImageSource } from "@sanity/image-url";

import { type TeamTone } from "@/constants/about";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";

export type TeamMemberContent = {
  name: string;
  role: string;
  image: string;
  tone: TeamTone;
};

const teamQuery = `*[_type == "teamMember"] | order(order asc, name asc) {
  name, role, tone, image
}`;

type SanityTeamMember = Omit<TeamMemberContent, "image"> & {
  image?: SanityImageSource | null;
};

export async function getTeam(): Promise<TeamMemberContent[]> {
  const docs = await sanityFetch<SanityTeamMember[] | null>({
    query: teamQuery,
    tags: ["teamMember"],
  });

  if (!docs) return [];

  return docs.map((doc) => ({
    name: doc.name,
    role: doc.role,
    tone: doc.tone,
    image: urlForImage(doc.image),
  }));
}
