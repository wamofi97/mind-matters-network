"use client";

import { useState } from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/search-bar";
import { Highlight } from "@/components/ui/highlight";
import {
  resourceFilters,
  type ResourceFilter,
  type ResourceTone,
} from "@/constants/resources";
import { type ResourceContent } from "@/lib/content/resources";
import { getResourceIcon } from "@/lib/content/icons";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const iconColors: Record<ResourceTone, string> = {
  butter: "bg-butter text-amber-700",
  coral: "bg-coral/20 text-coral",
  mint: "bg-sage-soft text-deep-green",
  lilac: "bg-lilac-soft text-lilac",
};

type ResourcesListSectionProps = {
  resources: ResourceContent[];
};

export function ResourcesListSection({ resources }: ResourcesListSectionProps) {
  const [filter, setFilter] = useState<ResourceFilter>("all");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query);

  // NOTE: filtering is done client-side for now. This is the single spot to
  // swap for a server-side search (e.g. fetch results by `filter` +
  // `debouncedQuery`).
  const normalizedQuery = debouncedQuery.trim().toLowerCase();
  const filteredResources = resources.filter((resource) => {
    const matchesFilter =
      filter === "all" ? true : resource.category === filter;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      resource.title.toLowerCase().includes(normalizedQuery) ||
      resource.description.toLowerCase().includes(normalizedQuery) ||
      resource.category.toLowerCase().includes(normalizedQuery);
    return matchesFilter && matchesQuery;
  });

  const hasResults = filteredResources.length > 0;

  return (
    <section className="pb-20 md:pb-28 lg:pb-32">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex flex-wrap items-center gap-1 rounded-full border border-border bg-card p-1 shadow-soft">
            {resourceFilters.map((tab) => {
              const isActive = filter === tab.value;
              return (
                <Button
                  key={tab.value}
                  variant="unstyled"
                  size="none"
                  type="button"
                  onClick={() => setFilter(tab.value)}
                  aria-pressed={isActive}
                  className={cn(
                    "cursor-pointer rounded-full px-5 py-2 font-body text-sm font-semibold transition-all duration-300",
                    isActive
                      ? "bg-deep-green text-cream shadow-soft"
                      : "text-ink/70 hover:text-ink"
                  )}
                >
                  {tab.label}
                </Button>
              );
            })}
          </div>

          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search resources…"
            label="Search resources"
          />
        </div>

        {hasResults ? (
          <motion.div
            key={`${filter}-${normalizedQuery}`}
            className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {filteredResources.map((resource) => {
            const Icon = getResourceIcon(resource.icon);
            return (
              <motion.article
                key={resource.slug}
                variants={fadeUpVariants}
                className="group flex flex-col rounded-card border border-border/60 bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card lg:p-8"
              >
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-full",
                    iconColors[resource.tone]
                  )}
                >
                  <Icon className="size-5" strokeWidth={2} />
                </span>

                <div className="mt-5 flex items-center gap-2 font-body text-xs font-semibold text-ink/50">
                  <span className="rounded-full bg-ink/5 px-2.5 py-0.5 text-ink/70">
                    <Highlight
                      text={resource.category}
                      query={normalizedQuery}
                    />
                  </span>
                  <span aria-hidden>·</span>
                  <span>{resource.year}</span>
                </div>

                <h3 className="mt-3 font-heading text-xl font-semibold text-ink sm:text-2xl">
                  <Highlight text={resource.title} query={normalizedQuery} />
                </h3>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-muted-foreground">
                  <Highlight
                    text={resource.description}
                    query={normalizedQuery}
                  />
                </p>

                {resource.href ? (
                  <Button
                    variant="unstyled"
                    size="none"
                    className="mt-6 w-fit rounded-full border border-border bg-card px-4 py-2 font-body text-sm font-semibold text-ink shadow-soft transition-all duration-300 hover:border-ink/30 hover:bg-ink/5"
                    asChild
                  >
                    <Link href={resource.href}>
                      Download
                      <Download className="size-4" />
                    </Link>
                  </Button>
                ) : (
                  <span
                    className="mt-6 inline-flex w-fit cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-border bg-card px-4 py-2 font-body text-sm font-semibold text-ink/40"
                    aria-disabled
                  >
                    Coming soon
                  </span>
                )}
              </motion.article>
            );
          })}
          </motion.div>
        ) : (
          <div className="mt-12 rounded-card border border-dashed border-border bg-card/50 px-6 py-16 text-center">
            <p className="font-heading text-xl font-semibold text-ink">
              No resources found
            </p>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              Try a different search or filter.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
