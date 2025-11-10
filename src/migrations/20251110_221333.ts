import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sponsors_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sponsors_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "sponsors_locales" CASCADE;
  DROP TABLE "_sponsors_v_locales" CASCADE;
  DROP INDEX "sponsors_slug_idx";
  DROP INDEX "_sponsors_v_version_version_slug_idx";
  ALTER TABLE "pages_blocks_sponsors_locales" ALTER COLUMN "intro_content" SET DEFAULT '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"paragraph","format":"","indent":0,"version":1,"direction":null,"children":[{"type":"text","text":"","format":"","detail":0,"mode":"normal","style":"","version":1}]}],"direction":null}}'::jsonb;
  ALTER TABLE "_pages_v_blocks_sponsors_locales" ALTER COLUMN "intro_content" SET DEFAULT '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"paragraph","format":"","indent":0,"version":1,"direction":null,"children":[{"type":"text","text":"","format":"","detail":0,"mode":"normal","style":"","version":1}]}],"direction":null}}'::jsonb;
  ALTER TABLE "sponsors" ALTER COLUMN "about" SET DEFAULT '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"paragraph","format":"","indent":0,"version":1,"direction":null,"children":[{"type":"text","text":"","format":"","detail":0,"mode":"normal","style":"","version":1}]}],"direction":null}}'::jsonb;
  ALTER TABLE "_sponsors_v" ALTER COLUMN "version_about" SET DEFAULT '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"paragraph","format":"","indent":0,"version":1,"direction":null,"children":[{"type":"text","text":"","format":"","detail":0,"mode":"normal","style":"","version":1}]}],"direction":null}}'::jsonb;
  ALTER TABLE "sponsors" DROP COLUMN "slug";
  ALTER TABLE "sponsors" DROP COLUMN "slug_lock";
  ALTER TABLE "_sponsors_v" DROP COLUMN "version_slug";
  ALTER TABLE "_sponsors_v" DROP COLUMN "version_slug_lock";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "sponsors_locales" (
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_sponsors_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  ALTER TABLE "pages_blocks_sponsors_locales" ALTER COLUMN "intro_content" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_sponsors_locales" ALTER COLUMN "intro_content" DROP DEFAULT;
  ALTER TABLE "sponsors" ALTER COLUMN "about" DROP DEFAULT;
  ALTER TABLE "_sponsors_v" ALTER COLUMN "version_about" DROP DEFAULT;
  ALTER TABLE "sponsors" ADD COLUMN "slug" varchar;
  ALTER TABLE "sponsors" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "_sponsors_v" ADD COLUMN "version_slug" varchar;
  ALTER TABLE "_sponsors_v" ADD COLUMN "version_slug_lock" boolean DEFAULT true;
  ALTER TABLE "sponsors_locales" ADD CONSTRAINT "sponsors_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sponsors_locales" ADD CONSTRAINT "sponsors_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sponsors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sponsors_v_locales" ADD CONSTRAINT "_sponsors_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sponsors_v_locales" ADD CONSTRAINT "_sponsors_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sponsors_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "sponsors_meta_meta_image_idx" ON "sponsors_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "sponsors_locales_locale_parent_id_unique" ON "sponsors_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sponsors_v_version_meta_version_meta_image_idx" ON "_sponsors_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_sponsors_v_locales_locale_parent_id_unique" ON "_sponsors_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sponsors_slug_idx" ON "sponsors" USING btree ("slug");
  CREATE INDEX "_sponsors_v_version_version_slug_idx" ON "_sponsors_v" USING btree ("version_slug");`)
}
