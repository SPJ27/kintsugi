ALTER TABLE "user" ADD COLUMN "slug" text;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_slug_unique" UNIQUE("slug");