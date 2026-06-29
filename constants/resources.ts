export type ResourceTone = "butter" | "coral" | "mint" | "lilac";
export type ResourceCategory = "Guides" | "Infographics" | "Toolkits";

export const resourceFilters = [
  { value: "all", label: "All" },
  { value: "Guides", label: "Guides" },
  { value: "Infographics", label: "Infographics" },
  { value: "Toolkits", label: "Toolkits" },
] as const;

export type ResourceFilter = (typeof resourceFilters)[number]["value"];
