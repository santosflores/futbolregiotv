export interface Person {
  id: number;
  entry_number: number;
  name: string;
  created_at: string; // ISO string from TIMESTAMPTZ
  twitter_handle: string | null;
  instagram_handle: string | null;
}

export type SortOption = "entry_number" | "name" | "created_at";
export type SortDirection = "asc" | "desc";
