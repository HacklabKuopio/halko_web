import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_about_section_features_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_section_links_locales" (
  	"label" varchar,
  	"value" varchar,
  	"href" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_events_section_schedule_locales" (
  	"time" varchar,
  	"event" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_events_section_locales" (
  	"subtitle" varchar DEFAULT '// EVENTS',
  	"title" varchar DEFAULT 'Upcoming Events',
  	"event_title" varchar DEFAULT 'KuoSec December Meetup',
  	"event_date" varchar DEFAULT '3.12.2025',
  	"event_time" varchar DEFAULT '18:00 - 02:00',
  	"event_location" varchar DEFAULT 'Teerenpeli, Kauppakatu 41, 70100 Kuopio',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_membership_section_membership_types_locales" (
  	"title" varchar,
  	"price" varchar,
  	"period" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_about_section_features_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact_section_links_locales" (
  	"label" varchar,
  	"value" varchar,
  	"href" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_events_section_schedule_locales" (
  	"time" varchar,
  	"event" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_events_section_locales" (
  	"subtitle" varchar DEFAULT '// EVENTS',
  	"title" varchar DEFAULT 'Upcoming Events',
  	"event_title" varchar DEFAULT 'KuoSec December Meetup',
  	"event_date" varchar DEFAULT '3.12.2025',
  	"event_time" varchar DEFAULT '18:00 - 02:00',
  	"event_location" varchar DEFAULT 'Teerenpeli, Kauppakatu 41, 70100 Kuopio',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_membership_section_membership_types_locales" (
  	"title" varchar,
  	"price" varchar,
  	"period" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_about_section_locales" ADD COLUMN "subtitle" varchar DEFAULT '// ABOUT US';
  ALTER TABLE "pages_blocks_about_section_locales" ADD COLUMN "title" varchar DEFAULT 'Who We Are';
  ALTER TABLE "pages_blocks_about_section_locales" ADD COLUMN "description" varchar DEFAULT 'KuoSec is an infosec community located at Kuopio, Finland. Our purpose is to organize meetups and get-togethers focused on training and networking.';
  ALTER TABLE "pages_blocks_about_section_locales" ADD COLUMN "cfp_title" varchar DEFAULT 'KuoSec Meetups - Call for Papers';
  ALTER TABLE "pages_blocks_about_section_locales" ADD COLUMN "cfp_description" varchar DEFAULT 'You can now apply as a speaker for the KuoSec meetups starting from September 2025 meetup!';
  ALTER TABLE "pages_blocks_contact_section_locales" ADD COLUMN "subtitle" varchar DEFAULT '// CONTACT';
  ALTER TABLE "pages_blocks_contact_section_locales" ADD COLUMN "title" varchar DEFAULT 'Get in Touch';
  ALTER TABLE "pages_blocks_contact_section_locales" ADD COLUMN "sponsors_subtitle" varchar DEFAULT '// SPONSORS';
  ALTER TABLE "pages_blocks_contact_section_locales" ADD COLUMN "sponsors_title" varchar DEFAULT 'Sponsors';
  ALTER TABLE "pages_blocks_contact_section_locales" ADD COLUMN "sponsors_text" varchar DEFAULT 'Interested in sponsoring our meetups? We''re always looking for partners who share our passion for cybersecurity.';
  ALTER TABLE "pages_blocks_hero_section_locales" ADD COLUMN "title" varchar DEFAULT 'KuoSec';
  ALTER TABLE "pages_blocks_hero_section_locales" ADD COLUMN "highlight" varchar DEFAULT 'ry';
  ALTER TABLE "pages_blocks_hero_section_locales" ADD COLUMN "subtitle" varchar DEFAULT 'Infosec Community';
  ALTER TABLE "pages_blocks_hero_section_locales" ADD COLUMN "tagline" varchar DEFAULT 'Kuopio''s premier cybersecurity community. Meetups, training, and networking for everyone interested in information security.';
  ALTER TABLE "pages_blocks_membership_section_locales" ADD COLUMN "subtitle" varchar DEFAULT '// MEMBERSHIP';
  ALTER TABLE "pages_blocks_membership_section_locales" ADD COLUMN "title" varchar DEFAULT 'Liity jäseneksi';
  ALTER TABLE "pages_blocks_membership_section_locales" ADD COLUMN "description" varchar DEFAULT 'KuoSec ry on tietoturvayhteisö Kuopiossa. Jäseneksi liittymällä tuet yhdistyksen toimintaa ja pääset osaksi aktiivista tietoturvayhteisöä.';
  ALTER TABLE "pages_blocks_membership_section_locales" ADD COLUMN "payment_recipient" varchar DEFAULT 'KuoSec ry';
  ALTER TABLE "pages_blocks_membership_section_locales" ADD COLUMN "payment_account" varchar DEFAULT 'FI51 7140 1420 0025 79';
  ALTER TABLE "pages_blocks_membership_section_locales" ADD COLUMN "payment_reference" varchar DEFAULT '4242';
  ALTER TABLE "pages_blocks_membership_section_locales" ADD COLUMN "payment_instruction" varchar DEFAULT 'Jäseneksi liitytään maksamalla jäsenmaksu yllä olevalle tilille. Muista käyttää viitettä maksaessasi!';
  ALTER TABLE "_pages_v_blocks_about_section_locales" ADD COLUMN "subtitle" varchar DEFAULT '// ABOUT US';
  ALTER TABLE "_pages_v_blocks_about_section_locales" ADD COLUMN "title" varchar DEFAULT 'Who We Are';
  ALTER TABLE "_pages_v_blocks_about_section_locales" ADD COLUMN "description" varchar DEFAULT 'KuoSec is an infosec community located at Kuopio, Finland. Our purpose is to organize meetups and get-togethers focused on training and networking.';
  ALTER TABLE "_pages_v_blocks_about_section_locales" ADD COLUMN "cfp_title" varchar DEFAULT 'KuoSec Meetups - Call for Papers';
  ALTER TABLE "_pages_v_blocks_about_section_locales" ADD COLUMN "cfp_description" varchar DEFAULT 'You can now apply as a speaker for the KuoSec meetups starting from September 2025 meetup!';
  ALTER TABLE "_pages_v_blocks_contact_section_locales" ADD COLUMN "subtitle" varchar DEFAULT '// CONTACT';
  ALTER TABLE "_pages_v_blocks_contact_section_locales" ADD COLUMN "title" varchar DEFAULT 'Get in Touch';
  ALTER TABLE "_pages_v_blocks_contact_section_locales" ADD COLUMN "sponsors_subtitle" varchar DEFAULT '// SPONSORS';
  ALTER TABLE "_pages_v_blocks_contact_section_locales" ADD COLUMN "sponsors_title" varchar DEFAULT 'Sponsors';
  ALTER TABLE "_pages_v_blocks_contact_section_locales" ADD COLUMN "sponsors_text" varchar DEFAULT 'Interested in sponsoring our meetups? We''re always looking for partners who share our passion for cybersecurity.';
  ALTER TABLE "_pages_v_blocks_hero_section_locales" ADD COLUMN "title" varchar DEFAULT 'KuoSec';
  ALTER TABLE "_pages_v_blocks_hero_section_locales" ADD COLUMN "highlight" varchar DEFAULT 'ry';
  ALTER TABLE "_pages_v_blocks_hero_section_locales" ADD COLUMN "subtitle" varchar DEFAULT 'Infosec Community';
  ALTER TABLE "_pages_v_blocks_hero_section_locales" ADD COLUMN "tagline" varchar DEFAULT 'Kuopio''s premier cybersecurity community. Meetups, training, and networking for everyone interested in information security.';
  ALTER TABLE "_pages_v_blocks_membership_section_locales" ADD COLUMN "subtitle" varchar DEFAULT '// MEMBERSHIP';
  ALTER TABLE "_pages_v_blocks_membership_section_locales" ADD COLUMN "title" varchar DEFAULT 'Liity jäseneksi';
  ALTER TABLE "_pages_v_blocks_membership_section_locales" ADD COLUMN "description" varchar DEFAULT 'KuoSec ry on tietoturvayhteisö Kuopiossa. Jäseneksi liittymällä tuet yhdistyksen toimintaa ja pääset osaksi aktiivista tietoturvayhteisöä.';
  ALTER TABLE "_pages_v_blocks_membership_section_locales" ADD COLUMN "payment_recipient" varchar DEFAULT 'KuoSec ry';
  ALTER TABLE "_pages_v_blocks_membership_section_locales" ADD COLUMN "payment_account" varchar DEFAULT 'FI51 7140 1420 0025 79';
  ALTER TABLE "_pages_v_blocks_membership_section_locales" ADD COLUMN "payment_reference" varchar DEFAULT '4242';
  ALTER TABLE "_pages_v_blocks_membership_section_locales" ADD COLUMN "payment_instruction" varchar DEFAULT 'Jäseneksi liitytään maksamalla jäsenmaksu yllä olevalle tilille. Muista käyttää viitettä maksaessasi!';
  ALTER TABLE "pages_blocks_about_section_features_locales" ADD CONSTRAINT "pages_blocks_about_section_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_section_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_section_links_locales" ADD CONSTRAINT "pages_blocks_contact_section_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_section_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_events_section_schedule_locales" ADD CONSTRAINT "pages_blocks_events_section_schedule_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_events_section_schedule"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_events_section_locales" ADD CONSTRAINT "pages_blocks_events_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_events_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_membership_section_membership_types_locales" ADD CONSTRAINT "pages_blocks_membership_section_membership_types_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_membership_section_membership_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_section_features_locales" ADD CONSTRAINT "_pages_v_blocks_about_section_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_section_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_section_links_locales" ADD CONSTRAINT "_pages_v_blocks_contact_section_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_section_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_events_section_schedule_locales" ADD CONSTRAINT "_pages_v_blocks_events_section_schedule_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_events_section_schedule"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_events_section_locales" ADD CONSTRAINT "_pages_v_blocks_events_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_events_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_membership_section_membership_types_locales" ADD CONSTRAINT "_pages_v_blocks_membership_section_membership_types_local_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_membership_section_membership_types"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "pages_blocks_about_section_features_locales_locale_parent_id" ON "pages_blocks_about_section_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_section_links_locales_locale_parent_id_" ON "pages_blocks_contact_section_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_events_section_schedule_locales_locale_parent_i" ON "pages_blocks_events_section_schedule_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_events_section_locales_locale_parent_id_unique" ON "pages_blocks_events_section_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_membership_section_membership_types_locales_loc" ON "pages_blocks_membership_section_membership_types_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_about_section_features_locales_locale_parent" ON "_pages_v_blocks_about_section_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_section_links_locales_locale_parent_" ON "_pages_v_blocks_contact_section_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_events_section_schedule_locales_locale_paren" ON "_pages_v_blocks_events_section_schedule_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_events_section_locales_locale_parent_id_uniq" ON "_pages_v_blocks_events_section_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_membership_section_membership_types_locales_" ON "_pages_v_blocks_membership_section_membership_types_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_about_section_features" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_about_section_features" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_about_section" DROP COLUMN "subtitle";
  ALTER TABLE "pages_blocks_about_section" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_about_section" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_about_section" DROP COLUMN "cfp_title";
  ALTER TABLE "pages_blocks_about_section" DROP COLUMN "cfp_description";
  ALTER TABLE "pages_blocks_contact_section_links" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_contact_section_links" DROP COLUMN "value";
  ALTER TABLE "pages_blocks_contact_section_links" DROP COLUMN "href";
  ALTER TABLE "pages_blocks_contact_section" DROP COLUMN "subtitle";
  ALTER TABLE "pages_blocks_contact_section" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_contact_section" DROP COLUMN "sponsors_subtitle";
  ALTER TABLE "pages_blocks_contact_section" DROP COLUMN "sponsors_title";
  ALTER TABLE "pages_blocks_contact_section" DROP COLUMN "sponsors_text";
  ALTER TABLE "pages_blocks_events_section_schedule" DROP COLUMN "time";
  ALTER TABLE "pages_blocks_events_section_schedule" DROP COLUMN "event";
  ALTER TABLE "pages_blocks_events_section" DROP COLUMN "subtitle";
  ALTER TABLE "pages_blocks_events_section" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_events_section" DROP COLUMN "event_title";
  ALTER TABLE "pages_blocks_events_section" DROP COLUMN "event_date";
  ALTER TABLE "pages_blocks_events_section" DROP COLUMN "event_time";
  ALTER TABLE "pages_blocks_events_section" DROP COLUMN "event_location";
  ALTER TABLE "pages_blocks_hero_section" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_hero_section" DROP COLUMN "highlight";
  ALTER TABLE "pages_blocks_hero_section" DROP COLUMN "subtitle";
  ALTER TABLE "pages_blocks_hero_section" DROP COLUMN "tagline";
  ALTER TABLE "pages_blocks_membership_section_membership_types" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_membership_section_membership_types" DROP COLUMN "price";
  ALTER TABLE "pages_blocks_membership_section_membership_types" DROP COLUMN "period";
  ALTER TABLE "pages_blocks_membership_section_membership_types" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_membership_section" DROP COLUMN "subtitle";
  ALTER TABLE "pages_blocks_membership_section" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_membership_section" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_membership_section" DROP COLUMN "payment_recipient";
  ALTER TABLE "pages_blocks_membership_section" DROP COLUMN "payment_account";
  ALTER TABLE "pages_blocks_membership_section" DROP COLUMN "payment_reference";
  ALTER TABLE "pages_blocks_membership_section" DROP COLUMN "payment_instruction";
  ALTER TABLE "_pages_v_blocks_about_section_features" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_about_section_features" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_about_section" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_about_section" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_about_section" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_about_section" DROP COLUMN "cfp_title";
  ALTER TABLE "_pages_v_blocks_about_section" DROP COLUMN "cfp_description";
  ALTER TABLE "_pages_v_blocks_contact_section_links" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_contact_section_links" DROP COLUMN "value";
  ALTER TABLE "_pages_v_blocks_contact_section_links" DROP COLUMN "href";
  ALTER TABLE "_pages_v_blocks_contact_section" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_contact_section" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_contact_section" DROP COLUMN "sponsors_subtitle";
  ALTER TABLE "_pages_v_blocks_contact_section" DROP COLUMN "sponsors_title";
  ALTER TABLE "_pages_v_blocks_contact_section" DROP COLUMN "sponsors_text";
  ALTER TABLE "_pages_v_blocks_events_section_schedule" DROP COLUMN "time";
  ALTER TABLE "_pages_v_blocks_events_section_schedule" DROP COLUMN "event";
  ALTER TABLE "_pages_v_blocks_events_section" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_events_section" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_events_section" DROP COLUMN "event_title";
  ALTER TABLE "_pages_v_blocks_events_section" DROP COLUMN "event_date";
  ALTER TABLE "_pages_v_blocks_events_section" DROP COLUMN "event_time";
  ALTER TABLE "_pages_v_blocks_events_section" DROP COLUMN "event_location";
  ALTER TABLE "_pages_v_blocks_hero_section" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_hero_section" DROP COLUMN "highlight";
  ALTER TABLE "_pages_v_blocks_hero_section" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_hero_section" DROP COLUMN "tagline";
  ALTER TABLE "_pages_v_blocks_membership_section_membership_types" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_membership_section_membership_types" DROP COLUMN "price";
  ALTER TABLE "_pages_v_blocks_membership_section_membership_types" DROP COLUMN "period";
  ALTER TABLE "_pages_v_blocks_membership_section_membership_types" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_membership_section" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_membership_section" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_membership_section" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_membership_section" DROP COLUMN "payment_recipient";
  ALTER TABLE "_pages_v_blocks_membership_section" DROP COLUMN "payment_account";
  ALTER TABLE "_pages_v_blocks_membership_section" DROP COLUMN "payment_reference";
  ALTER TABLE "_pages_v_blocks_membership_section" DROP COLUMN "payment_instruction";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_about_section_features_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_section_links_locales" CASCADE;
  DROP TABLE "pages_blocks_events_section_schedule_locales" CASCADE;
  DROP TABLE "pages_blocks_events_section_locales" CASCADE;
  DROP TABLE "pages_blocks_membership_section_membership_types_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_about_section_features_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_section_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_events_section_schedule_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_events_section_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_membership_section_membership_types_locales" CASCADE;
  ALTER TABLE "pages_blocks_about_section_features" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_about_section_features" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_about_section" ADD COLUMN "subtitle" varchar DEFAULT '// ABOUT US';
  ALTER TABLE "pages_blocks_about_section" ADD COLUMN "title" varchar DEFAULT 'Who We Are';
  ALTER TABLE "pages_blocks_about_section" ADD COLUMN "description" varchar DEFAULT 'KuoSec is an infosec community located at Kuopio, Finland. Our purpose is to organize meetups and get-togethers focused on training and networking.';
  ALTER TABLE "pages_blocks_about_section" ADD COLUMN "cfp_title" varchar DEFAULT 'KuoSec Meetups - Call for Papers';
  ALTER TABLE "pages_blocks_about_section" ADD COLUMN "cfp_description" varchar DEFAULT 'You can now apply as a speaker for the KuoSec meetups starting from September 2025 meetup!';
  ALTER TABLE "pages_blocks_contact_section_links" ADD COLUMN "label" varchar;
  ALTER TABLE "pages_blocks_contact_section_links" ADD COLUMN "value" varchar;
  ALTER TABLE "pages_blocks_contact_section_links" ADD COLUMN "href" varchar;
  ALTER TABLE "pages_blocks_contact_section" ADD COLUMN "subtitle" varchar DEFAULT '// CONTACT';
  ALTER TABLE "pages_blocks_contact_section" ADD COLUMN "title" varchar DEFAULT 'Get in Touch';
  ALTER TABLE "pages_blocks_contact_section" ADD COLUMN "sponsors_subtitle" varchar DEFAULT '// SPONSORS';
  ALTER TABLE "pages_blocks_contact_section" ADD COLUMN "sponsors_title" varchar DEFAULT 'Sponsors';
  ALTER TABLE "pages_blocks_contact_section" ADD COLUMN "sponsors_text" varchar DEFAULT 'Interested in sponsoring our meetups? We''re always looking for partners who share our passion for cybersecurity.';
  ALTER TABLE "pages_blocks_events_section_schedule" ADD COLUMN "time" varchar;
  ALTER TABLE "pages_blocks_events_section_schedule" ADD COLUMN "event" varchar;
  ALTER TABLE "pages_blocks_events_section" ADD COLUMN "subtitle" varchar DEFAULT '// EVENTS';
  ALTER TABLE "pages_blocks_events_section" ADD COLUMN "title" varchar DEFAULT 'Upcoming Events';
  ALTER TABLE "pages_blocks_events_section" ADD COLUMN "event_title" varchar DEFAULT 'KuoSec December Meetup';
  ALTER TABLE "pages_blocks_events_section" ADD COLUMN "event_date" varchar DEFAULT '3.12.2025';
  ALTER TABLE "pages_blocks_events_section" ADD COLUMN "event_time" varchar DEFAULT '18:00 - 02:00';
  ALTER TABLE "pages_blocks_events_section" ADD COLUMN "event_location" varchar DEFAULT 'Teerenpeli, Kauppakatu 41, 70100 Kuopio';
  ALTER TABLE "pages_blocks_hero_section" ADD COLUMN "title" varchar DEFAULT 'KuoSec';
  ALTER TABLE "pages_blocks_hero_section" ADD COLUMN "highlight" varchar DEFAULT 'ry';
  ALTER TABLE "pages_blocks_hero_section" ADD COLUMN "subtitle" varchar DEFAULT 'Infosec Community';
  ALTER TABLE "pages_blocks_hero_section" ADD COLUMN "tagline" varchar DEFAULT 'Kuopio''s premier cybersecurity community. Meetups, training, and networking for everyone interested in information security.';
  ALTER TABLE "pages_blocks_membership_section_membership_types" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_membership_section_membership_types" ADD COLUMN "price" varchar;
  ALTER TABLE "pages_blocks_membership_section_membership_types" ADD COLUMN "period" varchar;
  ALTER TABLE "pages_blocks_membership_section_membership_types" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_membership_section" ADD COLUMN "subtitle" varchar DEFAULT '// MEMBERSHIP';
  ALTER TABLE "pages_blocks_membership_section" ADD COLUMN "title" varchar DEFAULT 'Liity jäseneksi';
  ALTER TABLE "pages_blocks_membership_section" ADD COLUMN "description" varchar DEFAULT 'KuoSec ry on tietoturvayhteisö Kuopiossa. Jäseneksi liittymällä tuet yhdistyksen toimintaa ja pääset osaksi aktiivista tietoturvayhteisöä.';
  ALTER TABLE "pages_blocks_membership_section" ADD COLUMN "payment_recipient" varchar DEFAULT 'KuoSec ry';
  ALTER TABLE "pages_blocks_membership_section" ADD COLUMN "payment_account" varchar DEFAULT 'FI51 7140 1420 0025 79';
  ALTER TABLE "pages_blocks_membership_section" ADD COLUMN "payment_reference" varchar DEFAULT '4242';
  ALTER TABLE "pages_blocks_membership_section" ADD COLUMN "payment_instruction" varchar DEFAULT 'Jäseneksi liitytään maksamalla jäsenmaksu yllä olevalle tilille. Muista käyttää viitettä maksaessasi!';
  ALTER TABLE "_pages_v_blocks_about_section_features" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_about_section_features" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_about_section" ADD COLUMN "subtitle" varchar DEFAULT '// ABOUT US';
  ALTER TABLE "_pages_v_blocks_about_section" ADD COLUMN "title" varchar DEFAULT 'Who We Are';
  ALTER TABLE "_pages_v_blocks_about_section" ADD COLUMN "description" varchar DEFAULT 'KuoSec is an infosec community located at Kuopio, Finland. Our purpose is to organize meetups and get-togethers focused on training and networking.';
  ALTER TABLE "_pages_v_blocks_about_section" ADD COLUMN "cfp_title" varchar DEFAULT 'KuoSec Meetups - Call for Papers';
  ALTER TABLE "_pages_v_blocks_about_section" ADD COLUMN "cfp_description" varchar DEFAULT 'You can now apply as a speaker for the KuoSec meetups starting from September 2025 meetup!';
  ALTER TABLE "_pages_v_blocks_contact_section_links" ADD COLUMN "label" varchar;
  ALTER TABLE "_pages_v_blocks_contact_section_links" ADD COLUMN "value" varchar;
  ALTER TABLE "_pages_v_blocks_contact_section_links" ADD COLUMN "href" varchar;
  ALTER TABLE "_pages_v_blocks_contact_section" ADD COLUMN "subtitle" varchar DEFAULT '// CONTACT';
  ALTER TABLE "_pages_v_blocks_contact_section" ADD COLUMN "title" varchar DEFAULT 'Get in Touch';
  ALTER TABLE "_pages_v_blocks_contact_section" ADD COLUMN "sponsors_subtitle" varchar DEFAULT '// SPONSORS';
  ALTER TABLE "_pages_v_blocks_contact_section" ADD COLUMN "sponsors_title" varchar DEFAULT 'Sponsors';
  ALTER TABLE "_pages_v_blocks_contact_section" ADD COLUMN "sponsors_text" varchar DEFAULT 'Interested in sponsoring our meetups? We''re always looking for partners who share our passion for cybersecurity.';
  ALTER TABLE "_pages_v_blocks_events_section_schedule" ADD COLUMN "time" varchar;
  ALTER TABLE "_pages_v_blocks_events_section_schedule" ADD COLUMN "event" varchar;
  ALTER TABLE "_pages_v_blocks_events_section" ADD COLUMN "subtitle" varchar DEFAULT '// EVENTS';
  ALTER TABLE "_pages_v_blocks_events_section" ADD COLUMN "title" varchar DEFAULT 'Upcoming Events';
  ALTER TABLE "_pages_v_blocks_events_section" ADD COLUMN "event_title" varchar DEFAULT 'KuoSec December Meetup';
  ALTER TABLE "_pages_v_blocks_events_section" ADD COLUMN "event_date" varchar DEFAULT '3.12.2025';
  ALTER TABLE "_pages_v_blocks_events_section" ADD COLUMN "event_time" varchar DEFAULT '18:00 - 02:00';
  ALTER TABLE "_pages_v_blocks_events_section" ADD COLUMN "event_location" varchar DEFAULT 'Teerenpeli, Kauppakatu 41, 70100 Kuopio';
  ALTER TABLE "_pages_v_blocks_hero_section" ADD COLUMN "title" varchar DEFAULT 'KuoSec';
  ALTER TABLE "_pages_v_blocks_hero_section" ADD COLUMN "highlight" varchar DEFAULT 'ry';
  ALTER TABLE "_pages_v_blocks_hero_section" ADD COLUMN "subtitle" varchar DEFAULT 'Infosec Community';
  ALTER TABLE "_pages_v_blocks_hero_section" ADD COLUMN "tagline" varchar DEFAULT 'Kuopio''s premier cybersecurity community. Meetups, training, and networking for everyone interested in information security.';
  ALTER TABLE "_pages_v_blocks_membership_section_membership_types" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_membership_section_membership_types" ADD COLUMN "price" varchar;
  ALTER TABLE "_pages_v_blocks_membership_section_membership_types" ADD COLUMN "period" varchar;
  ALTER TABLE "_pages_v_blocks_membership_section_membership_types" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_membership_section" ADD COLUMN "subtitle" varchar DEFAULT '// MEMBERSHIP';
  ALTER TABLE "_pages_v_blocks_membership_section" ADD COLUMN "title" varchar DEFAULT 'Liity jäseneksi';
  ALTER TABLE "_pages_v_blocks_membership_section" ADD COLUMN "description" varchar DEFAULT 'KuoSec ry on tietoturvayhteisö Kuopiossa. Jäseneksi liittymällä tuet yhdistyksen toimintaa ja pääset osaksi aktiivista tietoturvayhteisöä.';
  ALTER TABLE "_pages_v_blocks_membership_section" ADD COLUMN "payment_recipient" varchar DEFAULT 'KuoSec ry';
  ALTER TABLE "_pages_v_blocks_membership_section" ADD COLUMN "payment_account" varchar DEFAULT 'FI51 7140 1420 0025 79';
  ALTER TABLE "_pages_v_blocks_membership_section" ADD COLUMN "payment_reference" varchar DEFAULT '4242';
  ALTER TABLE "_pages_v_blocks_membership_section" ADD COLUMN "payment_instruction" varchar DEFAULT 'Jäseneksi liitytään maksamalla jäsenmaksu yllä olevalle tilille. Muista käyttää viitettä maksaessasi!';
  ALTER TABLE "pages_blocks_about_section_locales" DROP COLUMN "subtitle";
  ALTER TABLE "pages_blocks_about_section_locales" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_about_section_locales" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_about_section_locales" DROP COLUMN "cfp_title";
  ALTER TABLE "pages_blocks_about_section_locales" DROP COLUMN "cfp_description";
  ALTER TABLE "pages_blocks_contact_section_locales" DROP COLUMN "subtitle";
  ALTER TABLE "pages_blocks_contact_section_locales" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_contact_section_locales" DROP COLUMN "sponsors_subtitle";
  ALTER TABLE "pages_blocks_contact_section_locales" DROP COLUMN "sponsors_title";
  ALTER TABLE "pages_blocks_contact_section_locales" DROP COLUMN "sponsors_text";
  ALTER TABLE "pages_blocks_hero_section_locales" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_hero_section_locales" DROP COLUMN "highlight";
  ALTER TABLE "pages_blocks_hero_section_locales" DROP COLUMN "subtitle";
  ALTER TABLE "pages_blocks_hero_section_locales" DROP COLUMN "tagline";
  ALTER TABLE "pages_blocks_membership_section_locales" DROP COLUMN "subtitle";
  ALTER TABLE "pages_blocks_membership_section_locales" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_membership_section_locales" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_membership_section_locales" DROP COLUMN "payment_recipient";
  ALTER TABLE "pages_blocks_membership_section_locales" DROP COLUMN "payment_account";
  ALTER TABLE "pages_blocks_membership_section_locales" DROP COLUMN "payment_reference";
  ALTER TABLE "pages_blocks_membership_section_locales" DROP COLUMN "payment_instruction";
  ALTER TABLE "_pages_v_blocks_about_section_locales" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_about_section_locales" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_about_section_locales" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_about_section_locales" DROP COLUMN "cfp_title";
  ALTER TABLE "_pages_v_blocks_about_section_locales" DROP COLUMN "cfp_description";
  ALTER TABLE "_pages_v_blocks_contact_section_locales" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_contact_section_locales" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_contact_section_locales" DROP COLUMN "sponsors_subtitle";
  ALTER TABLE "_pages_v_blocks_contact_section_locales" DROP COLUMN "sponsors_title";
  ALTER TABLE "_pages_v_blocks_contact_section_locales" DROP COLUMN "sponsors_text";
  ALTER TABLE "_pages_v_blocks_hero_section_locales" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_hero_section_locales" DROP COLUMN "highlight";
  ALTER TABLE "_pages_v_blocks_hero_section_locales" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_hero_section_locales" DROP COLUMN "tagline";
  ALTER TABLE "_pages_v_blocks_membership_section_locales" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_membership_section_locales" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_membership_section_locales" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_membership_section_locales" DROP COLUMN "payment_recipient";
  ALTER TABLE "_pages_v_blocks_membership_section_locales" DROP COLUMN "payment_account";
  ALTER TABLE "_pages_v_blocks_membership_section_locales" DROP COLUMN "payment_reference";
  ALTER TABLE "_pages_v_blocks_membership_section_locales" DROP COLUMN "payment_instruction";`)
}
