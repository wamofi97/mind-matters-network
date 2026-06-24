import type { SchemaTypeDefinition } from "sanity";

import { agendaItemType } from "./objects/agendaItem";
import { facilitatorType } from "./objects/facilitator";
import { testimonialType } from "./objects/testimonial";
import { sectionHeadingType } from "./objects/sectionHeading";
import { pageHeroType } from "./objects/pageHero";
import { eventType } from "./eventType";
import { resourceType } from "./resourceType";
import { teamMemberType } from "./teamMemberType";
import { faqType } from "./faqType";
import { communityTestimonialType } from "./communityTestimonialType";
import { partnerType } from "./partnerType";
import { homeSettingsType } from "./homeSettingsType";
import { aboutSettingsType } from "./aboutSettingsType";
import { getInvolvedSettingsType } from "./getInvolvedSettingsType";
import { contactSettingsType } from "./contactSettingsType";
import { eventsSettingsType } from "./eventsSettingsType";
import { resourcesSettingsType } from "./resourcesSettingsType";
import { siteSettingsType } from "./siteSettingsType";
import { submissionType } from "./submissionType";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Inbox
  submissionType,
  // Collections
  eventType,
  resourceType,
  teamMemberType,
  faqType,
  communityTestimonialType,
  partnerType,
  // Page settings (singletons)
  homeSettingsType,
  aboutSettingsType,
  getInvolvedSettingsType,
  contactSettingsType,
  eventsSettingsType,
  resourcesSettingsType,
  siteSettingsType,
  // Objects
  agendaItemType,
  facilitatorType,
  testimonialType,
  sectionHeadingType,
  pageHeroType,
];
