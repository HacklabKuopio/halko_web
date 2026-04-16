import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_published_locale" AS ENUM('en', 'fi');
  ALTER TABLE "pages_blocks_events_section" ALTER COLUMN "source_mode" DROP DEFAULT;
  ALTER TABLE "pages_blocks_events_section" ALTER COLUMN "source_mode" SET DATA TYPE text USING "source_mode"::text;
  DROP TYPE "public"."enum_pages_blocks_events_section_source_mode";
  CREATE TYPE "public"."enum_pages_blocks_events_section_source_mode" AS ENUM('collection', 'inline', 'reusable');
  ALTER TABLE "pages_blocks_events_section" ALTER COLUMN "source_mode" SET DATA TYPE "public"."enum_pages_blocks_events_section_source_mode" USING "source_mode"::"public"."enum_pages_blocks_events_section_source_mode";
  ALTER TABLE "_pages_v_blocks_events_section" ALTER COLUMN "source_mode" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_events_section" ALTER COLUMN "source_mode" SET DATA TYPE text USING "source_mode"::text;
  DROP TYPE "public"."enum__pages_v_blocks_events_section_source_mode";
  CREATE TYPE "public"."enum__pages_v_blocks_events_section_source_mode" AS ENUM('collection', 'inline', 'reusable');
  ALTER TABLE "_pages_v_blocks_events_section" ALTER COLUMN "source_mode" SET DATA TYPE "public"."enum__pages_v_blocks_events_section_source_mode" USING "source_mode"::"public"."enum__pages_v_blocks_events_section_source_mode";
  CREATE TABLE "events_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "events_schedule_locales" (
  	"time" varchar,
  	"event" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_events_status" DEFAULT 'draft'
  );

  CREATE TABLE "events_locales" (
  	"title" varchar,
  	"time" varchar,
  	"location" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_events_v_version_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );

  CREATE TABLE "_events_v_version_schedule_locales" (
  	"time" varchar,
  	"event" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_date" timestamp(3) with time zone,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__events_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );

  CREATE TABLE "_events_v_locales" (
  	"version_title" varchar,
  	"version_time" varchar,
  	"version_location" varchar,
  	"version_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  ALTER TABLE "pages_blocks_events_section" ALTER COLUMN "source_mode" SET DEFAULT 'collection';
  ALTER TABLE "_pages_v_blocks_events_section" ALTER COLUMN "source_mode" SET DEFAULT 'collection';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "events_schedule" ADD CONSTRAINT "events_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_schedule_locales" ADD CONSTRAINT "events_schedule_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_schedule"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_version_schedule" ADD CONSTRAINT "_events_v_version_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_version_schedule_locales" ADD CONSTRAINT "_events_v_version_schedule_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v_version_schedule"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_locales" ADD CONSTRAINT "_events_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "events_schedule_order_idx" ON "events_schedule" USING btree ("_order");
  CREATE INDEX "events_schedule_parent_id_idx" ON "events_schedule" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "events_schedule_locales_locale_parent_id_unique" ON "events_schedule_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE UNIQUE INDEX "events_locales_locale_parent_id_unique" ON "events_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_events_v_version_schedule_order_idx" ON "_events_v_version_schedule" USING btree ("_order");
  CREATE INDEX "_events_v_version_schedule_parent_id_idx" ON "_events_v_version_schedule" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_events_v_version_schedule_locales_locale_parent_id_unique" ON "_events_v_version_schedule_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_snapshot_idx" ON "_events_v" USING btree ("snapshot");
  CREATE INDEX "_events_v_published_locale_idx" ON "_events_v" USING btree ("published_locale");
  CREATE INDEX "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE INDEX "_events_v_autosave_idx" ON "_events_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_events_v_locales_locale_parent_id_unique" ON "_events_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events_schedule" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_schedule_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_version_schedule" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_version_schedule_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "events_schedule" CASCADE;
  DROP TABLE "events_schedule_locales" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_locales" CASCADE;
  DROP TABLE "_events_v_version_schedule" CASCADE;
  DROP TABLE "_events_v_version_schedule_locales" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP TABLE "_events_v_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_events_fk";

  ALTER TABLE "pages_blocks_events_section" ALTER COLUMN "source_mode" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_events_section" ALTER COLUMN "source_mode" SET DEFAULT 'inline'::text;
  DROP TYPE "public"."enum_pages_blocks_events_section_source_mode";
  CREATE TYPE "public"."enum_pages_blocks_events_section_source_mode" AS ENUM('inline', 'reusable');
  ALTER TABLE "pages_blocks_events_section" ALTER COLUMN "source_mode" SET DEFAULT 'inline'::"public"."enum_pages_blocks_events_section_source_mode";
  ALTER TABLE "pages_blocks_events_section" ALTER COLUMN "source_mode" SET DATA TYPE "public"."enum_pages_blocks_events_section_source_mode" USING "source_mode"::"public"."enum_pages_blocks_events_section_source_mode";
  ALTER TABLE "_pages_v_blocks_events_section" ALTER COLUMN "source_mode" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_events_section" ALTER COLUMN "source_mode" SET DEFAULT 'inline'::text;
  DROP TYPE "public"."enum__pages_v_blocks_events_section_source_mode";
  CREATE TYPE "public"."enum__pages_v_blocks_events_section_source_mode" AS ENUM('inline', 'reusable');
  ALTER TABLE "_pages_v_blocks_events_section" ALTER COLUMN "source_mode" SET DEFAULT 'inline'::"public"."enum__pages_v_blocks_events_section_source_mode";
  ALTER TABLE "_pages_v_blocks_events_section" ALTER COLUMN "source_mode" SET DATA TYPE "public"."enum__pages_v_blocks_events_section_source_mode" USING "source_mode"::"public"."enum__pages_v_blocks_events_section_source_mode";
  DROP INDEX "payload_locked_documents_rels_events_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "events_id";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum__events_v_version_status";
  DROP TYPE "public"."enum__events_v_published_locale";`)
}
