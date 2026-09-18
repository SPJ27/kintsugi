ALTER TABLE "ship_events" ADD COLUMN "golden_pot_awarded" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "golden_pots" integer DEFAULT 0;