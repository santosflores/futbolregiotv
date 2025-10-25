import { NextRequest, NextResponse } from "next/server";
import { getAllPeople } from "@/lib/db";
import type { PeopleResponse } from "@/types/api";

export async function GET(request: NextRequest) {
  try {
    // Fetch all people using data access layer function
    const people = await getAllPeople();

    const response: PeopleResponse = {
      data: people,
      count: people.length,
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