ALTER TABLE "ship_events" ADD COLUMN "first_pass_approval_status" text DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE "ship_events" ADD COLUMN "first_pass_reviewer_note" text;--> statement-breakpoint
ALTER TABLE "ship_events" ADD COLUMN "first_pass_audit_note" text;--> statement-breakpoint
ALTER TABLE "ship_events" ADD COLUMN "first_pass_reviewed_by" text;--> statement-breakpoint
ALTER TABLE "ship_events" ADD COLUMN "first_pass_reviewed_on" timestamp;--> statement-breakpoint
ALTER TABLE "ship_events" ADD CONSTRAINT "ship_events_first_pass_reviewed_by_user_id_fk" FOREIGN KEY ("first_pass_reviewed_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;