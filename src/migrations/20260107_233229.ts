import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_brand_theme" AS ENUM('slate', 'ocean', 'forest', 'rose', 'amber', 'violet');
  CREATE TYPE "public"."enum_brand_font" AS ENUM('geist', 'inter', 'roboto');
  CREATE TYPE "public"."enum_brand_radius" AS ENUM('0px', '0.3rem', '0.5rem', '0.75rem', '9999px');
  CREATE TABLE "brand" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"theme" "enum_brand_theme" DEFAULT 'slate',
  	"background" varchar,
  	"foreground" varchar,
  	"card" varchar,
  	"card_foreground" varchar,
  	"popover" varchar,
  	"popover_foreground" varchar,
  	"primary" varchar,
  	"primary_foreground" varchar,
  	"secondary" varchar,
  	"secondary_foreground" varchar,
  	"muted" varchar,
  	"muted_foreground" varchar,
  	"accent" varchar,
  	"accent_foreground" varchar,
  	"destructive" varchar,
  	"destructive_foreground" varchar,
  	"border" varchar,
  	"input" varchar,
  	"ring" varchar,
  	"dark_background" varchar,
  	"dark_foreground" varchar,
  	"dark_card" varchar,
  	"dark_cardforeground" varchar,
  	"dark_popover" varchar,
  	"dark_popoverforeground" varchar,
  	"dark_primary" varchar,
  	"dark_primaryforeground" varchar,
  	"dark_secondary" varchar,
  	"dark_secondaryforeground" varchar,
  	"dark_muted" varchar,
  	"dark_mutedforeground" varchar,
  	"dark_accent" varchar,
  	"dark_accentforeground" varchar,
  	"dark_destructive" varchar,
  	"dark_destructiveforeground" varchar,
  	"dark_border" varchar,
  	"dark_input" varchar,
  	"dark_ring" varchar,
  	"font" "enum_brand_font" DEFAULT 'geist',
  	"google_fonts_code" varchar,
  	"custom_font_family" varchar,
  	"radius" "enum_brand_radius" DEFAULT '0.5rem',
  	"raw_css" varchar,
  	"favicon_id" integer,
  	"og_image_id" integer,
  	"head_code" varchar,
  	"footer_code" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "header" ADD COLUMN "enable_kok_status" boolean DEFAULT false;
  ALTER TABLE "brand" ADD CONSTRAINT "brand_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "brand" ADD CONSTRAINT "brand_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "brand_favicon_idx" ON "brand" USING btree ("favicon_id");
  CREATE INDEX "brand_og_image_idx" ON "brand" USING btree ("og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "brand" CASCADE;
  ALTER TABLE "header" DROP COLUMN "enable_kok_status";
  DROP TYPE "public"."enum_brand_theme";
  DROP TYPE "public"."enum_brand_font";
  DROP TYPE "public"."enum_brand_radius";`)
}
