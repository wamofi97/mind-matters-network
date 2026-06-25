import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { TikTokIcon } from "@/components/shared/icons";
import { siteConfig } from "@/constants/navigation";

export const contactDetails = {
  email: "contact@mindmatters.my",
  phone: "+60 3-2780 1234",
  addressLines: ["Level 12, Menara KL", "Jalan Sultan Ismail, 50250 Kuala Lumpur"],
  hours: "Mon–Fri · 10:00 – 18:00",
};

export const contactSocials = [
  { label: "Instagram", href: siteConfig.instagramUrl, icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com", icon: Facebook },
  { label: "TikTok", href: "https://www.tiktok.com", icon: TikTokIcon },
  { label: "YouTube", href: "https://www.youtube.com", icon: Youtube },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
];
