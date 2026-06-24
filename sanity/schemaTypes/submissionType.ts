import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { StatusInput } from "../components/status-input";

const kindOptions = [
  { title: "Contact", value: "contact" },
  { title: "Get Involved", value: "involvement" },
  { title: "Event Registration", value: "eventRegistration" },
  { title: "Newsletter", value: "newsletter" },
];

const statusOptions = [
  { title: "New", value: "new" },
  { title: "Read", value: "read" },
  { title: "Handled", value: "handled" },
];

/**
 * Form submissions captured from the public site (contact, get involved, event
 * registration, and newsletter forms). These are written by
 * `app/api/submissions` and are read-only inbox items — never edited as content.
 * Triage via the `status` field.
 */
export const submissionType = defineType({
  name: "submission",
  title: "Submission",
  type: "document",
  icon: EnvelopeIcon,
  // NOTE: don't set document-level `readOnly` here — it locks the whole
  // document and a field-level `readOnly: false` can't override it. Instead,
  // each captured field is individually read-only and only `status` is editable
  // so editors can triage submissions without altering the submitted data.
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: statusOptions, layout: "radio" },
      initialValue: "new",
      // The one field editors can change, for triage. The custom input also
      // auto-marks a submission "Read" when it's first opened.
      components: { input: StatusInput },
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: { list: kindOptions, layout: "radio" },
      readOnly: true,
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
      readOnly: true,
      hidden: ({ document }) => document?.kind !== "contact",
    }),
    defineField({
      name: "interest",
      title: "Interest",
      type: "string",
      description: "The path selected on the Get Involved form.",
      readOnly: true,
      hidden: ({ document }) => document?.kind !== "involvement",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 5,
      readOnly: true,
    }),
    defineField({
      name: "event",
      title: "Event",
      type: "reference",
      to: [{ type: "event" }],
      weak: true,
      readOnly: true,
      hidden: ({ document }) => document?.kind !== "eventRegistration",
    }),
    defineField({
      name: "eventTitle",
      title: "Event title",
      type: "string",
      readOnly: true,
      hidden: ({ document }) => document?.kind !== "eventRegistration",
    }),
    defineField({
      name: "eventSlug",
      title: "Event slug",
      type: "string",
      readOnly: true,
      hidden: ({ document }) => document?.kind !== "eventRegistration",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "Page path the submission came from.",
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      readOnly: true,
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
      email: "email",
      kind: "kind",
      status: "status",
      eventTitle: "eventTitle",
      subject: "subject",
    },
    prepare({ name, email, kind, status, eventTitle, subject }) {
      const kindLabel =
        kindOptions.find((option) => option.value === kind)?.title ?? kind;
      const statusLabel =
        statusOptions.find((option) => option.value === status)?.title ??
        status ??
        "New";
      const detail = eventTitle || subject;
      return {
        title: name || email || "(no name)",
        subtitle: [kindLabel, statusLabel, detail]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
