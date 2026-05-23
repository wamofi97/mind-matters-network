/**
 * Mind Matters Network — moodboard color tokens
 * Source of truth for programmatic use (charts, meta, etc.)
 */
export const colors = {
  cream: "#F2F3EF",
  ink: "#081D56",
  deepGreen: "#0E605E",
  sage: "#63A8AA",
  lilac: "#6773C6",
  coral: "#F07C7C",
  butter: "#F6E7A1",
  sageSoft: "#D8EFEA",
  lilacSoft: "#E9E6FB",
  warmTaupe: "#2E2A24",
} as const;

export const radii = {
  card: "32px",
  button: "9999px",
  input: "16px",
} as const;

export const spacing = {
  section: {
    sm: "4rem",
    md: "6rem",
    lg: "8rem",
    xl: "10rem",
  },
  container: "80rem",
} as const;

export type ColorToken = keyof typeof colors;
