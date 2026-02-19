import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "brand" ADD COLUMN "publisher" varchar;
  ALTER TABLE "brand" ADD COLUMN "default_keywords" varchar;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "brand" DROP COLUMN "publisher";
  ALTER TABLE "brand" DROP COLUMN "default_keywords";`)
}
