import { InfoOutlineIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const storyStatToneOptions = [
  { title: "Coral (pink)", value: "coral" },
  { title: "Lilac (purple)", value: "lilac" },
];

const valueToneOptions = [
  { title: "Coral (pink)", value: "coral" },
  { title: "Mint (green)", value: "mint" },
  { title: "Lilac (purple)", value: "lilac" },
];

// Keys map to Lucide icons in `lib/content/icons.ts` (featureIconMap).
const featureIconOptions = [
  { title: "Heart handshake", value: "heart-handshake" },
  { title: "Message", value: "message" },
  { title: "Sparkles", value: "sparkles" },
  { title: "Users", value: "users" },
  { title: "Book", value: "book" },
  { title: "Building", value: "building" },
];

export const aboutSettingsType = defineType({
  name: "aboutSettings",
  title: "About page",
  type: "document",
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "pageHero",
    }),
    defineField({
      name: "whyHeading",
      title: 'Heading — "Why we exist"',
      type: "sectionHeading",
    }),
    defineField({
      name: "whyParagraphs",
      title: '"Why we exist" — body paragraphs',
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    defineField({
      name: "teamHeading",
      title: "Heading — Team",
      type: "sectionHeading",
    }),
    defineField({
      name: "valuesHeading",
      title: "Heading — Values",
      type: "sectionHeading",
    }),
    defineField({
      name: "faqHeading",
      title: "Heading — FAQ",
      type: "sectionHeading",
    }),
    defineField({
      name: "missionText",
      title: "Mission",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "visionText",
      title: "Vision",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "storyStats",
      title: 'Story stats ("Why we exist")',
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "storyStat",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({
              name: "tone",
              title: "Colour tone",
              type: "string",
              options: { list: storyStatToneOptions },
            }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "value",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: featureIconOptions },
            }),
            defineField({
              name: "tone",
              title: "Colour tone",
              type: "string",
              options: { list: valueToneOptions },
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});
