import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_membership_section" DROP COLUMN "info_link_type";
  ALTER TABLE "pages_blocks_membership_section" DROP COLUMN "info_link_new_tab";
  ALTER TABLE "pages_blocks_membership_section" DROP COLUMN "info_link_appearance";
  ALTER TABLE "pages_blocks_membership_section_locales" DROP COLUMN "info_link_url";
  ALTER TABLE "pages_blocks_membership_section_locales" DROP COLUMN "info_link_label";
  ALTER TABLE "_pages_v_blocks_membership_section" DROP COLUMN "info_link_type";
  ALTER TABLE "_pages_v_blocks_membership_section" DROP COLUMN "info_link_new_tab";
  ALTER TABLE "_pages_v_blocks_membership_section" DROP COLUMN "info_link_appearance";
  ALTER TABLE "_pages_v_blocks_membership_section_locales" DROP COLUMN "info_link_url";
  ALTER TABLE "_pages_v_blocks_membership_section_locales" DROP COLUMN "info_link_label";
  DROP TYPE "public"."enum_pages_blocks_membership_section_info_link_type";
  DROP TYPE "public"."enum_pages_blocks_membership_section_info_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_membership_section_info_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_membership_section_info_link_appearance";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_membership_section_info_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_membership_section_info_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_membership_section_info_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_membership_section_info_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "pages_blocks_membership_section" ADD COLUMN "info_link_type" "enum_pages_blocks_membership_section_info_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_membership_section" ADD COLUMN "info_link_new_tab" boolean;
  ALTER TABLE "pages_blocks_membership_section" ADD COLUMN "info_link_appearance" "enum_pages_blocks_membership_section_info_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_membership_section_locales" ADD COLUMN "info_link_url" varchar;
  ALTER TABLE "pages_blocks_membership_section_locales" ADD COLUMN "info_link_label" varchar;
  ALTER TABLE "_pages_v_blocks_membership_section" ADD COLUMN "info_link_type" "enum__pages_v_blocks_membership_section_info_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_membership_section" ADD COLUMN "info_link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_membership_section" ADD COLUMN "info_link_appearance" "enum__pages_v_blocks_membership_section_info_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_membership_section_locales" ADD COLUMN "info_link_url" varchar;
  ALTER TABLE "_pages_v_blocks_membership_section_locales" ADD COLUMN "info_link_label" varchar;`)
}
