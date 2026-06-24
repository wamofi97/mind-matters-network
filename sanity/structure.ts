import type { StructureBuilder, StructureResolver } from "sanity/structure";

import { apiVersion } from "./env";

// Singletons: edited as a single document rather than a list.
const singletons = [
  { type: "homeSettings", title: "Home page" },
  { type: "aboutSettings", title: "About page" },
  { type: "eventsSettings", title: "Events page" },
  { type: "resourcesSettings", title: "Resources page" },
  { type: "getInvolvedSettings", title: "Get Involved page" },
  { type: "contactSettings", title: "Contact details" },
  { type: "siteSettings", title: "Site settings" },
];

const newestFirst = [{ field: "submittedAt", direction: "desc" as const }];

function idSafe(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** A plain newest-first document list for one submission kind. */
function submissionList(S: StructureBuilder, kind: string, title: string) {
  return S.documentList()
    .title(title)
    .schemaType("submission")
    .filter('_type == "submission" && kind == $kind')
    .params({ kind })
    .defaultOrdering(newestFirst);
}

/**
 * A submission list that can also be sliced by a sub-field (e.g. `interest`).
 * The distinct values are queried live so the sub-lists always match real data.
 */
function groupedSubmissionList(
  S: StructureBuilder,
  context: Parameters<StructureResolver>[1],
  kind: string,
  title: string,
  field: string,
  fieldLabel: string
) {
  return S.list()
    .title(title)
    .items([
      S.listItem()
        .title("All")
        .id(`${kind}-all`)
        .child(submissionList(S, kind, `All ${title.toLowerCase()}`)),
      S.divider(),
      S.listItem()
        .title(`By ${fieldLabel.toLowerCase()}`)
        .id(`${kind}-by-${idSafe(field)}`)
        .child(async () => {
          const client = context.getClient({ apiVersion });
          const values = await client.fetch<string[]>(
            `array::unique(*[_type == "submission" && kind == $kind && defined(${field})].${field})`,
            { kind }
          );
          return S.list()
            .title(`By ${fieldLabel.toLowerCase()}`)
            .items(
              values.length === 0
                ? [
                    S.listItem()
                      .title("(none yet)")
                      .id(`${kind}-${idSafe(field)}-empty`)
                      .child(submissionList(S, kind, title)),
                  ]
                : [...values].sort().map((value) =>
                    S.listItem()
                      .title(value)
                      .id(`${kind}-${idSafe(field)}-${idSafe(value)}`)
                      .child(
                        S.documentList()
                          .title(value)
                          .schemaType("submission")
                          .filter(
                            `_type == "submission" && kind == $kind && ${field} == $value`
                          )
                          .params({ kind, value })
                          .defaultOrdering(newestFirst)
                      )
                  )
            );
        }),
    ]);
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Submissions")
        .id("submissions")
        .child(
          S.list()
            .title("Submissions")
            .items([
              S.listItem()
                .title("All")
                .id("submissionsAll")
                .child(
                  S.documentTypeList("submission")
                    .title("All submissions")
                    .defaultOrdering(newestFirst)
                ),
              S.divider(),
              S.listItem()
                .title("Contact")
                .id("submissions-contact")
                .child(submissionList(S, "contact", "Contact")),
              S.listItem()
                .title("Get Involved")
                .id("submissions-involvement")
                .child(
                  groupedSubmissionList(
                    S,
                    context,
                    "involvement",
                    "Get Involved",
                    "interest",
                    "Interest"
                  )
                ),
              S.listItem()
                .title("Event Registrations")
                .id("submissions-eventRegistration")
                .child(
                  groupedSubmissionList(
                    S,
                    context,
                    "eventRegistration",
                    "Event Registrations",
                    "eventTitle",
                    "Event"
                  )
                ),
            ])
        ),
      S.divider(),
      S.documentTypeListItem("event").title("Events"),
      S.documentTypeListItem("resource").title("Resources"),
      S.documentTypeListItem("teamMember").title("Team"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.documentTypeListItem("communityTestimonial").title("Testimonials"),
      S.documentTypeListItem("partner").title("Partners"),
      S.divider(),
      S.listItem().title("Pages").child(
        S.list()
          .title("Pages")
          .items(
            singletons.map((s) =>
              S.listItem()
                .title(s.title)
                .id(s.type)
                .child(
                  S.document().schemaType(s.type).documentId(s.type)
                )
            )
          )
      ),
    ]);
