"use client";

import type { SortOption, SortDirection } from "@/types";

interface SortControlsProps {
  currentSort: SortOption;
  currentDirection: SortDirection;
  onSortChange: (sort: SortOption, direction: SortDirection) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "entry_number", label: "Entry Number" },
  { value: "name", label: "Name" },
  { value: "created_at", label: "Date Added" },
];

export default function SortControls({
  currentSort,
  currentDirection,
  onSortChange,
}: SortControlsProps) {
  const handleSortClick = (sort: SortOption) => {
    if (currentSort === sort) {
      // Toggle direction if same sort option is clicked
      const newDirection = currentDirection === "asc" ? "desc" : "asc";
      onSortChange(sort, newDirection);
    } else {
      // Set new sort option with default ascending direction
      onSortChange(sort, "asc");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
      <span className="text-sm font-medium text-gray-700">Sort by:</span>
      <div className="flex flex-wrap gap-2">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSortClick(option.value)}
            className={`
              px-3 py-2 text-sm rounded-md border transition-colors duration-200 min-h-[44px] touch-manipulation
              ${
                currentSort === option.value
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }
            `}
            aria-label={`Sort by ${option.label} ${
              currentSort === option.value ? currentDirection : "ascending"
            }`}
          >
            <span className="whitespace-nowrap">
              {option.label}
              {currentSort === option.value && (
                <span className="ml-1">
                  {currentDirection === "asc" ? "↑" : "↓"}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
