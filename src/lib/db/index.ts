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
