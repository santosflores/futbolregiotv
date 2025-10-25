#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('node:fs/promises');
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
      const schemaPath = path.join(process.cwd(), 'lib', 'schema.sql');
      const sql = await fs.readFile(schemaPath, 'utf8');
      await client.query(sql);
      console.log('Database schema applied successfully.');
    } finally {
      client.release();
      await pool.end();
    }
  } catch (err) {
    console.error('Failed to apply schema:', err.message || err);
    process.exitCode = 1;
  }
})();
