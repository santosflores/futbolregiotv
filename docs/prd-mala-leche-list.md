# PRD: La Lista Mala Leche

## Introduction/Overview

This feature provides a web application that displays a numbered list of people mentioned during a radio show. As anchors tell stories and mention individuals, these people are added to the list. Fans of the show can use this tool to track and see all the people who have been mentioned throughout the show's history. This is a complementary web asset for the radio show.

**Problem it solves:** Radio show fans want to keep track of all people mentioned during the show, but this information is difficult to track without a centralized reference system.

**Goal:** Create a single-page web application that displays a numbered, searchable, sortable list of people with their names, allowing fans to easily track members mentioned on the show.

## Goals

1. Display a complete numbered list of all people mentioned on the radio show
2. Allow fans to search/filter the list to find specific people
3. Allow fans to sort the list (e.g., alphabetical, by entry number, by most recent)
4. Provide an intuitive interface for navigation and interaction
5. Maintain a clean, minimal design that doesn't distract from the list content
6. Store list data persistently in a PostgreSQL database
7. Support semi-regular updates as new people are added during the show

## User Stories

1. **As a fan of the radio show**, I want to see all the people who have been mentioned on the show so that I can track the complete list of members.

2. **As a fan of the radio show**, I want to search for a specific person's name so that I can quickly verify if they've been mentioned on the show.

3. **As a fan of the radio show**, I want to sort the list by different criteria (alphabetical, by entry number, by date added) so that I can find information in my preferred way.

4. **As a fan of the radio show**, I want to click on a person's name to see more details about them (social media handles, date added) so that I can get additional information and connect with them.

5. **As a fan of the radio show**, I want the list to be updated when new people are added during the show so that I can keep track of the most recent additions.

## Functional Requirements

1. The system must fetch the list of people from a PostgreSQL database.
2. The system must display each person with their entry number (reflecting the order in which they were added over time, maintaining original numbers even if someone is removed) and full name.
3. The system must display people in a list format (vertically stacked items).
4. The system must provide a search input field that allows users to filter the list by name (case-insensitive).
5. The system must update the displayed list in real-time as the user types in the search field.
6. The system must provide sort options that allow users to order the list by:
   - Entry number (ascending/descending)
   - Name alphabetically (A-Z / Z-A)
   - Date added (most recent first / oldest first)
7. The system must make each list item clickable to show a detail view or modal displaying: name, entry number, date added, and social media handles (if available).
8. The system must maintain the sequential numbering system for all displayed entries.
9. The system must handle empty states gracefully (e.g., "No results found" when search yields no matches).
10. The system must be responsive and work on both desktop and mobile devices.
11. The system must implement a clean, minimal design aesthetic.
12. The system must support semi-regular updates to the database (via admin interface or direct database access).
13. The system must display the list in a way that is easy to scan and read.

## Non-Goals (Out of Scope)

1. User authentication or login functionality
2. Admin interface for adding/editing/deleting people from within the application (initial version)
3. Profile pages with detailed information about each person
4. Comments or social interactions on entries
5. Multiple lists or categories
6. Images or avatars for people
7. Email addresses or contact information display
8. Social media follow buttons or embed features (displays handles only)
9. History or version tracking of changes
10. Notifications or alerts
11. Multi-language support
12. User profiles or personalization features

## Design Considerations

- **Style:** Minimal and clean design
- **Color scheme:** Keep it simple - use neutral colors with good contrast for readability
- **Typography:** Use clear, readable fonts appropriate for a list format
- **Layout:** Single-column list layout, centered or left-aligned on desktop
- **Search/Sort UI:** Place search bar at the top, sort options as buttons or dropdown
- **List items:** Each person should be displayed as a row with: `[Number]. [Full Name]`
- **Visual feedback:** Hover states on clickable items, active states for selected sort option
- **Mobile responsiveness:** Ensure touch-friendly interaction on mobile devices
- **Loading states:** Show appropriate loading indicator while fetching data
- **Empty states:** Clear messaging when search yields no results
- **Accessibility:** Ensure keyboard navigation works, proper ARIA labels

## Technical Considerations

- **Database:** PostgreSQL with a simple table structure:
  - `id` (primary key, auto-increment)
  - `entry_number` (integer, unique, required) - represents the order in which the person was added
  - `name` (text, required)
  - `social_media_handles` (text, optional) - JSON or text field to store handles
  - `created_at` (timestamp)
- **Backend:** API endpoints to fetch the list of people (GET /api/people)
- **Frontend framework:** Next.js 16 (already configured in this project)
- **Type safety:** TypeScript for type safety
- **API integration:** Use fetch or a data fetching library to call the API
- **State management:** React state for search/filter, sort options, and list data
- **Data fetching:** Client-side fetching on page load
- **Error handling:** Handle API errors gracefully (network failures, etc.)
- **Performance:** List expected to grow to approximately 100 entries; pagination not required for this scale
- **Database migrations:** Use appropriate migration tool if needed

## Success Metrics

1. **Functionality:** All functional requirements are working as specified (search, sort, display, click to view)
2. **Performance:** List loads within 2 seconds on a typical internet connection
3. **Usability:** Users can successfully search for a person and sort the list without confusion
4. **Design:** The page maintains a clean, minimal aesthetic
5. **Data integrity:** The list displays accurate names and correct sequential numbering
6. **Updates:** New people can be added to the database and appear in the list within a reasonable time

## Open Questions

1. ~~What additional information should be shown when clicking on a person's name?~~ **RESOLVED:** Social media handles will be displayed in the detail view/modal.
2. ~~Should the entry numbers always be sequential (1, 2, 3...) or should they represent the order in which people were added over time?~~ **RESOLVED:** Entry numbers will represent the order in which people were added over time, maintaining original numbers even if someone is removed.
3. Are there any specific brand colors or fonts that should be used to match the radio show's brand?
4. ~~What should be the maximum expected list size?~~ **RESOLVED:** List expected to grow to approximately 100 entries.
5. ~~Is there a preferred way to handle sorting when there are multiple people with the same name?~~ **RESOLVED:** Secondary sort will be by date added when names are identical.
