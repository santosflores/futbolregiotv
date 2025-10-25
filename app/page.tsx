"use client";

import { useState } from "react";
import PersonList from "./components/PersonList";
import type { Person } from "@/types";

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

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person);
    console.log("Selected person:", person);
  };

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
          
          <PersonList 
            people={samplePeople} 
            onPersonClick={handlePersonClick}
          />
          
          {selectedPerson && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900">Selected Person:</h3>
              <p className="text-blue-800">
                {selectedPerson.entry_number}. {selectedPerson.name}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
