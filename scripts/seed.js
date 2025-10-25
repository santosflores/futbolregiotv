#!/usr/bin/env node
/* eslint-disable no-console */
const path = require('node:path');
const { Pool } = require('pg');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

async function getPool() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set in .env.local');
  }
  const sslMode = process.env.PGSSLMODE || 'disable';
  const ssl = sslMode !== 'disable' ? { rejectUnauthorized: false } : undefined;
  return new Pool({ connectionString: databaseUrl, ssl });
}

(async () => {
  try {
    const pool = await getPool();
    const client = await pool.connect();
    try {
      const people = [
        { entry_number: 1, name: 'Santos Flores', twitter_handle: null, instagram_handle: null },
        { entry_number: 2, name: 'Juan Perez', twitter_handle: '@juanp', instagram_handle: null },
        { entry_number: 3, name: 'John Doe', twitter_handle: null, instagram_handle: '@johndoe' },
      ];

      for (const p of people) {
        await client.query(
          `INSERT INTO people(entry_number, name, twitter_handle, instagram_handle)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (entry_number) DO UPDATE SET name = EXCLUDED.name, twitter_handle = EXCLUDED.twitter_handle, instagram_handle = EXCLUDED.instagram_handle`,
          [p.entry_number, p.name, p.twitter_handle, p.instagram_handle]
        );
      }

      console.log('Seed data inserted.');
    } finally {
      client.release();
      await pool.end();
    }
  } catch (err) {
    console.error('Failed to seed database:', err.message || err);
    process.exitCode = 1;
  }
})();
