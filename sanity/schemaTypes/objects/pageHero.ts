import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Reusable page hero: pill label + a title split into a lead, an accent word,
 * and an optional suffix, plus a short description and/or longer paragraphs.
 * Each page renders these fields with its own layout (line breaks, italics).
 */
export const pageHeroType = defineType({
  name: "pageHero",
  title: "Page hero",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Pill label",
      type: "string",
      description: 'Small label above the title, e.g. "Our story"',
    }),
    defineField({
      name: "titleLead",
      title: "Title (start)",
      type: "string",
    }),
    defineField({
      name: "titleEmphasis",
      title: "Title (accent word)",
      type: "string",
      description: "Shown in coral italic",
    }),
    defineField({
      name: "titleSuffix",
      title: "Title (end)",
      type: "string",
      description: "Optional text after the accent word",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Short intro paragraph under the title",
    }),
    defineField({
      name: "paragraphs",
      title: "Body paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 4 })],
      description: "Longer body copy (used by the About page hero)",
    }),
  ],
  preview: {
    select: { lead: "titleLead", emphasis: "titleEmphasis", label: "label" },
    prepare: ({ lead, emphasis, label }) => ({
      title: [lead, emphasis].filter(Boolean).join(" ") || "Page hero",
      subtitle: label,
    }),
  },
});
