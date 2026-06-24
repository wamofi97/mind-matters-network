"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  /** Accessible label for the search input. */
  label?: string;
};

export function SearchBar({
  value,
  onChange,
  placeholder = "Search…",
  className,
  label = "Search",
}: SearchBarProps) {
  return (
    <div
      className={cn(
        "relative flex h-12 w-full items-center rounded-full border border-border bg-card shadow-soft transition-colors duration-300 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background sm:max-w-xs",
        className
      )}
    >
      <Search
        className="pointer-events-none absolute left-4 size-4 text-muted-foreground"
        aria-hidden
      />
      <input
        type="search"
        role="searchbox"
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-full w-full rounded-full bg-transparent pl-11 pr-10 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
      />
      {value.length > 0 && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 flex size-6 items-center justify-center rounded-full text-muted-foreground transition-colors duration-300 hover:bg-ink/5 hover:text-ink"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}
