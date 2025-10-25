import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { PersonResponse } from "@/types/api";
import type { Person } from "@/types/person";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate ID parameter
    const personId = parseInt(id, 10);
    if (isNaN(personId) || personId <= 0) {
      return NextResponse.json(
        { 
          data: null, 
          error: "Invalid person ID. Must be a positive integer." 
        },
        { status: 400 }
      );
    }

    // Fetch single person by ID
    const result = await query<Person>(
      "SELECT id, entry_number, name, created_at, twitter_handle, instagram_handle FROM people WHERE id = $1",
      [personId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { 
          data: null, 
          error: "Person not found" 
        },
        { status: 404 }
      );
    }

    const response: PersonResponse = {
      data: result.rows[0],
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Database error in /api/people/[id]:", error);
    
    return NextResponse.json(
      { 
        data: null, 
        error: "Failed to fetch person from database" 
      },
      { status: 500 }
    );
  }
}