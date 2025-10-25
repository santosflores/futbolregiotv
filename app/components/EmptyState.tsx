interface EmptyStateProps {
  type: "no-people" | "no-results";
  searchQuery?: string;
}

export default function EmptyState({ type, searchQuery }: EmptyStateProps) {
  if (type === "no-people") {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        {/* Empty State Icon */}
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        
        {/* Empty State Message */}
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No people found
        </h3>
        <p className="text-gray-500 text-center max-w-sm">
          There are no people in the list yet. Check back later or add some people to get started.
        </p>
      </div>
    );
  }

  if (type === "no-results" && searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        {/* No Results Icon */}
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        {/* No Results Message */}
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No results found
        </h3>
        <p className="text-gray-500 text-center max-w-sm">
          No people found for &ldquo;{searchQuery}&rdquo;. Try adjusting your search terms.
        </p>
      </div>
    );
  }

  return null;
}
