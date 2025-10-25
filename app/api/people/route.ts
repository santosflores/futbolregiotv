import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { PeopleResponse } from "@/types/api";
import type { Person } from "@/types/person";

export async function GET(request: NextRequest) {
  try {
    // Fetch all people ordered by entry_number
    const result = await query<Person>(
      "SELECT id, entry_number, name, created_at, twitter_handle, instagram_handle FROM people ORDER BY entry_number ASC"
    );

    const response: PeopleResponse = {
      data: result.rows,
      count: result.rows.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Database error in /api/people:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to fetch people from database",
        data: [],
        count: 0 
      },
      { status: 500 }
    );
  }
}