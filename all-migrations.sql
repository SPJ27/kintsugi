CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");ALTER TABLE "user" ADD COLUMN "verification_status" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "slack_id" text;CREATE TABLE "logs" (
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
CREATE INDEX "logs_userId_idx" ON "logs" USING btree ("user_id");ALTER TABLE "logs" DROP COLUMN "status";ALTER TABLE "logs" ALTER COLUMN "pots_awarded" DROP NOT NULL;ALTER TABLE "user" ADD COLUMN "hackatime_linked" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "hackatime_access_token" text;ALTER TABLE "user" DROP COLUMN "hackatime_linked";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "hackatime_access_token";ALTER TABLE "user" ADD COLUMN "hackatime_linked" boolean DEFAULT false;CREATE TABLE "projects" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "projects_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"description" text,
	"shipped_hours" integer DEFAULT 0,
	"project_demo" text,
	"project_repo" text,
	"banner_url" text,
	"hackatime_projects" text[] DEFAULT '{}' NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "projects_userId_idx" ON "projects" USING btree ("user_id");ALTER TABLE "user" ADD COLUMN "slug" text;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_slug_unique" UNIQUE("slug");CREATE TABLE "shop_items" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "shop_items_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"item_name" text NOT NULL,
	"item_description" text
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "last_synced_at" timestamp;CREATE TABLE "ship_events" (
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
CREATE INDEX "ship_events_userId_idx" ON "ship_events" USING btree ("user_id");ALTER TABLE "projects" ALTER COLUMN "shipped_hours" SET NOT NULL;ALTER TABLE "projects" RENAME COLUMN "shipped_hours" TO "approved_seconds";ALTER TABLE "ship_events" RENAME COLUMN "hours" TO "seconds";--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "creation_key" text;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_creation_key_unique" UNIQUE("creation_key");ALTER TABLE "ship_events" ADD COLUMN "withdrawn_at" timestamp;