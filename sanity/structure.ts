import type { StructureResolver } from "sanity/structure";

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

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
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
