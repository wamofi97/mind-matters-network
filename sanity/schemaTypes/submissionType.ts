import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const kindOptions = [
  { title: "Contact", value: "contact" },
  { title: "Get Involved", value: "involvement" },
  { title: "Event Registration", value: "eventRegistration" },
];

const statusOptions = [
  { title: "New", value: "new" },
  { title: "Read", value: "read" },
  { title: "Handled", value: "handled" },
];

/**
 * Form submissions captured from the public site (contact, get involved, and
 * event registration forms). These are written by `app/api/submissions` and are
 * read-only inbox items — never edited as content. Triage via the `status` field.
 */
export const submissionType = defineType({
  name: "submission",
  title: "Submission",
  type: "document",
  icon: EnvelopeIcon,
  // Submissions are machine-created; lock the shape down in the Studio UI.
  readOnly: true,
  fields: [
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: { list: kindOptions, layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: statusOptions, layout: "radio" },
      initialValue: "new",
      // The one field editors should be able to change for triage.
      readOnly: false,
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
      hidden: ({ document }) => document?.kind !== "contact",
    }),
    defineField({
      name: "interest",
      title: "Interest",
      type: "string",
      description: "The path selected on the Get Involved form.",
      hidden: ({ document }) => document?.kind !== "involvement",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "event",
      title: "Event",
      type: "reference",
      to: [{ type: "event" }],
      weak: true,
      hidden: ({ document }) => document?.kind !== "eventRegistration",
    }),
    defineField({
      name: "eventTitle",
      title: "Event title",
      type: "string",
      hidden: ({ document }) => document?.kind !== "eventRegistration",
    }),
    defineField({
      name: "eventSlug",
      title: "Event slug",
      type: "string",
      hidden: ({ document }) => document?.kind !== "eventRegistration",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "Page path the submission came from.",
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      name: "name",
      kind: "kind",
      status: "status",
      eventTitle: "eventTitle",
      subject: "subject",
    },
    prepare({ name, kind, status, eventTitle, subject }) {
      const kindLabel =
        kindOptions.find((option) => option.value === kind)?.title ?? kind;
      const statusLabel =
        statusOptions.find((option) => option.value === status)?.title ??
        status ??
        "New";
      const detail = eventTitle || subject;
      return {
        title: name || "(no name)",
        subtitle: [kindLabel, statusLabel, detail]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
