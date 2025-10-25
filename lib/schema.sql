-- Schema for people table
CREATE TABLE IF NOT EXISTS people (
  id SERIAL PRIMARY KEY,
  entry_number INTEGER NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  twitter_handle TEXT,
  instagram_handle TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_people_entry_number ON people(entry_number);
CREATE INDEX IF NOT EXISTS idx_people_name ON people(name);
CREATE INDEX IF NOT EXISTS idx_people_created_at ON people(created_at);
-- Expression index for case-insensitive search on name
CREATE INDEX IF NOT EXISTS idx_people_lower_name ON people((LOWER(name)));
