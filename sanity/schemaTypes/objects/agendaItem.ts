import { defineField, defineType } from "sanity";

export const agendaItemType = defineType({
  name: "agendaItem",
  title: "Agenda item",
  type: "object",
  fields: [
    defineField({
      name: "time",
      title: "Time",
      type: "string",
      description: 'e.g. "6:00 PM" or "Day 1"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "time" },
  },
});
