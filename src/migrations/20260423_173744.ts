import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_savosec_about_features" ADD COLUMN "url" varchar;
  ALTER TABLE "pages_blocks_savosec_speakers_speakers_locales" ADD COLUMN "rich_content" jsonb;
  ALTER TABLE "pages_blocks_savosec_sponsors_sponsors" ADD COLUMN "logo_id" integer;
  ALTER TABLE "_pages_v_blocks_savosec_about_features" ADD COLUMN "url" varchar;
  ALTER TABLE "_pages_v_blocks_savosec_speakers_speakers_locales" ADD COLUMN "rich_content" jsonb;
  ALTER TABLE "_pages_v_blocks_savosec_sponsors_sponsors" ADD COLUMN "logo_id" integer;
  ALTER TABLE "pages_blocks_savosec_sponsors_sponsors" ADD CONSTRAINT "pages_blocks_savosec_sponsors_sponsors_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_savosec_sponsors_sponsors" ADD CONSTRAINT "_pages_v_blocks_savosec_sponsors_sponsors_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_savosec_sponsors_sponsors_logo_idx" ON "pages_blocks_savosec_sponsors_sponsors" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_savosec_sponsors_sponsors_logo_idx" ON "_pages_v_blocks_savosec_sponsors_sponsors" USING btree ("logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_savosec_sponsors_sponsors" DROP CONSTRAINT "pages_blocks_savosec_sponsors_sponsors_logo_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_savosec_sponsors_sponsors" DROP CONSTRAINT "_pages_v_blocks_savosec_sponsors_sponsors_logo_id_media_id_fk";
  
  DROP INDEX "pages_blocks_savosec_sponsors_sponsors_logo_idx";
  DROP INDEX "_pages_v_blocks_savosec_sponsors_sponsors_logo_idx";
  ALTER TABLE "pages_blocks_savosec_about_features" DROP COLUMN "url";
  ALTER TABLE "pages_blocks_savosec_speakers_speakers_locales" DROP COLUMN "rich_content";
  ALTER TABLE "pages_blocks_savosec_sponsors_sponsors" DROP COLUMN "logo_id";
  ALTER TABLE "_pages_v_blocks_savosec_about_features" DROP COLUMN "url";
  ALTER TABLE "_pages_v_blocks_savosec_speakers_speakers_locales" DROP COLUMN "rich_content";
  ALTER TABLE "_pages_v_blocks_savosec_sponsors_sponsors" DROP COLUMN "logo_id";`)
}
