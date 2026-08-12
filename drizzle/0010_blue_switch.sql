CREATE TABLE "shop_items" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "shop_items_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"item_name" text NOT NULL,
	"item_description" text
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "last_synced_at" timestamp;