import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_events_section_all_events_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_events_section_all_events_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_events_section_all_events_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_events_section_all_events_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "pages_blocks_events_section" ADD COLUMN "all_events_type" "enum_pages_blocks_events_section_all_events_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_events_section" ADD COLUMN "all_events_new_tab" boolean;
  ALTER TABLE "pages_blocks_events_section" ADD COLUMN "all_events_appearance" "enum_pages_blocks_events_section_all_events_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_events_section_locales" ADD COLUMN "all_events_url" varchar;
  ALTER TABLE "pages_blocks_events_section_locales" ADD COLUMN "all_events_label" varchar;
  ALTER TABLE "_pages_v_blocks_events_section" ADD COLUMN "all_events_type" "enum__pages_v_blocks_events_section_all_events_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_events_section" ADD COLUMN "all_events_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_events_section" ADD COLUMN "all_events_appearance" "enum__pages_v_blocks_events_section_all_events_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_events_section_locales" ADD COLUMN "all_events_url" varchar;
  ALTER TABLE "_pages_v_blocks_events_section_locales" ADD COLUMN "all_events_label" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_events_section" DROP COLUMN "all_events_type";
  ALTER TABLE "pages_blocks_events_section" DROP COLUMN "all_events_new_tab";
  ALTER TABLE "pages_blocks_events_section" DROP COLUMN "all_events_appearance";
  ALTER TABLE "pages_blocks_events_section_locales" DROP COLUMN "all_events_url";
  ALTER TABLE "pages_blocks_events_section_locales" DROP COLUMN "all_events_label";
  ALTER TABLE "_pages_v_blocks_events_section" DROP COLUMN "all_events_type";
  ALTER TABLE "_pages_v_blocks_events_section" DROP COLUMN "all_events_new_tab";
  ALTER TABLE "_pages_v_blocks_events_section" DROP COLUMN "all_events_appearance";
  ALTER TABLE "_pages_v_blocks_events_section_locales" DROP COLUMN "all_events_url";
  ALTER TABLE "_pages_v_blocks_events_section_locales" DROP COLUMN "all_events_label";
  DROP TYPE "public"."enum_pages_blocks_events_section_all_events_type";
  DROP TYPE "public"."enum_pages_blocks_events_section_all_events_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_events_section_all_events_type";
  DROP TYPE "public"."enum__pages_v_blocks_events_section_all_events_appearance";`)
}
