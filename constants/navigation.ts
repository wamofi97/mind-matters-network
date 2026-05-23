export type NavLink = {
  label: string;
  href: string;
};

export const mainNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
];

export const footerLinkGroups = [
  {
    title: "Explore",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Events", href: "/events" },
      { label: "Resources", href: "/resources" },
      { label: "Get Involved", href: "/get-involved" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Donate", href: "/donate" },
      { label: "Crisis Help", href: "/crisis-help" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Newsletter", href: "#newsletter" },
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Volunteer", href: "/get-involved" },
      { label: "Partners", href: "/partners" },
    ],
  },
] as const;

export const siteConfig = {
  name: "Mind Matters Network",
  tagline: "A youth-led mental wellness movement",
  description:
    "Safe, welcoming spaces for young people to connect, heal, and grow together.",
  donateHref: "/donate",
} as const;
