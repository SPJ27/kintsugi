ALTER TABLE "ship_events" ADD COLUMN "reviewed_by" text;--> statement-breakpoint
ALTER TABLE "ship_events" ADD COLUMN "reviewed_on" timestamp;--> statement-breakpoint
ALTER TABLE "ship_events" ADD CONSTRAINT "ship_events_reviewed_by_user_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "ship_events_reviewedBy_idx" ON "ship_events" USING btree ("reviewed_by");