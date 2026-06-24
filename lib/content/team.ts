import type { SanityImageSource } from "@sanity/image-url";

import { team as fallbackTeam, type TeamTone } from "@/constants/about";
import { isSanityConfigured } from "@/sanity/env";
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
  if (!isSanityConfigured) return [...fallbackTeam];

  const docs = await sanityFetch<SanityTeamMember[]>({
    query: teamQuery,
    tags: ["teamMember"],
  });

  if (!docs || docs.length === 0) return [...fallbackTeam];

  return docs.map((doc) => ({
    name: doc.name,
    role: doc.role,
    tone: doc.tone,
    image: urlForImage(doc.image),
  }));
}
