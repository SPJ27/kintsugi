ALTER TABLE "user" ADD COLUMN "hackatime_linked" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "hackatime_access_token" text;