#!/usr/bin/env node
/* eslint-disable no-console */
const path = require('node:path');
const { Pool } = require('pg');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

(async () => {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not set in .env.local');
    }
    const sslMode = process.env.PGSSLMODE || 'disable';
    const ssl = sslMode !== 'disable' ? { rejectUnauthorized: false } : undefined;
    const pool = new Pool({ connectionString: databaseUrl, ssl });

    const { rows } = await pool.query('SELECT NOW() as now');
    console.log('Connection OK. Server time:', rows[0].now);
    await pool.end();
  } catch (err) {
    console.error('DB connection failed:', err.message || err);
    process.exitCode = 1;
  }
})();
