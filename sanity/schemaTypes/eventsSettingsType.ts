import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const eventsSettingsType = defineType({
  name: "eventsSettings",
  title: "Events page",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "pageHero",
    }),
  ],
  preview: { prepare: () => ({ title: "Events page" }) },
});
