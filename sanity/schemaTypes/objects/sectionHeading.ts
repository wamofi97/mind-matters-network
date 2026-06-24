import { defineField, defineType } from "sanity";

/**
 * Reusable section heading: a small pill label plus a two-part title where the
 * second part is rendered in an accent colour (e.g. "Meet the team." with
 * "team." in coral).
 */
export const sectionHeadingType = defineType({
  name: "sectionHeading",
  title: "Section heading",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Pill label",
      type: "string",
      description: 'Small label above the heading, e.g. "Our values"',
    }),
    defineField({
      name: "headingLead",
      title: "Heading (start)",
      type: "string",
      description: 'e.g. "Meet the"',
    }),
    defineField({
      name: "headingEmphasis",
      title: "Heading (accent word)",
      type: "string",
      description: 'Shown in an accent colour, e.g. "team."',
    }),
  ],
  preview: {
    select: { lead: "headingLead", emphasis: "headingEmphasis", label: "label" },
    prepare: ({ lead, emphasis, label }) => ({
      title: [lead, emphasis].filter(Boolean).join(" ") || "Section heading",
      subtitle: label,
    }),
  },
});
