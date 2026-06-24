import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

// Keys map to icons in `lib/content/icons.ts` (socialIconMap).
const socialIconOptions = [
  { title: "Instagram", value: "instagram" },
  { title: "TikTok", value: "tiktok" },
  { title: "YouTube", value: "youtube" },
  { title: "LinkedIn", value: "linkedin" },
  { title: "Facebook", value: "facebook" },
  { title: "Twitter / X", value: "twitter" },
];

const linkFields = [
  defineField({ name: "label", title: "Label", type: "string" }),
  defineField({ name: "href", title: "Link", type: "string" }),
];

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "nav", title: "Navigation" },
    { name: "footer", title: "Footer" },
    { name: "newsletter", title: "Newsletter" },
    { name: "social", title: "Social" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Organisation name",
      type: "string",
      group: "identity",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "identity",
      description: 'Shown in the footer, e.g. "A youth-led mental health movement 🌱"',
    }),
    defineField({
      name: "joinHref",
      title: '"Join / Get involved" link',
      type: "string",
      group: "identity",
    }),
    defineField({
      name: "donateHref",
      title: '"Donate" link',
      type: "string",
      group: "identity",
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram handle",
      type: "string",
      group: "identity",
      description: 'e.g. "@mindmattersmy"',
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      group: "identity",
    }),
    defineField({
      name: "mainNavLinks",
      title: "Main navigation",
      type: "array",
      group: "nav",
      of: [
        defineArrayMember({
          type: "object",
          name: "navLink",
          fields: linkFields,
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "footerExploreLinks",
      title: "Footer — Explore",
      type: "array",
      group: "footer",
      of: [
        defineArrayMember({
          type: "object",
          name: "link",
          fields: linkFields,
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "footerSupportLinks",
      title: "Footer — Support",
      type: "array",
      group: "footer",
      of: [
        defineArrayMember({
          type: "object",
          name: "link",
          fields: linkFields,
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "newsletterHeadingLead",
      title: "Newsletter — heading (start)",
      type: "string",
      group: "newsletter",
      description: 'e.g. "Get a little goodness"',
    }),
    defineField({
      name: "newsletterHeadingEmphasis",
      title: "Newsletter — heading (accent word)",
      type: "string",
      group: "newsletter",
      description: 'Shown in italic, e.g. "in your box."',
    }),
    defineField({
      name: "newsletterText",
      title: "Newsletter — body",
      type: "text",
      rows: 2,
      group: "newsletter",
    }),
    defineField({
      name: "newsletterPlaceholder",
      title: "Newsletter — email placeholder",
      type: "string",
      group: "newsletter",
    }),
    defineField({
      name: "newsletterButtonLabel",
      title: "Newsletter — button label",
      type: "string",
      group: "newsletter",
    }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      group: "social",
      of: [
        defineArrayMember({
          type: "object",
          name: "social",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: socialIconOptions },
            }),
            defineField({ name: "href", title: "URL", type: "url" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
