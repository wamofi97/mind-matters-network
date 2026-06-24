import { DocumentsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const resourcesSettingsType = defineType({
  name: "resourcesSettings",
  title: "Resources page",
  type: "document",
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "pageHero",
    }),
  ],
  preview: { prepare: () => ({ title: "Resources page" }) },
});
