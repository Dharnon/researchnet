import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  orcid: text('orcid').primaryKey(),
  name: text('name').notNull(),
  email: text('email'),
  role: text('role'),
  department: text('department'),
  bio: text('bio'),
  avatar: text('avatar'),
  affiliation: text('affiliation'),
  openToCollab: integer('open_to_collab', { mode: 'boolean' }).default(false),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const connections = sqliteTable('connections', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  requesterOrcid: text('requester_orcid').notNull().references(() => users.orcid),
  addresseeOrcid: text('addressee_orcid').notNull().references(() => users.orcid),
  status: text('status').notNull().default('pending'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  senderOrcid: text('sender_orcid').notNull().references(() => users.orcid),
  recipientOrcid: text('recipient_orcid').notNull().references(() => users.orcid),
  content: text('content').notNull(),
  read: integer('read', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const publications = sqliteTable('publications', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orcid: text('orcid').notNull().references(() => users.orcid),
  doi: text('doi'),
  title: text('title').notNull(),
  year: integer('year'),
  journal: text('journal'),
  citations: integer('citations').default(0),
});

export const skills = sqliteTable('skills', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orcid: text('orcid').notNull().references(() => users.orcid),
  skill: text('skill').notNull(),
});
