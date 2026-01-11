import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_savosec_about_features_icon" AS ENUM('Shield', 'Users', 'Wifi', 'Terminal');
  CREATE TYPE "public"."enum_pages_blocks_savosec_hero_register_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_savosec_hero_register_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_savosec_hero_schedule_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_savosec_hero_schedule_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_savosec_schedule_schedule_type" AS ENUM('talk', 'break', 'networking');
  CREATE TYPE "public"."enum_pages_blocks_savosec_sponsors_contact_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_savosec_sponsors_contact_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_savosec_about_features_icon" AS ENUM('Shield', 'Users', 'Wifi', 'Terminal');
  CREATE TYPE "public"."enum__pages_v_blocks_savosec_hero_register_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_savosec_hero_register_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_savosec_hero_schedule_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_savosec_hero_schedule_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_savosec_schedule_schedule_type" AS ENUM('talk', 'break', 'networking');
  CREATE TYPE "public"."enum__pages_v_blocks_savosec_sponsors_contact_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_savosec_sponsors_contact_link_appearance" AS ENUM('default', 'outline');
  ALTER TYPE "public"."enum_brand_theme" ADD VALUE 'savosec';
  CREATE TABLE "pages_blocks_savosec_about_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_savosec_about_features_icon"
  );
  
  CREATE TABLE "pages_blocks_savosec_about_features_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_savosec_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_savosec_about_locales" (
  	"subtitle" varchar DEFAULT '// Tietoa tapahtumasta',
  	"title" varchar DEFAULT 'Mitä on SavoSec?',
  	"description" varchar DEFAULT 'Tervetuloa KuoSec Ry:n järjestämään vuosittaiseen tietoturvatapahtumaan Savon pääkaupunkiin.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_savosec_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"register_link_type" "enum_pages_blocks_savosec_hero_register_link_type" DEFAULT 'reference',
  	"register_link_new_tab" boolean,
  	"register_link_appearance" "enum_pages_blocks_savosec_hero_register_link_appearance" DEFAULT 'default',
  	"schedule_link_type" "enum_pages_blocks_savosec_hero_schedule_link_type" DEFAULT 'reference',
  	"schedule_link_new_tab" boolean,
  	"schedule_link_appearance" "enum_pages_blocks_savosec_hero_schedule_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_savosec_hero_locales" (
  	"title" varchar DEFAULT 'SavoSec 2025',
  	"subtitle" varchar DEFAULT 'Kyberuhat ja varautuminen nyt',
  	"description" varchar DEFAULT 'Yrityksille ja tietoturva-alasta kiinnostuneille',
  	"date" varchar DEFAULT '8.5.2025',
  	"time" varchar DEFAULT 'Klo 17:00 - 21:00',
  	"location" varchar DEFAULT 'Kuopio, Novapolis CoWork',
  	"free_event_text" varchar DEFAULT 'Maksuton tapahtuma',
  	"register_link_url" varchar,
  	"register_link_label" varchar,
  	"schedule_link_url" varchar,
  	"schedule_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_savosec_schedule_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"time" varchar,
  	"type" "enum_pages_blocks_savosec_schedule_schedule_type" DEFAULT 'talk'
  );
  
  CREATE TABLE "pages_blocks_savosec_schedule_schedule_locales" (
  	"title" varchar,
  	"speaker" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_savosec_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_savosec_schedule_locales" (
  	"subtitle" varchar DEFAULT '// Ohjelma',
  	"title" varchar DEFAULT 'Päivän aikataulu',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_savosec_speakers_speakers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"initials" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_savosec_speakers_speakers_locales" (
  	"title" varchar,
  	"company" varchar,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_savosec_speakers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_savosec_speakers_locales" (
  	"subtitle" varchar DEFAULT '// Puhujat',
  	"title" varchar DEFAULT 'Asiantuntijat lavalla',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_savosec_sponsors_sponsors" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_savosec_sponsors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"contact_link_type" "enum_pages_blocks_savosec_sponsors_contact_link_type" DEFAULT 'reference',
  	"contact_link_new_tab" boolean,
  	"contact_link_appearance" "enum_pages_blocks_savosec_sponsors_contact_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_savosec_sponsors_locales" (
  	"subtitle" varchar DEFAULT '// Yhteistyökumppanit',
  	"title" varchar DEFAULT 'Tapahtuman mahdollistajat',
  	"background_title" varchar DEFAULT 'PARTNERS',
  	"become_sponsor_text" varchar DEFAULT 'Kiinnostunut yhteistyöstä?',
  	"contact_link_url" varchar,
  	"contact_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_savosec_about_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_savosec_about_features_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_savosec_about_features_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_savosec_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_savosec_about_locales" (
  	"subtitle" varchar DEFAULT '// Tietoa tapahtumasta',
  	"title" varchar DEFAULT 'Mitä on SavoSec?',
  	"description" varchar DEFAULT 'Tervetuloa KuoSec Ry:n järjestämään vuosittaiseen tietoturvatapahtumaan Savon pääkaupunkiin.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_savosec_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"register_link_type" "enum__pages_v_blocks_savosec_hero_register_link_type" DEFAULT 'reference',
  	"register_link_new_tab" boolean,
  	"register_link_appearance" "enum__pages_v_blocks_savosec_hero_register_link_appearance" DEFAULT 'default',
  	"schedule_link_type" "enum__pages_v_blocks_savosec_hero_schedule_link_type" DEFAULT 'reference',
  	"schedule_link_new_tab" boolean,
  	"schedule_link_appearance" "enum__pages_v_blocks_savosec_hero_schedule_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_savosec_hero_locales" (
  	"title" varchar DEFAULT 'SavoSec 2025',
  	"subtitle" varchar DEFAULT 'Kyberuhat ja varautuminen nyt',
  	"description" varchar DEFAULT 'Yrityksille ja tietoturva-alasta kiinnostuneille',
  	"date" varchar DEFAULT '8.5.2025',
  	"time" varchar DEFAULT 'Klo 17:00 - 21:00',
  	"location" varchar DEFAULT 'Kuopio, Novapolis CoWork',
  	"free_event_text" varchar DEFAULT 'Maksuton tapahtuma',
  	"register_link_url" varchar,
  	"register_link_label" varchar,
  	"schedule_link_url" varchar,
  	"schedule_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_savosec_schedule_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"time" varchar,
  	"type" "enum__pages_v_blocks_savosec_schedule_schedule_type" DEFAULT 'talk',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_savosec_schedule_schedule_locales" (
  	"title" varchar,
  	"speaker" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_savosec_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_savosec_schedule_locales" (
  	"subtitle" varchar DEFAULT '// Ohjelma',
  	"title" varchar DEFAULT 'Päivän aikataulu',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_savosec_speakers_speakers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"initials" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_savosec_speakers_speakers_locales" (
  	"title" varchar,
  	"company" varchar,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_savosec_speakers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_savosec_speakers_locales" (
  	"subtitle" varchar DEFAULT '// Puhujat',
  	"title" varchar DEFAULT 'Asiantuntijat lavalla',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_savosec_sponsors_sponsors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_savosec_sponsors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_link_type" "enum__pages_v_blocks_savosec_sponsors_contact_link_type" DEFAULT 'reference',
  	"contact_link_new_tab" boolean,
  	"contact_link_appearance" "enum__pages_v_blocks_savosec_sponsors_contact_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_savosec_sponsors_locales" (
  	"subtitle" varchar DEFAULT '// Yhteistyökumppanit',
  	"title" varchar DEFAULT 'Tapahtuman mahdollistajat',
  	"background_title" varchar DEFAULT 'PARTNERS',
  	"become_sponsor_text" varchar DEFAULT 'Kiinnostunut yhteistyöstä?',
  	"contact_link_url" varchar,
  	"contact_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_savosec_about_features" ADD CONSTRAINT "pages_blocks_savosec_about_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_savosec_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_savosec_about_features_locales" ADD CONSTRAINT "pages_blocks_savosec_about_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_savosec_about_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_savosec_about" ADD CONSTRAINT "pages_blocks_savosec_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_savosec_about_locales" ADD CONSTRAINT "pages_blocks_savosec_about_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_savosec_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_savosec_hero" ADD CONSTRAINT "pages_blocks_savosec_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_savosec_hero_locales" ADD CONSTRAINT "pages_blocks_savosec_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_savosec_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_savosec_schedule_schedule" ADD CONSTRAINT "pages_blocks_savosec_schedule_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_savosec_schedule"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_savosec_schedule_schedule_locales" ADD CONSTRAINT "pages_blocks_savosec_schedule_schedule_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_savosec_schedule_schedule"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_savosec_schedule" ADD CONSTRAINT "pages_blocks_savosec_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_savosec_schedule_locales" ADD CONSTRAINT "pages_blocks_savosec_schedule_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_savosec_schedule"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_savosec_speakers_speakers" ADD CONSTRAINT "pages_blocks_savosec_speakers_speakers_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_savosec_speakers_speakers" ADD CONSTRAINT "pages_blocks_savosec_speakers_speakers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_savosec_speakers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_savosec_speakers_speakers_locales" ADD CONSTRAINT "pages_blocks_savosec_speakers_speakers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_savosec_speakers_speakers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_savosec_speakers" ADD CONSTRAINT "pages_blocks_savosec_speakers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_savosec_speakers_locales" ADD CONSTRAINT "pages_blocks_savosec_speakers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_savosec_speakers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_savosec_sponsors_sponsors" ADD CONSTRAINT "pages_blocks_savosec_sponsors_sponsors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_savosec_sponsors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_savosec_sponsors" ADD CONSTRAINT "pages_blocks_savosec_sponsors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_savosec_sponsors_locales" ADD CONSTRAINT "pages_blocks_savosec_sponsors_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_savosec_sponsors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_savosec_about_features" ADD CONSTRAINT "_pages_v_blocks_savosec_about_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_savosec_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_savosec_about_features_locales" ADD CONSTRAINT "_pages_v_blocks_savosec_about_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_savosec_about_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_savosec_about" ADD CONSTRAINT "_pages_v_blocks_savosec_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_savosec_about_locales" ADD CONSTRAINT "_pages_v_blocks_savosec_about_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_savosec_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_savosec_hero" ADD CONSTRAINT "_pages_v_blocks_savosec_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_savosec_hero_locales" ADD CONSTRAINT "_pages_v_blocks_savosec_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_savosec_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_savosec_schedule_schedule" ADD CONSTRAINT "_pages_v_blocks_savosec_schedule_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_savosec_schedule"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_savosec_schedule_schedule_locales" ADD CONSTRAINT "_pages_v_blocks_savosec_schedule_schedule_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_savosec_schedule_schedule"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_savosec_schedule" ADD CONSTRAINT "_pages_v_blocks_savosec_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_savosec_schedule_locales" ADD CONSTRAINT "_pages_v_blocks_savosec_schedule_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_savosec_schedule"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_savosec_speakers_speakers" ADD CONSTRAINT "_pages_v_blocks_savosec_speakers_speakers_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_savosec_speakers_speakers" ADD CONSTRAINT "_pages_v_blocks_savosec_speakers_speakers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_savosec_speakers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_savosec_speakers_speakers_locales" ADD CONSTRAINT "_pages_v_blocks_savosec_speakers_speakers_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_savosec_speakers_speakers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_savosec_speakers" ADD CONSTRAINT "_pages_v_blocks_savosec_speakers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_savosec_speakers_locales" ADD CONSTRAINT "_pages_v_blocks_savosec_speakers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_savosec_speakers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_savosec_sponsors_sponsors" ADD CONSTRAINT "_pages_v_blocks_savosec_sponsors_sponsors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_savosec_sponsors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_savosec_sponsors" ADD CONSTRAINT "_pages_v_blocks_savosec_sponsors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_savosec_sponsors_locales" ADD CONSTRAINT "_pages_v_blocks_savosec_sponsors_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_savosec_sponsors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_savosec_about_features_order_idx" ON "pages_blocks_savosec_about_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_savosec_about_features_parent_id_idx" ON "pages_blocks_savosec_about_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_savosec_about_features_locales_locale_parent_id" ON "pages_blocks_savosec_about_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_savosec_about_order_idx" ON "pages_blocks_savosec_about" USING btree ("_order");
  CREATE INDEX "pages_blocks_savosec_about_parent_id_idx" ON "pages_blocks_savosec_about" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_savosec_about_path_idx" ON "pages_blocks_savosec_about" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_savosec_about_locales_locale_parent_id_unique" ON "pages_blocks_savosec_about_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_savosec_hero_order_idx" ON "pages_blocks_savosec_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_savosec_hero_parent_id_idx" ON "pages_blocks_savosec_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_savosec_hero_path_idx" ON "pages_blocks_savosec_hero" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_savosec_hero_locales_locale_parent_id_unique" ON "pages_blocks_savosec_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_savosec_schedule_schedule_order_idx" ON "pages_blocks_savosec_schedule_schedule" USING btree ("_order");
  CREATE INDEX "pages_blocks_savosec_schedule_schedule_parent_id_idx" ON "pages_blocks_savosec_schedule_schedule" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_savosec_schedule_schedule_locales_locale_parent" ON "pages_blocks_savosec_schedule_schedule_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_savosec_schedule_order_idx" ON "pages_blocks_savosec_schedule" USING btree ("_order");
  CREATE INDEX "pages_blocks_savosec_schedule_parent_id_idx" ON "pages_blocks_savosec_schedule" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_savosec_schedule_path_idx" ON "pages_blocks_savosec_schedule" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_savosec_schedule_locales_locale_parent_id_uniqu" ON "pages_blocks_savosec_schedule_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_savosec_speakers_speakers_order_idx" ON "pages_blocks_savosec_speakers_speakers" USING btree ("_order");
  CREATE INDEX "pages_blocks_savosec_speakers_speakers_parent_id_idx" ON "pages_blocks_savosec_speakers_speakers" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_savosec_speakers_speakers_image_idx" ON "pages_blocks_savosec_speakers_speakers" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_savosec_speakers_speakers_locales_locale_parent" ON "pages_blocks_savosec_speakers_speakers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_savosec_speakers_order_idx" ON "pages_blocks_savosec_speakers" USING btree ("_order");
  CREATE INDEX "pages_blocks_savosec_speakers_parent_id_idx" ON "pages_blocks_savosec_speakers" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_savosec_speakers_path_idx" ON "pages_blocks_savosec_speakers" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_savosec_speakers_locales_locale_parent_id_uniqu" ON "pages_blocks_savosec_speakers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_savosec_sponsors_sponsors_order_idx" ON "pages_blocks_savosec_sponsors_sponsors" USING btree ("_order");
  CREATE INDEX "pages_blocks_savosec_sponsors_sponsors_parent_id_idx" ON "pages_blocks_savosec_sponsors_sponsors" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_savosec_sponsors_order_idx" ON "pages_blocks_savosec_sponsors" USING btree ("_order");
  CREATE INDEX "pages_blocks_savosec_sponsors_parent_id_idx" ON "pages_blocks_savosec_sponsors" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_savosec_sponsors_path_idx" ON "pages_blocks_savosec_sponsors" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_savosec_sponsors_locales_locale_parent_id_uniqu" ON "pages_blocks_savosec_sponsors_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_savosec_about_features_order_idx" ON "_pages_v_blocks_savosec_about_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_savosec_about_features_parent_id_idx" ON "_pages_v_blocks_savosec_about_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_savosec_about_features_locales_locale_parent" ON "_pages_v_blocks_savosec_about_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_savosec_about_order_idx" ON "_pages_v_blocks_savosec_about" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_savosec_about_parent_id_idx" ON "_pages_v_blocks_savosec_about" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_savosec_about_path_idx" ON "_pages_v_blocks_savosec_about" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_savosec_about_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_savosec_about_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_savosec_hero_order_idx" ON "_pages_v_blocks_savosec_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_savosec_hero_parent_id_idx" ON "_pages_v_blocks_savosec_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_savosec_hero_path_idx" ON "_pages_v_blocks_savosec_hero" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_savosec_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_savosec_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_savosec_schedule_schedule_order_idx" ON "_pages_v_blocks_savosec_schedule_schedule" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_savosec_schedule_schedule_parent_id_idx" ON "_pages_v_blocks_savosec_schedule_schedule" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_savosec_schedule_schedule_locales_locale_par" ON "_pages_v_blocks_savosec_schedule_schedule_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_savosec_schedule_order_idx" ON "_pages_v_blocks_savosec_schedule" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_savosec_schedule_parent_id_idx" ON "_pages_v_blocks_savosec_schedule" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_savosec_schedule_path_idx" ON "_pages_v_blocks_savosec_schedule" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_savosec_schedule_locales_locale_parent_id_un" ON "_pages_v_blocks_savosec_schedule_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_savosec_speakers_speakers_order_idx" ON "_pages_v_blocks_savosec_speakers_speakers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_savosec_speakers_speakers_parent_id_idx" ON "_pages_v_blocks_savosec_speakers_speakers" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_savosec_speakers_speakers_image_idx" ON "_pages_v_blocks_savosec_speakers_speakers" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_savosec_speakers_speakers_locales_locale_par" ON "_pages_v_blocks_savosec_speakers_speakers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_savosec_speakers_order_idx" ON "_pages_v_blocks_savosec_speakers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_savosec_speakers_parent_id_idx" ON "_pages_v_blocks_savosec_speakers" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_savosec_speakers_path_idx" ON "_pages_v_blocks_savosec_speakers" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_savosec_speakers_locales_locale_parent_id_un" ON "_pages_v_blocks_savosec_speakers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_savosec_sponsors_sponsors_order_idx" ON "_pages_v_blocks_savosec_sponsors_sponsors" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_savosec_sponsors_sponsors_parent_id_idx" ON "_pages_v_blocks_savosec_sponsors_sponsors" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_savosec_sponsors_order_idx" ON "_pages_v_blocks_savosec_sponsors" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_savosec_sponsors_parent_id_idx" ON "_pages_v_blocks_savosec_sponsors" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_savosec_sponsors_path_idx" ON "_pages_v_blocks_savosec_sponsors" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_savosec_sponsors_locales_locale_parent_id_un" ON "_pages_v_blocks_savosec_sponsors_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_savosec_about_features" CASCADE;
  DROP TABLE "pages_blocks_savosec_about_features_locales" CASCADE;
  DROP TABLE "pages_blocks_savosec_about" CASCADE;
  DROP TABLE "pages_blocks_savosec_about_locales" CASCADE;
  DROP TABLE "pages_blocks_savosec_hero" CASCADE;
  DROP TABLE "pages_blocks_savosec_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_savosec_schedule_schedule" CASCADE;
  DROP TABLE "pages_blocks_savosec_schedule_schedule_locales" CASCADE;
  DROP TABLE "pages_blocks_savosec_schedule" CASCADE;
  DROP TABLE "pages_blocks_savosec_schedule_locales" CASCADE;
  DROP TABLE "pages_blocks_savosec_speakers_speakers" CASCADE;
  DROP TABLE "pages_blocks_savosec_speakers_speakers_locales" CASCADE;
  DROP TABLE "pages_blocks_savosec_speakers" CASCADE;
  DROP TABLE "pages_blocks_savosec_speakers_locales" CASCADE;
  DROP TABLE "pages_blocks_savosec_sponsors_sponsors" CASCADE;
  DROP TABLE "pages_blocks_savosec_sponsors" CASCADE;
  DROP TABLE "pages_blocks_savosec_sponsors_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_savosec_about_features" CASCADE;
  DROP TABLE "_pages_v_blocks_savosec_about_features_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_savosec_about" CASCADE;
  DROP TABLE "_pages_v_blocks_savosec_about_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_savosec_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_savosec_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_savosec_schedule_schedule" CASCADE;
  DROP TABLE "_pages_v_blocks_savosec_schedule_schedule_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_savosec_schedule" CASCADE;
  DROP TABLE "_pages_v_blocks_savosec_schedule_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_savosec_speakers_speakers" CASCADE;
  DROP TABLE "_pages_v_blocks_savosec_speakers_speakers_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_savosec_speakers" CASCADE;
  DROP TABLE "_pages_v_blocks_savosec_speakers_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_savosec_sponsors_sponsors" CASCADE;
  DROP TABLE "_pages_v_blocks_savosec_sponsors" CASCADE;
  DROP TABLE "_pages_v_blocks_savosec_sponsors_locales" CASCADE;
  ALTER TABLE "brand" ALTER COLUMN "theme" SET DATA TYPE text;
  ALTER TABLE "brand" ALTER COLUMN "theme" SET DEFAULT 'slate'::text;
  DROP TYPE "public"."enum_brand_theme";
  CREATE TYPE "public"."enum_brand_theme" AS ENUM('slate', 'ocean', 'forest', 'rose', 'amber', 'violet', 'kuosec');
  ALTER TABLE "brand" ALTER COLUMN "theme" SET DEFAULT 'slate'::"public"."enum_brand_theme";
  ALTER TABLE "brand" ALTER COLUMN "theme" SET DATA TYPE "public"."enum_brand_theme" USING "theme"::"public"."enum_brand_theme";
  DROP TYPE "public"."enum_pages_blocks_savosec_about_features_icon";
  DROP TYPE "public"."enum_pages_blocks_savosec_hero_register_link_type";
  DROP TYPE "public"."enum_pages_blocks_savosec_hero_register_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_savosec_hero_schedule_link_type";
  DROP TYPE "public"."enum_pages_blocks_savosec_hero_schedule_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_savosec_schedule_schedule_type";
  DROP TYPE "public"."enum_pages_blocks_savosec_sponsors_contact_link_type";
  DROP TYPE "public"."enum_pages_blocks_savosec_sponsors_contact_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_savosec_about_features_icon";
  DROP TYPE "public"."enum__pages_v_blocks_savosec_hero_register_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_savosec_hero_register_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_savosec_hero_schedule_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_savosec_hero_schedule_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_savosec_schedule_schedule_type";
  DROP TYPE "public"."enum__pages_v_blocks_savosec_sponsors_contact_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_savosec_sponsors_contact_link_appearance";`)
}
