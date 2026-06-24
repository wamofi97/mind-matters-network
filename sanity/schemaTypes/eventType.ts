import { CalendarIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const toneOptions = [
  { title: "Butter (yellow)", value: "butter" },
  { title: "Coral (pink)", value: "coral" },
  { title: "Mint (green)", value: "mint" },
  { title: "Lilac (purple)", value: "lilac" },
];

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: CalendarIcon,
  groups: [
    { name: "card", title: "Card", default: true },
    { name: "detail", title: "Detail page" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "card",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "card",
      description: "Used in the URL: /events/<slug>",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "card",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Past", value: "past" },
        ],
        layout: "radio",
      },
      initialValue: "upcoming",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "card",
      description: 'e.g. "Workshop", "Outdoor", "Community"',
    }),
    defineField({
      name: "tone",
      title: "Colour tone",
      type: "string",
      group: "card",
      options: { list: toneOptions },
      initialValue: "butter",
    }),
    defineField({
      name: "day",
      title: "Day (badge)",
      type: "string",
      group: "card",
      description: 'Day number shown on the card badge, e.g. "12"',
    }),
    defineField({
      name: "month",
      title: "Month (badge)",
      type: "string",
      group: "card",
      description: 'Short month shown on the card badge, e.g. "MAY"',
    }),
    defineField({
      name: "image",
      title: "Card image",
      type: "image",
      group: "card",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      group: "card",
      rows: 3,
    }),

    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      group: "detail",
      rows: 4,
    }),
    defineField({
      name: "dateLabel",
      title: "Date label",
      type: "string",
      group: "detail",
      description: 'Full human date, e.g. "Tuesday, May 12, 2026 · 6:00 PM"',
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      group: "detail",
      description: 'e.g. "90 minutes"',
    }),
    defineField({
      name: "host",
      title: "Host",
      type: "string",
      group: "detail",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "detail",
    }),
    defineField({
      name: "whoFor",
      title: "Who it's for",
      type: "array",
      group: "detail",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "whatYouGet",
      title: "What you get",
      type: "array",
      group: "detail",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "agenda",
      title: "Agenda",
      type: "array",
      group: "detail",
      of: [defineArrayMember({ type: "agendaItem" })],
    }),
    defineField({
      name: "facilitators",
      title: "Facilitators",
      type: "array",
      group: "detail",
      of: [defineArrayMember({ type: "facilitator" })],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "detail",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      group: "detail",
      of: [defineArrayMember({ type: "testimonial" })],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "status",
      media: "image",
    },
  },
});
