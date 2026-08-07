CREATE TABLE "logs" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"location" text NOT NULL,
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"pots_awarded" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"metadata" text
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "pots" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "roles" text[] DEFAULT '{"member"}' NOT NULL;--> statement-breakpoint
ALTER TABLE "logs" ADD CONSTRAINT "logs_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "logs_userId_idx" ON "logs" USING btree ("user_id");