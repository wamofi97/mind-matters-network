import { Fragment } from "react";
import { cn } from "@/lib/utils";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

type HighlightProps = {
  text: string;
  query: string;
  className?: string;
};

/**
 * Renders `text`, wrapping any case-insensitive matches of `query` in a
 * highlighted <mark>. Falls back to plain text when there's no query.
 */
export function Highlight({ text, query, className }: HighlightProps) {
  const trimmed = query.trim();
  if (trimmed.length === 0) return <>{text}</>;

  const parts = text.split(new RegExp(`(${escapeRegExp(trimmed)})`, "ig"));
  const lowerQuery = trimmed.toLowerCase();

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === lowerQuery ? (
          <mark
            key={index}
            className={cn(
              "rounded-sm bg-butter px-0.5 text-ink",
              className
            )}
          >
            {part}
          </mark>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        )
      )}
    </>
  );
}
