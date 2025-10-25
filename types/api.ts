import type { Person } from "./person";

export interface PeopleResponse {
  data: Person[];
  count: number;
}

export interface PersonResponse {
  data: Person | null;
  error?: string;
}
