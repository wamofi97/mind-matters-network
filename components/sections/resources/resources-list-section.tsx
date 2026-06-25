"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
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

const PER_PAGE = 6;

type ResourcesListSectionProps = {
  resources: ResourceContent[];
};

export function ResourcesListSection({ resources }: ResourcesListSectionProps) {
  const [filter, setFilter] = useState<ResourceFilter>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
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

  const totalPages = Math.ceil(filteredResources.length / PER_PAGE);
  const hasPagination = totalPages > 1;
  const currentPage = Math.min(page, Math.max(totalPages, 1));
  const visibleResources = filteredResources.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const handleFilter = (value: ResourceFilter) => {
    setFilter(value);
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const hasResults = filteredResources.length > 0;

  return (
    <section className="pb-20 md:pb-28 lg:pb-32">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="scrollbar-none -mx-5 overflow-x-auto px-5 sm:mx-0 sm:overflow-visible sm:px-0">
            <div className="inline-flex w-max items-center gap-1 rounded-full border border-border bg-card p-1 shadow-soft">
              {resourceFilters.map((tab) => {
                const isActive = filter === tab.value;
                return (
                  <Button
                    key={tab.value}
                    variant="unstyled"
                    size="none"
                    type="button"
                    onClick={() => handleFilter(tab.value)}
                    aria-pressed={isActive}
                    className={cn(
                      "cursor-pointer whitespace-nowrap rounded-full px-4 py-2 font-body text-sm font-semibold transition-all duration-300 sm:px-5",
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
          </div>

          <SearchBar
            value={query}
            onChange={handleSearch}
            placeholder="Search resources…"
            label="Search resources"
          />
        </div>

        {hasResults ? (
          <>
          <motion.div
            key={`${filter}-${normalizedQuery}-${currentPage}`}
            className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {visibleResources.map((resource) => {
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
                    Download
                    <Download className="size-4" />
                  </span>
                )}
              </motion.article>
            );
          })}
          </motion.div>

          <nav
            aria-label="Resources pagination"
            className="mt-12 flex items-center justify-center gap-2 lg:mt-16"
          >
            <Button
              variant="unstyled"
              size="none"
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!hasPagination || currentPage === 1}
              aria-label="Previous page"
              className="size-10 rounded-full border border-border bg-card text-ink shadow-soft transition-all duration-300 hover:bg-ink/5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-card"
            >
              <ArrowLeft className="size-4" />
            </Button>

            {Array.from(
              { length: Math.max(totalPages, 1) },
              (_, i) => i + 1
            ).map((pageNumber) => {
              const isActive = pageNumber === currentPage;
              return (
                <Button
                  key={pageNumber}
                  variant="unstyled"
                  size="none"
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  disabled={!hasPagination}
                  aria-label={`Go to page ${pageNumber}`}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "size-10 rounded-full font-body text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed",
                    isActive
                      ? "bg-deep-green text-cream shadow-soft"
                      : "border border-border bg-card text-ink/70 shadow-soft hover:bg-ink/5",
                    !hasPagination && !isActive && "opacity-40"
                  )}
                >
                  {pageNumber}
                </Button>
              );
            })}

            <Button
              variant="unstyled"
              size="none"
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={!hasPagination || currentPage === totalPages}
              aria-label="Next page"
              className="size-10 rounded-full border border-border bg-card text-ink shadow-soft transition-all duration-300 hover:bg-ink/5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-card"
            >
              <ArrowRight className="size-4" />
            </Button>
          </nav>
          </>
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
