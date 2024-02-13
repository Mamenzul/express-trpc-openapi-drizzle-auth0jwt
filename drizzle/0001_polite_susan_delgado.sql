ALTER TABLE "users" RENAME COLUMN "name" TO "password";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "username" text NOT NULL;