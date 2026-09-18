CREATE TABLE "likes" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"project_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "likes_userId_idx" ON "likes" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "likes_projectId_idx" ON "likes" USING btree ("project_id");--> statement-breakpoint
CREATE UNIQUE INDEX "likes_userId_projectId_idx" ON "likes" USING btree ("user_id","project_id");