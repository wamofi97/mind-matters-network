"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { PillTag } from "@/components/ui/pill-tag";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/search-bar";
import { Highlight } from "@/components/ui/highlight";
import {
  events,
  eventFilters,
  type EventFilter,
  type EventTone,
} from "@/constants/events";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const monthColor: Record<EventTone, string> = {
  butter: "text-amber-600",
  coral: "text-coral",
  mint: "text-deep-green",
  lilac: "text-lilac",
};

const PER_PAGE = 6;

export function EventsListSection() {
  const [filter, setFilter] = useState<EventFilter>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebouncedValue(query);

  // NOTE: filtering is done client-side for now. This is the single spot to
  // swap for a server-side search (e.g. fetch results by `filter` +
  // `debouncedQuery`).
  const normalizedQuery = debouncedQuery.trim().toLowerCase();
  const filteredEvents = events.filter((event) => {
    const matchesFilter = filter === "all" ? true : event.status === filter;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      event.title.toLowerCase().includes(normalizedQuery) ||
      event.description.toLowerCase().includes(normalizedQuery) ||
      event.category.toLowerCase().includes(normalizedQuery);
    return matchesFilter && matchesQuery;
  });

  const totalPages = Math.ceil(filteredEvents.length / PER_PAGE);
  const hasPagination = totalPages > 1;
  const currentPage = Math.min(page, Math.max(totalPages, 1));
  const visibleEvents = filteredEvents.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const handleFilter = (value: EventFilter) => {
    setFilter(value);
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const hasResults = filteredEvents.length > 0;

  return (
    <section className="pb-20 md:pb-28 lg:pb-32">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 shadow-soft">
            {eventFilters.map((tab) => {
              const isActive = filter === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => handleFilter(tab.value)}
                  aria-pressed={isActive}
                  className={cn(
                    "cursor-pointer rounded-full px-5 py-2 font-body text-sm font-semibold transition-all duration-300",
                    isActive
                      ? "bg-deep-green text-cream shadow-soft"
                      : "text-ink/70 hover:text-ink"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <SearchBar
            value={query}
            onChange={handleSearch}
            placeholder="Search events…"
            label="Search events"
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
          {visibleEvents.map((event) => {
            const isPast = event.status === "past";
            return (
              <motion.article
                key={event.title}
                variants={fadeUpVariants}
                className="group flex flex-col overflow-hidden rounded-card bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />

                  <div className="absolute left-3 top-3 flex flex-col items-center rounded-2xl bg-card/95 px-3 py-1.5 text-center shadow-soft backdrop-blur-sm">
                    <span className="font-heading text-lg font-bold leading-none text-ink">
                      {event.day}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 font-body text-[0.65rem] font-semibold tracking-wider",
                        monthColor[event.tone]
                      )}
                    >
                      {event.month}
                    </span>
                  </div>

                  <span className="absolute right-3 top-3 rounded-full bg-card/95 px-3 py-1 font-body text-xs font-semibold capitalize text-ink shadow-soft backdrop-blur-sm">
                    {event.status}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 lg:p-7">
                  <PillTag tone={event.tone} size="sm" className="w-fit">
                    <Highlight text={event.category} query={normalizedQuery} />
                  </PillTag>
                  <h3 className="mt-4 font-heading text-2xl font-semibold text-ink">
                    <Highlight text={event.title} query={normalizedQuery} />
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                    <Highlight
                      text={event.description}
                      query={normalizedQuery}
                    />
                  </p>

                  <Button variant="donate" size="sm" className="mt-6 w-fit" asChild>
                    <Link href={event.href}>
                      {isPast ? "View Recap" : "Register"}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <nav
          aria-label="Events pagination"
          className="mt-12 flex items-center justify-center gap-2 lg:mt-16"
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={!hasPagination || currentPage === 1}
            aria-label="Previous page"
            className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-ink shadow-soft transition-all duration-300 hover:bg-ink/5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-card"
          >
            <ArrowLeft className="size-4" />
          </button>

          {Array.from({ length: Math.max(totalPages, 1) }, (_, i) => i + 1).map(
            (pageNumber) => {
              const isActive = pageNumber === currentPage;
              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  disabled={!hasPagination}
                  aria-label={`Go to page ${pageNumber}`}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full font-body text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed",
                    isActive
                      ? "bg-deep-green text-cream shadow-soft"
                      : "border border-border bg-card text-ink/70 shadow-soft hover:bg-ink/5",
                    !hasPagination && !isActive && "opacity-40"
                  )}
                >
                  {pageNumber}
                </button>
              );
            }
          )}

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={!hasPagination || currentPage === totalPages}
            aria-label="Next page"
            className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-ink shadow-soft transition-all duration-300 hover:bg-ink/5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-card"
          >
            <ArrowRight className="size-4" />
          </button>
        </nav>
          </>
        ) : (
          <div className="mt-12 rounded-card border border-dashed border-border bg-card/50 px-6 py-16 text-center">
            <p className="font-heading text-xl font-semibold text-ink">
              No events found
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
