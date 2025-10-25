"use client";

import { useState, useMemo, useEffect } from "react";
import PersonList from "./components/PersonList";
import SearchBar from "./components/SearchBar";
import SortControls from "./components/SortControls";
import PersonDetailModal from "./components/PersonDetailModal";
import LoadingState from "./components/LoadingState";
import EmptyState from "./components/EmptyState";
import { sortPeople } from "@/lib/utils/sorting";
import type { Person, SortOption, SortDirection, PeopleResponse } from "@/types";

// API functions
const fetchPeople = async (): Promise<Person[]> => {
  try {
    const response = await fetch("/api/people");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: PeopleResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching people:", error);
    throw error;
  }
};

export default function Home() {
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("entry_number");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch people data on component mount
  useEffect(() => {
    const loadPeople = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const peopleData = await fetchPeople();
        setPeople(peopleData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load people");
        console.error("Error loading people:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
    console.log("Selected person:", person);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPerson(null);
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
    let filtered = people;
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = people.filter((person) =>
        person.name.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    return sortPeople(filtered, sortOption, sortDirection);
  }, [people, searchQuery, sortOption, sortDirection]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          La Lista Mala Leche
        </h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            People List
          </h2>
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-red-800">Error loading people</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}
          
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
