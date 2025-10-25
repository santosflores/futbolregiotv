"use client";

import type { Person } from "@/types";

interface PersonListProps {
  people: Person[];
  onPersonClick: (person: Person) => void;
}

export default function PersonList({ people, onPersonClick }: PersonListProps) {
  return (
    <ul 
      className="space-y-2 sm:space-y-3"
      role="list"
      aria-label="List of people"
    >
      {people.map((person) => (
        <li key={person.id}>
          <button
            onClick={() => onPersonClick(person)}
            className="w-full text-left p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 min-h-[60px] touch-manipulation"
            aria-label={`View details for ${person.name}`}
          >
            <div className="flex items-center">
              <span className="text-gray-600 font-medium text-sm sm:text-base flex-shrink-0">
                {person.entry_number}.
              </span>
              <span className="ml-2 sm:ml-3 text-gray-900 text-sm sm:text-base truncate">
                {person.name}
              </span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
