import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_brand_theme" ADD VALUE 'hacklab';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "brand" ALTER COLUMN "theme" SET DATA TYPE text;
  ALTER TABLE "brand" ALTER COLUMN "theme" SET DEFAULT 'slate'::text;
  DROP TYPE "public"."enum_brand_theme";
  CREATE TYPE "public"."enum_brand_theme" AS ENUM('slate', 'ocean', 'forest', 'rose', 'amber', 'violet', 'kuosec', 'savosec');
  ALTER TABLE "brand" ALTER COLUMN "theme" SET DEFAULT 'slate'::"public"."enum_brand_theme";
  ALTER TABLE "brand" ALTER COLUMN "theme" SET DATA TYPE "public"."enum_brand_theme" USING "theme"::"public"."enum_brand_theme";`)
}
