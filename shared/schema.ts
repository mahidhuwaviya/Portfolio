import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const portfolios = pgTable("portfolios", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  title: text("title").notNull(),
  skills: jsonb("skills").$type<string[]>().notNull().default([]),
  discipline: text("discipline").notNull(),
  description: text("description").notNull(),
  experience: text("experience").notNull(),
  availability: text("availability").notNull(),
  contactEmail: text("contact_email").notNull(),
  portfolioUrl: text("portfolio_url"),
  featured: text("featured").notNull().default("false"),
});

export const insertPortfolioSchema = createInsertSchema(portfolios).omit({
  id: true,
});

export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;
export type Portfolio = typeof portfolios.$inferSelect;

// Search filters schema
export const searchFiltersSchema = z.object({
  query: z.string().optional(),
  visitorType: z.enum(["guest", "stalker", "recruiter"]).optional(),
  discipline: z.string().optional(),
  skills: z.array(z.string()).optional(),
  availability: z.string().optional(),
});

export type SearchFilters = z.infer<typeof searchFiltersSchema>;
