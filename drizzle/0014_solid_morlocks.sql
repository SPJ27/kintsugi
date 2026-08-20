ALTER TABLE "ship_events" RENAME COLUMN "hours" TO "seconds";--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "creation_key" text;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_creation_key_unique" UNIQUE("creation_key");