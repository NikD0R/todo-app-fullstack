export type Filter = "completed" | "active" | null;
export type Sort = "priority-desc" | "priority-asc" | "default";

export type VisibilityOptions = {
  filterField?: Filter;
  sortField?: Sort;
  searchQuery?: string;
};
