import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_events_section_source_mode" AS ENUM('inline', 'reusable');
  CREATE TYPE "public"."enum__pages_v_blocks_events_section_source_mode" AS ENUM('inline', 'reusable');
  CREATE TYPE "public"."enum_event_sections_all_events_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_event_sections_all_events_appearance" AS ENUM('default', 'outline');
  CREATE TABLE "event_sections_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "event_sections_schedule_locales" (
  	"time" varchar,
  	"event" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE "event_sections" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"all_events_type" "enum_event_sections_all_events_type" DEFAULT 'reference',
  	"all_events_new_tab" boolean,
  	"all_events_appearance" "enum_event_sections_all_events_appearance" DEFAULT 'default',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "event_sections_locales" (
  	"name" varchar NOT NULL,
  	"subtitle" varchar DEFAULT '// EVENTS',
  	"title" varchar DEFAULT 'Upcoming Events',
  	"event_title" varchar DEFAULT 'KuoSec December Meetup',
  	"event_date" varchar DEFAULT '3.12.2025',
  	"event_time" varchar DEFAULT '18:00 - 02:00',
  	"event_location" varchar DEFAULT 'Teerenpeli, Kauppakatu 41, 70100 Kuopio',
  	"all_events_url" varchar,
  	"all_events_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "event_sections_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"pages_id" integer,
  	"posts_id" integer
  );

  ALTER TABLE "pages_blocks_events_section" ADD COLUMN "source_mode" "enum_pages_blocks_events_section_source_mode" DEFAULT 'inline';
  ALTER TABLE "pages_blocks_events_section" ADD COLUMN "event_section_ref_id" integer;
  ALTER TABLE "_pages_v_blocks_events_section" ADD COLUMN "source_mode" "enum__pages_v_blocks_events_section_source_mode" DEFAULT 'inline';
  ALTER TABLE "_pages_v_blocks_events_section" ADD COLUMN "event_section_ref_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "event_sections_id" integer;
  ALTER TABLE "event_sections_schedule" ADD CONSTRAINT "event_sections_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."event_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "event_sections_schedule_locales" ADD CONSTRAINT "event_sections_schedule_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."event_sections_schedule"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "event_sections_locales" ADD CONSTRAINT "event_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."event_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "event_sections_rels" ADD CONSTRAINT "event_sections_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."event_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "event_sections_rels" ADD CONSTRAINT "event_sections_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "event_sections_rels" ADD CONSTRAINT "event_sections_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "event_sections_schedule_order_idx" ON "event_sections_schedule" USING btree ("_order");
  CREATE INDEX "event_sections_schedule_parent_id_idx" ON "event_sections_schedule" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "event_sections_schedule_locales_locale_parent_id_unique" ON "event_sections_schedule_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "event_sections_updated_at_idx" ON "event_sections" USING btree ("updated_at");
  CREATE INDEX "event_sections_created_at_idx" ON "event_sections" USING btree ("created_at");
  CREATE UNIQUE INDEX "event_sections_locales_locale_parent_id_unique" ON "event_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "event_sections_rels_order_idx" ON "event_sections_rels" USING btree ("order");
  CREATE INDEX "event_sections_rels_parent_idx" ON "event_sections_rels" USING btree ("parent_id");
  CREATE INDEX "event_sections_rels_path_idx" ON "event_sections_rels" USING btree ("path");
  CREATE INDEX "event_sections_rels_locale_idx" ON "event_sections_rels" USING btree ("locale");
  CREATE INDEX "event_sections_rels_pages_id_idx" ON "event_sections_rels" USING btree ("pages_id","locale");
  CREATE INDEX "event_sections_rels_posts_id_idx" ON "event_sections_rels" USING btree ("posts_id","locale");
  ALTER TABLE "pages_blocks_events_section" ADD CONSTRAINT "pages_blocks_events_section_event_section_ref_id_event_sections_id_fk" FOREIGN KEY ("event_section_ref_id") REFERENCES "public"."event_sections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_events_section" ADD CONSTRAINT "_pages_v_blocks_events_section_event_section_ref_id_event_sections_id_fk" FOREIGN KEY ("event_section_ref_id") REFERENCES "public"."event_sections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_event_sections_fk" FOREIGN KEY ("event_sections_id") REFERENCES "public"."event_sections"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_events_section_event_section_ref_idx" ON "pages_blocks_events_section" USING btree ("event_section_ref_id");
  CREATE INDEX "_pages_v_blocks_events_section_event_section_ref_idx" ON "_pages_v_blocks_events_section" USING btree ("event_section_ref_id");
  CREATE INDEX "payload_locked_documents_rels_event_sections_id_idx" ON "payload_locked_documents_rels" USING btree ("event_sections_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "event_sections_schedule" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "event_sections_schedule_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "event_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "event_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "event_sections_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "event_sections_schedule" CASCADE;
  DROP TABLE "event_sections_schedule_locales" CASCADE;
  DROP TABLE "event_sections" CASCADE;
  DROP TABLE "event_sections_locales" CASCADE;
  DROP TABLE "event_sections_rels" CASCADE;
  ALTER TABLE "pages_blocks_events_section" DROP CONSTRAINT "pages_blocks_events_section_event_section_ref_id_event_sections_id_fk";

  ALTER TABLE "_pages_v_blocks_events_section" DROP CONSTRAINT "_pages_v_blocks_events_section_event_section_ref_id_event_sections_id_fk";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_event_sections_fk";

  DROP INDEX "pages_blocks_events_section_event_section_ref_idx";
  DROP INDEX "_pages_v_blocks_events_section_event_section_ref_idx";
  DROP INDEX "payload_locked_documents_rels_event_sections_id_idx";
  ALTER TABLE "pages_blocks_events_section" DROP COLUMN "source_mode";
  ALTER TABLE "pages_blocks_events_section" DROP COLUMN "event_section_ref_id";
  ALTER TABLE "_pages_v_blocks_events_section" DROP COLUMN "source_mode";
  ALTER TABLE "_pages_v_blocks_events_section" DROP COLUMN "event_section_ref_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "event_sections_id";
  DROP TYPE "public"."enum_pages_blocks_events_section_source_mode";
  DROP TYPE "public"."enum__pages_v_blocks_events_section_source_mode";
  DROP TYPE "public"."enum_event_sections_all_events_type";
  DROP TYPE "public"."enum_event_sections_all_events_appearance";`)
}
