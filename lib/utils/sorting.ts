import type { Person, SortOption, SortDirection } from "@/types";

/**
 * Sort people by entry number
 */
export function sortByEntryNumber(people: Person[], direction: SortDirection): Person[] {
  return [...people].sort((a, b) => {
    const comparison = a.entry_number - b.entry_number;
    return direction === "asc" ? comparison : -comparison;
  });
}

/**
 * Sort people by name (case-insensitive)
 */
export function sortByName(people: Person[], direction: SortDirection): Person[] {
  return [...people].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    const comparison = nameA.localeCompare(nameB);
    return direction === "asc" ? comparison : -comparison;
  });
}

/**
 * Sort people by creation date
 */
export function sortByDate(people: Person[], direction: SortDirection): Person[] {
  return [...people].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    const comparison = dateA - dateB;
    return direction === "asc" ? comparison : -comparison;
  });
}

/**
 * Main sorting function that delegates to specific sort functions
 */
export function sortPeople(people: Person[], sortOption: SortOption, direction: SortDirection): Person[] {
  switch (sortOption) {
    case "entry_number":
      return sortByEntryNumber(people, direction);
    case "name":
      return sortByName(people, direction);
    case "created_at":
      return sortByDate(people, direction);
    default:
      return people;
  }
}
