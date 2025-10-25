"use client";

import type { Person } from "@/types";

interface PersonListProps {
  people: Person[];
  onPersonClick: (person: Person) => void;
}

export default function PersonList({ people, onPersonClick }: PersonListProps) {
  return (
    <ul 
      className="space-y-2"
      role="list"
      aria-label="List of people"
    >
      {people.map((person) => (
        <li key={person.id}>
          <button
            onClick={() => onPersonClick(person)}
            className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            aria-label={`View details for ${person.name}`}
          >
            <span className="text-gray-600 font-medium">
              {person.entry_number}.
            </span>
            <span className="ml-2 text-gray-900">
              {person.name}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
