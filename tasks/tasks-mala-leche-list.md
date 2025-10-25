# Task List: La Lista Mala Leche

## Relevant Files

- `types/person.ts` - TypeScript interface definitions for Person data model
- `lib/db.ts` - Database connection and query functions
- `lib/schema.sql` - SQL schema for `people` table and indexes
- `lib/utils/sorting.ts` - Helper functions for sorting people by various criteria
- `app/api/people/route.ts` - API endpoint for fetching all people
- `app/api/people/[id]/route.ts` - API endpoint for fetching single person by ID
- `app/components/PersonList.tsx` - Main component for displaying the list of people
- `app/components/SearchBar.tsx` - Search input component for filtering people
- `app/components/SortControls.tsx` - UI controls for sorting the list
- `app/components/PersonDetailModal.tsx` - Modal component for displaying person details
- `app/components/LoadingState.tsx` - Loading indicator component
- `app/components/EmptyState.tsx` - Empty state component for no results
- `app/page.tsx` - Main page component integrating all features
- `.env.local` - Environment variables for database connection
- `prisma/schema.prisma` - Database schema definition (if using Prisma)
- `prisma/migrations/` - Database migration files

### Notes

- Use Next.js 16 App Router conventions (Server Components by default, "use client" for interactive components)
- Follow existing Tailwind v4 styling patterns from `app/globals.css`
- Use TypeScript strict mode and proper type definitions
- Run `npm run lint` before committing changes
- Test components in isolation and integration
- Ensure accessibility with proper ARIA labels and keyboard navigation

## Tasks

- [x] 1.0 Database Setup and Configuration

  - [x] 1.1 Install PostgreSQL client library (`pg`) and type definitions (`@types/pg`)
  - [x] 1.2 Create `.env.local` file with `DATABASE_URL` environment variable
  - [x] 1.3 Create database schema SQL file (`lib/schema.sql`) with CREATE TABLE statement for `people` table
  - [x] 1.4 Add database indexes for `entry_number`, `name`, `created_at`, and expression index on `LOWER(name)`
  - [x] 1.5 Create database connection pool utility in `lib/db.ts` using `pg.Pool`
  - [x] 1.6 Add database seed script to insert initial sample data (Santos Flores, Juan Perez, John Doe)
  - [x] 1.7 Test database connection and verify schema creation works correctly

- [x] 2.0 Type Definitions and Data Models

  - [x] 2.1 Create `types/person.ts` with `Person` interface matching database schema
  - [x] 2.2 Add `sortOption` and `sortDirection` types for sorting functionality
  - [x] 2.3 Create `types/api.ts` with API response types (`PeopleResponse`, `PersonResponse`)
  - [x] 2.4 Export all types from `types/index.ts` for easy importing

- [x] 3.0 Backend API Development

  - [x] 3.1 Create `app/api/people/route.ts` with GET handler to fetch all people
  - [x] 3.2 Implement database query in API route to select all people ordered by entry_number
  - [x] 3.3 Add error handling with try-catch for database errors
  - [x] 3.4 Return JSON response with `data` array and `count` field
  - [x] 3.5 Create `app/api/people/[id]/route.ts` with dynamic route handler
  - [x] 3.6 Implement GET handler to fetch single person by ID
  - [x] 3.7 Add 404 handling for person not found
  - [x] 3.8 Add input validation for ID parameter
  - [x] 3.9 Test both API endpoints with sample requests and verify responses

- [x] 4.0 Data Access Layer Functions

  - [x] 4.1 Create `getAllPeople()` function in `lib/db.ts` to fetch all people from database
  - [x] 4.2 Create `getPersonById(id: number)` function to fetch single person by ID
  - [x] 4.3 Implement proper TypeScript types for database query results
  - [x] 4.4 Add error handling for database connection failures
  - [x] 4.5 Add connection pool error handling and retry logic
  - [x] 4.6 Write unit tests for database query functions

- [x] 5.0 Core UI Components - Person List

  - [x] 5.1 Create `app/components/PersonList.tsx` as client component ("use client")
  - [x] 5.2 Implement prop interface accepting `people` array and callback for person click
  - [x] 5.3 Render list of people with format: `[entry_number]. [name]`
  - [x] 5.4 Add click handler to each list item to open detail modal
  - [x] 5.5 Implement hover states with Tailwind classes for visual feedback
  - [x] 5.6 Add proper ARIA labels and semantic HTML (ul/li elements)
  - [x] 5.7 Test component renders correctly with sample data

- [x] 6.0 Search Functionality

  - [x] 6.1 Create `app/components/SearchBar.tsx` as client component
  - [x] 6.2 Implement controlled input with state management for search query
  - [x] 6.3 Add debounce functionality to prevent excessive filtering (300ms delay)
  - [x] 6.4 Pass search query to parent component via onChange callback
  - [x] 6.5 Add placeholder text: "Search by name..."
  - [x] 6.6 Style search input with minimal, clean design using Tailwind
  - [x] 6.7 Add clear button (X icon) to reset search query

- [x] 7.0 Sort Controls

  - [x] 7.1 Create `app/components/SortControls.tsx` as client component
  - [x] 7.2 Add sort option buttons (Entry Number, Name, Date Added)
  - [x] 7.3 Implement ascending/descending toggle for each sort option
  - [x] 7.4 Pass sort state to parent component via callback
  - [x] 7.5 Add visual indicator for active sort option and direction
  - [x] 7.6 Style buttons with active/hover states using Tailwind

- [x] 8.0 Sorting Logic Implementation

  - [x] 8.1 Create `lib/utils/sorting.ts` with sorting utility functions
  - [x] 8.2 Implement `sortByEntryNumber(people, direction)` function
  - [x] 8.3 Implement `sortByName(people, direction)` function
  - [x] 8.4 Implement `sortByDate(people, direction)` function
  - [x] 8.5 Add secondary sort by `created_at` when names are identical
  - [x] 8.6 Test all sorting functions with sample data

- [x] 9.0 Person Detail Modal

  - [x] 9.1 Create `app/components/PersonDetailModal.tsx` as client component
  - [x] 9.2 Implement modal overlay with backdrop click to close
  - [x] 9.3 Display person name, entry number, created_at date formatted
  - [x] 9.4 Display social media handles if available (or "No social media provided")
  - [x] 9.5 Add close button (X icon) to dismiss modal
  - [x] 9.6 Implement keyboard support (Escape key to close)
  - [x] 9.7 Add smooth open/close animations using CSS transitions
  - [x] 9.8 Style modal with clean, minimal design
  - [x] 9.9 Add proper ARIA attributes for accessibility

- [x] 10.0 Loading and Empty States

  - [x] 10.1 Create `app/components/LoadingState.tsx` component
  - [x] 10.2 Implement loading spinner or skeleton loader
  - [x] 10.3 Add loading text "Loading people..."
  - [x] 10.4 Create `app/components/EmptyState.tsx` component
  - [x] 10.5 Implement "No people found" message for empty list
  - [x] 10.6 Add "No results found" message for search with no matches
  - [x] 10.7 Style both components with minimal design

- [x] 11.0 Main Page Integration

  - [x] 11.1 Update `app/page.tsx` to fetch data from `/api/people` endpoint
  - [x] 11.2 Implement useState hooks for people data, search query, sort state
  - [x] 11.3 Implement useEffect to fetch data on component mount
  - [x] 11.4 Add loading state display while fetching data
  - [x] 11.5 Implement filterPeople function to filter by search query (case-insensitive)
  - [x] 11.6 Integrate sorting logic based on current sort state
  - [x] 11.7 Wire up PersonList component with filtered/sorted data
  - [x] 11.8 Wire up SearchBar and SortControls with callbacks
  - [x] 11.9 Implement PersonDetailModal with selected person state
  - [x] 11.10 Add error handling for API failures with error message display
  - [x] 11.11 Test all interactive features (search, sort, modal) end-to-end

- [x] 12.0 Responsive Design and Styling

  - [x] 12.1 Ensure main page layout is responsive for mobile devices
  - [x] 12.2 Test search bar works well on mobile with appropriate input size
  - [x] 12.3 Make sort controls stack vertically on mobile screens
  - [x] 12.4 Ensure person list is touch-friendly with adequate tap targets
  - [x] 12.5 Test modal displays correctly on mobile (full width, proper scrolling)
  - [x] 12.6 Add padding and spacing for readability on all screen sizes
  - [x] 12.7 Verify design follows minimal aesthetic with neutral colors
  - [x] 12.8 Test dark mode compatibility (if implemented)

- [ ] 13.0 Accessibility Enhancements

  - [ ] 13.1 Add proper heading hierarchy (h1, h2) to page structure
  - [ ] 13.2 Ensure all interactive elements are keyboard accessible
  - [ ] 13.3 Add ARIA labels to search input and sort buttons
  - [ ] 13.4 Add ARIA live regions for dynamic content updates
  - [ ] 13.5 Ensure sufficient color contrast for text readability
  - [ ] 13.6 Test with screen reader (VoiceOver or NVDA)
  - [ ] 13.7 Add focus indicators for keyboard navigation

- [ ] 14.0 Performance Optimization

  - [ ] 14.1 Implement React.memo for PersonList component to prevent unnecessary re-renders
  - [ ] 14.2 Optimize filtering and sorting to avoid re-computation on every render
  - [ ] 14.3 Add useMemo for filtered/sorted data
  - [ ] 14.4 Add useCallback for event handlers
  - [ ] 14.5 Verify no unnecessary API calls are made
  - [ ] 14.6 Test performance with 100+ records if possible

- [ ] 15.0 Error Handling and Edge Cases

  - [ ] 15.1 Handle network errors gracefully with user-friendly message
  - [ ] 15.2 Handle empty database state
  - [ ] 15.3 Handle search with no results
  - [ ] 15.4 Handle API returning malformed data
  - [ ] 15.5 Add console error logging for debugging
  - [ ] 15.6 Test all error scenarios manually

- [ ] 16.0 Testing and Quality Assurance

  - [ ] 16.1 Run `npm run lint` and fix all linting errors
  - [ ] 16.2 Test on multiple browsers (Chrome, Firefox, Safari, Edge)
  - [ ] 16.3 Test on mobile devices (iOS and Android)
  - [ ] 16.4 Verify API endpoint returns correct data format
  - [ ] 16.5 Test search functionality with various inputs (special characters, empty string)
  - [ ] 16.6 Test sorting functionality for all sort options and directions
  - [ ] 16.7 Test modal open/close functionality
  - [ ] 16.8 Verify loading states display correctly
  - [ ] 16.9 Verify empty states display correctly
  - [ ] 16.10 Check for TypeScript errors (build should succeed)

- [ ] 17.0 Documentation and Final Polish

  - [ ] 17.1 Update README.md with setup instructions for database
  - [ ] 17.2 Document environment variables needed in README
  - [ ] 17.3 Add code comments for complex logic in components
  - [ ] 17.4 Update app metadata in `app/layout.tsx` (title, description)
  - [ ] 17.5 Add favicon update if needed
  - [ ] 17.6 Verify all tasks are complete and working as expected
