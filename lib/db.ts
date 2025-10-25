import { Pool, PoolClient, QueryConfig, QueryResult, QueryResultRow } from "pg";
import dotenv from "dotenv";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set. Add it to .env.local");
}

// Allow local dev without SSL and hosted DBs with SSL
const sslMode = process.env.PGSSLMODE || "disable";
const ssl = sslMode !== "disable" ? { rejectUnauthorized: false } : undefined;

export const pool = new Pool({ connectionString: databaseUrl, ssl });

pool.on("error", (err) => {
  // Log and let process crash on unrecoverable pool errors
  console.error("Unexpected PG pool error", err);
});

export async function withClient<T>(
  fn: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  try {
    return await fn(client);
  } finally {
    client.release();
  }
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string | QueryConfig<any[]>,
  params?: any[]
): Promise<QueryResult<T>> {
  return pool.query<T>(text as any, params);
}

export async function ensureSchema(): Promise<void> {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const schemaPath = path.join(process.cwd(), "lib", "schema.sql");
  const sql = await fs.readFile(schemaPath, "utf8");
  await query(sql);
}
