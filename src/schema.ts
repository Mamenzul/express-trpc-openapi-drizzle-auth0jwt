import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username"),
  fullname: text("fullname"),
  password: text("password").notNull(),
  email: text("email").notNull(),
});

export type User = InferSelectModel<typeof users>;
