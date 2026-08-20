import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index, integer } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  slug : text('slug').unique(),
  verificationStatus: text("verification_status"),
  slackId: text("slack_id"),
  pots: integer("pots").default(0).notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: text("roles").array().default(["member"]).notNull(),
  hackatimeLinked: boolean('hackatime_linked').default(false),
  lastSyncedAt: timestamp("last_synced_at"),
});

export const projects = pgTable(
  "projects",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    creationKey : text("creation_key").unique(),
    name: text("name").notNull(),
    description: text("description"),
    approvedSeconds: integer('approved_seconds').default(0).notNull(),
    projectDemo: text("project_demo"),
    projectRepo: text("project_repo"),
    bannerUrl: text("banner_url"),
    hackatimeProjects: text("hackatime_projects").array().default([]).notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("projects_userId_idx").on(table.userId)],
);

export const logs = pgTable(
  "logs",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    location: text("location").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    potsAwarded: integer("pots_awarded").default(0),
    metadata: text("metadata"),
  },
  (table) => [index("logs_userId_idx").on(table.userId)],
);

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const shopItems = pgTable("shop_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  itemName: text("item_name").notNull(),
  itemDescription: text("item_description")
})

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const shipEvents = pgTable(
  "ship_events",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    approvalStatus: text("approval_status").default("pending").notNull(),
    shipText: text("ship_text").notNull(),
    reviewerNote: text("reviewer_note"),
    auditNote: text("audit_note"),
    seconds: integer("seconds").default(0).notNull(),
  },
  (table) => [
    index("ship_events_projectId_idx").on(table.projectId),
    index("ship_events_userId_idx").on(table.userId),
  ],
);

export const projectsRelations = relations(projects, ({ one, many }) => ({
  user: one(user, {
    fields: [projects.userId],
    references: [user.id],
  }),
  shipEvents: many(shipEvents),
}));

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  logs: many(logs),
  projects: many(projects),
  shipEvents: many(shipEvents),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const logsRelations = relations(logs, ({ one }) => ({
  user: one(user, {
    fields: [logs.userId],
    references: [user.id],
  }),
}));

export const shipEventsRelations = relations(shipEvents, ({ one }) => ({
  project: one(projects, {
    fields: [shipEvents.projectId],
    references: [projects.id],
  }),
  user: one(user, {
    fields: [shipEvents.userId],
    references: [user.id],
  }),
}));