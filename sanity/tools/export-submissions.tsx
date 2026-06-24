import { DownloadIcon } from "@sanity/icons";
import { type CSSProperties, useCallback, useEffect, useState } from "react";
import { useClient } from "sanity";

import { apiVersion } from "../env";

type Submission = {
  _id: string;
  kind?: string;
  status?: string;
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  interest?: string;
  message?: string;
  eventTitle?: string;
  eventSlug?: string;
  source?: string;
  submittedAt?: string;
};

const KIND_OPTIONS = [
  { value: "", label: "All kinds" },
  { value: "contact", label: "Contact" },
  { value: "involvement", label: "Get Involved" },
  { value: "eventRegistration", label: "Event Registrations" },
];

const PRESET_OPTIONS = [
  { value: "all", label: "All time" },
  { value: "today", label: "Today" },
  { value: "week", label: "Past 7 days" },
  { value: "month", label: "Past 30 days" },
  { value: "year", label: "Past year" },
  { value: "custom", label: "Custom range" },
];

/**
 * Resolves a preset (or custom from/to dates) into ISO datetime bounds.
 * Presets are rolling windows relative to now; `today` is since local midnight.
 */
function computeRange(
  preset: string,
  from: string,
  to: string
): { fromIso?: string; toIso?: string } {
  if (preset === "all") return {};
  if (preset === "custom") {
    return {
      fromIso: from ? `${from}T00:00:00.000Z` : undefined,
      toIso: to ? `${to}T23:59:59.999Z` : undefined,
    };
  }
  const now = new Date();
  const start = new Date(now);
  if (preset === "today") start.setHours(0, 0, 0, 0);
  else if (preset === "week") start.setDate(start.getDate() - 7);
  else if (preset === "month") start.setDate(start.getDate() - 30);
  else if (preset === "year") start.setFullYear(start.getFullYear() - 1);
  return { fromIso: start.toISOString(), toIso: now.toISOString() };
}

// Column order for the exported CSV.
const COLUMNS: { key: keyof Submission; header: string }[] = [
  { key: "submittedAt", header: "Submitted at" },
  { key: "kind", header: "Kind" },
  { key: "status", header: "Status" },
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "phone", header: "Phone" },
  { key: "subject", header: "Subject" },
  { key: "interest", header: "Interest" },
  { key: "message", header: "Message" },
  { key: "eventTitle", header: "Event" },
  { key: "eventSlug", header: "Event slug" },
  { key: "source", header: "Source" },
];

const dateInputStyle: CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 6,
  border: "1px solid var(--card-border-color, #d1d5db)",
  background: "var(--card-bg-color, #fff)",
  color: "inherit",
  fontSize: 14,
};

function escapeCsv(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function toCsv(rows: Submission[]): string {
  const header = COLUMNS.map((c) => escapeCsv(c.header)).join(",");
  const body = rows
    .map((row) => COLUMNS.map((c) => escapeCsv(row[c.key])).join(","))
    .join("\r\n");
  // BOM so Excel detects UTF-8.
  return `\uFEFF${header}\r\n${body}`;
}

function download(filename: string, contents: string) {
  const blob = new Blob([contents], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function ExportSubmissionsTool() {
  const client = useClient({ apiVersion });
  const [kind, setKind] = useState("");
  const [preset, setPreset] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [count, setCount] = useState<number | null>(null);
  const [loadingCount, setLoadingCount] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isCustom = preset === "custom";
  const invalidRange = isCustom && Boolean(from && to && from > to);
  const { fromIso, toIso } = computeRange(preset, from, to);

  const clauses = ['_type == "submission"'];
  const params: Record<string, string> = {};
  if (kind) {
    clauses.push("kind == $kind");
    params.kind = kind;
  }
  if (fromIso) {
    clauses.push("submittedAt >= $from");
    params.from = fromIso;
  }
  if (toIso) {
    clauses.push("submittedAt <= $to");
    params.to = toIso;
  }
  const filter = clauses.join(" && ");

  useEffect(() => {
    if (invalidRange) {
      setCount(null);
      return;
    }
    let cancelled = false;
    setLoadingCount(true);
    setError(null);
    client
      .fetch<number>(`count(*[${filter}])`, params)
      .then((n) => {
        if (!cancelled) setCount(n);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message ?? "Failed to load count.");
      })
      .finally(() => {
        if (!cancelled) setLoadingCount(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, kind, preset, from, to]);

  const handleExport = useCallback(async () => {
    setExporting(true);
    setError(null);
    try {
      const rows = await client.fetch<Submission[]>(
        `*[${filter}] | order(submittedAt desc){
          _id, kind, status, name, email, phone, subject, interest,
          message, eventTitle, eventSlug, source, submittedAt
        }`,
        params
      );
      if (rows.length === 0) {
        setError("No submissions to export for this filter.");
        return;
      }
      const rangePart = isCustom
        ? `_${from || "start"}_${to || "now"}`
        : preset === "all"
          ? ""
          : `_${preset}`;
      const stamp = new Date().toISOString().slice(0, 10);
      const suffix = kind || "all";
      download(`submissions-${suffix}${rangePart}-${stamp}.csv`, toCsv(rows));
    } catch (err) {
      setError((err as Error)?.message ?? "Export failed.");
    } finally {
      setExporting(false);
    }
  }, [client, filter, params, kind, preset, isCustom, from, to]);

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: 32 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
        Export submissions
      </h1>
      <p style={{ color: "var(--card-muted-fg-color, #6b7280)", marginBottom: 24 }}>
        Download form submissions as a CSV (opens in Excel or Google Sheets).
      </p>

      <label
        htmlFor="export-kind"
        style={{ display: "block", fontWeight: 600, marginBottom: 8 }}
      >
        Filter by kind
      </label>
      <select
        id="export-kind"
        value={kind}
        onChange={(e) => setKind(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 6,
          border: "1px solid var(--card-border-color, #d1d5db)",
          background: "var(--card-bg-color, #fff)",
          color: "inherit",
          fontSize: 14,
          marginBottom: 20,
        }}
      >
        {KIND_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label
        htmlFor="export-preset"
        style={{ display: "block", fontWeight: 600, marginBottom: 8 }}
      >
        Date range
      </label>
      <select
        id="export-preset"
        value={preset}
        onChange={(e) => setPreset(e.target.value)}
        style={{ ...dateInputStyle, marginBottom: isCustom ? 12 : 20 }}
      >
        {PRESET_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {isCustom && (
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label
              htmlFor="export-from"
              style={{ display: "block", fontSize: 13, marginBottom: 4 }}
            >
              From
            </label>
            <input
              id="export-from"
              type="date"
              value={from}
              max={to || undefined}
              onChange={(e) => setFrom(e.target.value)}
              style={dateInputStyle}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label
              htmlFor="export-to"
              style={{ display: "block", fontSize: 13, marginBottom: 4 }}
            >
              To
            </label>
            <input
              id="export-to"
              type="date"
              value={to}
              min={from || undefined}
              onChange={(e) => setTo(e.target.value)}
              style={dateInputStyle}
            />
          </div>
        </div>
      )}

      <p style={{ marginTop: 12, marginBottom: 20, fontSize: 14 }}>
        {invalidRange
          ? "“From” date must be on or before “To” date."
          : loadingCount
            ? "Counting…"
            : count !== null
              ? `${count} submission${count === 1 ? "" : "s"} match this filter.`
              : ""}
      </p>

      <button
        type="button"
        onClick={handleExport}
        disabled={exporting || invalidRange || count === 0}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 18px",
          borderRadius: 6,
          border: "none",
          background:
            exporting || invalidRange || count === 0
              ? "var(--card-border-color, #9ca3af)"
              : "var(--card-fg-color, #111827)",
          color: "var(--card-bg-color, #fff)",
          fontSize: 14,
          fontWeight: 600,
          cursor:
            exporting || invalidRange || count === 0
              ? "not-allowed"
              : "pointer",
        }}
      >
        <DownloadIcon style={{ fontSize: 20 }} />
        {exporting ? "Preparing…" : "Download CSV"}
      </button>

      {error && (
        <p style={{ color: "#dc2626", marginTop: 16, fontSize: 14 }}>{error}</p>
      )}
    </div>
  );
}

export const exportSubmissionsTool = {
  name: "export-submissions",
  title: "Export",
  icon: DownloadIcon,
  component: ExportSubmissionsTool,
};
