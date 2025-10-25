"use client";

import { useState, useMemo } from "react";
import PersonList from "./components/PersonList";
import SearchBar from "./components/SearchBar";
import SortControls from "./components/SortControls";
import PersonDetailModal from "./components/PersonDetailModal";
import LoadingState from "./components/LoadingState";
import EmptyState from "./components/EmptyState";
import { sortPeople } from "@/lib/utils/sorting";
import type { Person, SortOption, SortDirection } from "@/types";

// Sample data for testing
const samplePeople: Person[] = [
  {
    id: 1,
    entry_number: 1,
    name: "Santos Flores",
    created_at: "2025-10-25T18:34:57.779Z",
    twitter_handle: null,
    instagram_handle: null,
  },
  {
    id: 2,
    entry_number: 2,
    name: "Juan Perez",
    created_at: "2025-10-25T18:34:57.787Z",
    twitter_handle: "@juanp",
    instagram_handle: null,
  },
  {
    id: 3,
    entry_number: 3,
    name: "John Doe",
    created_at: "2025-10-25T18:34:57.788Z",
    twitter_handle: null,
    instagram_handle: "@johndoe",
  },
];

export default function Home() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("entry_number");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isLoading, setIsLoading] = useState(false);

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
    console.log("Selected person:", person);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPerson(null);
  };

  // Simulate loading state for testing
  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sort: SortOption, direction: SortDirection) => {
    setSortOption(sort);
    setSortDirection(direction);
  };

  // Filter and sort people based on search query and sort options
  const filteredAndSortedPeople = useMemo(() => {
    let filtered = samplePeople;
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = samplePeople.filter((person) =>
        person.name.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    return sortPeople(filtered, sortOption, sortDirection);
  }, [searchQuery, sortOption, sortDirection]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          La Lista Mala Leche
        </h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              People List
            </h2>
            <button
              onClick={simulateLoading}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Test Loading
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar onSearchChange={handleSearchChange} />
          </div>
          
          {/* Sort Controls */}
          <div className="mb-6">
            <SortControls
              currentSort={sortOption}
              currentDirection={sortDirection}
              onSortChange={handleSortChange}
            />
          </div>
          
          {/* Content based on state */}
          {isLoading ? (
            <LoadingState />
          ) : filteredAndSortedPeople.length === 0 ? (
            <EmptyState 
              type={searchQuery ? "no-results" : "no-people"}
              searchQuery={searchQuery}
            />
          ) : (
            <PersonList 
              people={filteredAndSortedPeople} 
              onPersonClick={handlePersonClick}
            />
          )}
          
        </div>
      </div>

      {/* Person Detail Modal */}
      <PersonDetailModal
        person={selectedPerson}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
