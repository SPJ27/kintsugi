CREATE TABLE "ship_events" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ship_events_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"project_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"approval_status" text DEFAULT 'pending' NOT NULL,
	"ship_text" text NOT NULL,
	"reviewer_note" text,
	"audit_note" text,
	"hours" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ship_events" ADD CONSTRAINT "ship_events_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ship_events" ADD CONSTRAINT "ship_events_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "ship_events_projectId_idx" ON "ship_events" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "ship_events_userId_idx" ON "ship_events" USING btree ("user_id");