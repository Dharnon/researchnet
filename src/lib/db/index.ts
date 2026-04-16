import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

const sqlite = new Database('research.db');
export const db = drizzle(sqlite, { schema });

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS users (
    orcid TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    role TEXT,
    department TEXT,
    bio TEXT,
    avatar TEXT,
    affiliation TEXT,
    open_to_collab INTEGER DEFAULT 0,
    access_token TEXT,
    refresh_token TEXT,
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS connections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    requester_orcid TEXT NOT NULL REFERENCES users(orcid),
    addressee_orcid TEXT NOT NULL REFERENCES users(orcid),
    status TEXT NOT NULL DEFAULT 'pending',
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_orcid TEXT NOT NULL REFERENCES users(orcid),
    recipient_orcid TEXT NOT NULL REFERENCES users(orcid),
    content TEXT NOT NULL,
    read INTEGER DEFAULT 0,
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS publications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orcid TEXT NOT NULL REFERENCES users(orcid),
    doi TEXT,
    title TEXT NOT NULL,
    year INTEGER,
    journal TEXT,
    citations INTEGER DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orcid TEXT NOT NULL REFERENCES users(orcid),
    skill TEXT NOT NULL
  );
`);

type ColumnInfo = { name: string };
function ensureColumn(table: string, column: string, ddl: string) {
  const cols = sqlite.prepare(`PRAGMA table_info(${table})`).all() as ColumnInfo[];
  if (!cols.some((c) => c.name === column)) {
    sqlite.exec(`ALTER TABLE ${table} ADD COLUMN ${ddl}`);
  }
}

ensureColumn('users', 'affiliation', 'affiliation TEXT');
ensureColumn('users', 'open_to_collab', 'open_to_collab INTEGER DEFAULT 0');
