import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_about_section_features_icon" AS ENUM('Shield', 'Users', 'Calendar', 'Terminal');
  CREATE TYPE "public"."enum_pages_blocks_about_section_cfp_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_about_section_cfp_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_contact_section_links_icon" AS ENUM('MessageSquare', 'Mail', 'Linkedin');
  CREATE TYPE "public"."enum_pages_blocks_contact_section_sponsor_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_contact_section_sponsor_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_hero_section_primary_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_section_primary_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_hero_section_contact_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_section_contact_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_membership_section_join_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_membership_section_join_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_membership_section_info_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_membership_section_info_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_background_component" AS ENUM('none', 'grid');
  CREATE TYPE "public"."enum__pages_v_blocks_about_section_features_icon" AS ENUM('Shield', 'Users', 'Calendar', 'Terminal');
  CREATE TYPE "public"."enum__pages_v_blocks_about_section_cfp_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_about_section_cfp_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_section_links_icon" AS ENUM('MessageSquare', 'Mail', 'Linkedin');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_section_sponsor_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_section_sponsor_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_section_primary_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_section_primary_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_section_contact_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_section_contact_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_membership_section_join_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_membership_section_join_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_membership_section_info_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_membership_section_info_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_version_background_component" AS ENUM('none', 'grid');
  ALTER TYPE "public"."enum_brand_theme" ADD VALUE 'kuosec';
  CREATE TABLE "pages_blocks_about_section_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_about_section_features_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_about_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT '// ABOUT US',
  	"title" varchar DEFAULT 'Who We Are',
  	"description" varchar DEFAULT 'KuoSec is an infosec community located at Kuopio, Finland. Our purpose is to organize meetups and get-togethers focused on training and networking.',
  	"cfp_title" varchar DEFAULT 'KuoSec Meetups - Call for Papers',
  	"cfp_description" varchar DEFAULT 'You can now apply as a speaker for the KuoSec meetups starting from September 2025 meetup!',
  	"cfp_link_type" "enum_pages_blocks_about_section_cfp_link_type" DEFAULT 'reference',
  	"cfp_link_new_tab" boolean,
  	"cfp_link_appearance" "enum_pages_blocks_about_section_cfp_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_section_locales" (
  	"cfp_link_url" varchar,
  	"cfp_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_section_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_contact_section_links_icon",
  	"label" varchar,
  	"value" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT '// CONTACT',
  	"title" varchar DEFAULT 'Get in Touch',
  	"sponsors_subtitle" varchar DEFAULT '// SPONSORS',
  	"sponsors_title" varchar DEFAULT 'Sponsors',
  	"sponsors_text" varchar DEFAULT 'Interested in sponsoring our meetups? We''re always looking for partners who share our passion for cybersecurity.',
  	"sponsor_link_type" "enum_pages_blocks_contact_section_sponsor_link_type" DEFAULT 'reference',
  	"sponsor_link_new_tab" boolean,
  	"sponsor_link_appearance" "enum_pages_blocks_contact_section_sponsor_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_section_locales" (
  	"sponsor_link_url" varchar,
  	"sponsor_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_events_section_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"time" varchar,
  	"event" varchar
  );
  
  CREATE TABLE "pages_blocks_events_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT '// EVENTS',
  	"title" varchar DEFAULT 'Upcoming Events',
  	"event_title" varchar DEFAULT 'KuoSec December Meetup',
  	"event_date" varchar DEFAULT '3.12.2025',
  	"event_time" varchar DEFAULT '18:00 - 02:00',
  	"event_location" varchar DEFAULT 'Teerenpeli, Kauppakatu 41, 70100 Kuopio',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'KuoSec',
  	"highlight" varchar DEFAULT 'ry',
  	"subtitle" varchar DEFAULT 'Infosec Community',
  	"tagline" varchar DEFAULT 'Kuopio''s premier cybersecurity community. Meetups, training, and networking for everyone interested in information security.',
  	"logo_id" integer,
  	"primary_link_type" "enum_pages_blocks_hero_section_primary_link_type" DEFAULT 'reference',
  	"primary_link_new_tab" boolean,
  	"primary_link_appearance" "enum_pages_blocks_hero_section_primary_link_appearance" DEFAULT 'default',
  	"contact_link_type" "enum_pages_blocks_hero_section_contact_link_type" DEFAULT 'reference',
  	"contact_link_new_tab" boolean,
  	"contact_link_appearance" "enum_pages_blocks_hero_section_contact_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_section_locales" (
  	"primary_link_url" varchar,
  	"primary_link_label" varchar,
  	"contact_link_url" varchar,
  	"contact_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_membership_section_membership_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"price" varchar,
  	"period" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_membership_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT '// MEMBERSHIP',
  	"title" varchar DEFAULT 'Liity jäseneksi',
  	"description" varchar DEFAULT 'KuoSec ry on tietoturvayhteisö Kuopiossa. Jäseneksi liittymällä tuet yhdistyksen toimintaa ja pääset osaksi aktiivista tietoturvayhteisöä.',
  	"payment_recipient" varchar DEFAULT 'KuoSec ry',
  	"payment_account" varchar DEFAULT 'FI51 7140 1420 0025 79',
  	"payment_reference" varchar DEFAULT '4242',
  	"payment_instruction" varchar DEFAULT 'Jäseneksi liitytään maksamalla jäsenmaksu yllä olevalle tilille. Muista käyttää viitettä maksaessasi!',
  	"join_link_type" "enum_pages_blocks_membership_section_join_link_type" DEFAULT 'reference',
  	"join_link_new_tab" boolean,
  	"join_link_appearance" "enum_pages_blocks_membership_section_join_link_appearance" DEFAULT 'default',
  	"info_link_type" "enum_pages_blocks_membership_section_info_link_type" DEFAULT 'reference',
  	"info_link_new_tab" boolean,
  	"info_link_appearance" "enum_pages_blocks_membership_section_info_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_membership_section_locales" (
  	"join_link_url" varchar,
  	"join_link_label" varchar,
  	"info_link_url" varchar,
  	"info_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_about_section_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_about_section_features_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT '// ABOUT US',
  	"title" varchar DEFAULT 'Who We Are',
  	"description" varchar DEFAULT 'KuoSec is an infosec community located at Kuopio, Finland. Our purpose is to organize meetups and get-togethers focused on training and networking.',
  	"cfp_title" varchar DEFAULT 'KuoSec Meetups - Call for Papers',
  	"cfp_description" varchar DEFAULT 'You can now apply as a speaker for the KuoSec meetups starting from September 2025 meetup!',
  	"cfp_link_type" "enum__pages_v_blocks_about_section_cfp_link_type" DEFAULT 'reference',
  	"cfp_link_new_tab" boolean,
  	"cfp_link_appearance" "enum__pages_v_blocks_about_section_cfp_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_section_locales" (
  	"cfp_link_url" varchar,
  	"cfp_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact_section_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_contact_section_links_icon",
  	"label" varchar,
  	"value" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT '// CONTACT',
  	"title" varchar DEFAULT 'Get in Touch',
  	"sponsors_subtitle" varchar DEFAULT '// SPONSORS',
  	"sponsors_title" varchar DEFAULT 'Sponsors',
  	"sponsors_text" varchar DEFAULT 'Interested in sponsoring our meetups? We''re always looking for partners who share our passion for cybersecurity.',
  	"sponsor_link_type" "enum__pages_v_blocks_contact_section_sponsor_link_type" DEFAULT 'reference',
  	"sponsor_link_new_tab" boolean,
  	"sponsor_link_appearance" "enum__pages_v_blocks_contact_section_sponsor_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_section_locales" (
  	"sponsor_link_url" varchar,
  	"sponsor_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_events_section_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"time" varchar,
  	"event" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_events_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT '// EVENTS',
  	"title" varchar DEFAULT 'Upcoming Events',
  	"event_title" varchar DEFAULT 'KuoSec December Meetup',
  	"event_date" varchar DEFAULT '3.12.2025',
  	"event_time" varchar DEFAULT '18:00 - 02:00',
  	"event_location" varchar DEFAULT 'Teerenpeli, Kauppakatu 41, 70100 Kuopio',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'KuoSec',
  	"highlight" varchar DEFAULT 'ry',
  	"subtitle" varchar DEFAULT 'Infosec Community',
  	"tagline" varchar DEFAULT 'Kuopio''s premier cybersecurity community. Meetups, training, and networking for everyone interested in information security.',
  	"logo_id" integer,
  	"primary_link_type" "enum__pages_v_blocks_hero_section_primary_link_type" DEFAULT 'reference',
  	"primary_link_new_tab" boolean,
  	"primary_link_appearance" "enum__pages_v_blocks_hero_section_primary_link_appearance" DEFAULT 'default',
  	"contact_link_type" "enum__pages_v_blocks_hero_section_contact_link_type" DEFAULT 'reference',
  	"contact_link_new_tab" boolean,
  	"contact_link_appearance" "enum__pages_v_blocks_hero_section_contact_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_section_locales" (
  	"primary_link_url" varchar,
  	"primary_link_label" varchar,
  	"contact_link_url" varchar,
  	"contact_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_membership_section_membership_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"price" varchar,
  	"period" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_membership_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar DEFAULT '// MEMBERSHIP',
  	"title" varchar DEFAULT 'Liity jäseneksi',
  	"description" varchar DEFAULT 'KuoSec ry on tietoturvayhteisö Kuopiossa. Jäseneksi liittymällä tuet yhdistyksen toimintaa ja pääset osaksi aktiivista tietoturvayhteisöä.',
  	"payment_recipient" varchar DEFAULT 'KuoSec ry',
  	"payment_account" varchar DEFAULT 'FI51 7140 1420 0025 79',
  	"payment_reference" varchar DEFAULT '4242',
  	"payment_instruction" varchar DEFAULT 'Jäseneksi liitytään maksamalla jäsenmaksu yllä olevalle tilille. Muista käyttää viitettä maksaessasi!',
  	"join_link_type" "enum__pages_v_blocks_membership_section_join_link_type" DEFAULT 'reference',
  	"join_link_new_tab" boolean,
  	"join_link_appearance" "enum__pages_v_blocks_membership_section_join_link_appearance" DEFAULT 'default',
  	"info_link_type" "enum__pages_v_blocks_membership_section_info_link_type" DEFAULT 'reference',
  	"info_link_new_tab" boolean,
  	"info_link_appearance" "enum__pages_v_blocks_membership_section_info_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_membership_section_locales" (
  	"join_link_url" varchar,
  	"join_link_label" varchar,
  	"info_link_url" varchar,
  	"info_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "brand" ALTER COLUMN "background" SET DEFAULT '#FFFFFF';
  ALTER TABLE "brand" ALTER COLUMN "foreground" SET DEFAULT '#020817';
  ALTER TABLE "brand" ALTER COLUMN "card" SET DEFAULT '#FFFFFF';
  ALTER TABLE "brand" ALTER COLUMN "card_foreground" SET DEFAULT '#020817';
  ALTER TABLE "brand" ALTER COLUMN "popover" SET DEFAULT '#FFFFFF';
  ALTER TABLE "brand" ALTER COLUMN "popover_foreground" SET DEFAULT '#020817';
  ALTER TABLE "brand" ALTER COLUMN "primary" SET DEFAULT '#0F172A';
  ALTER TABLE "brand" ALTER COLUMN "primary_foreground" SET DEFAULT '#F8FAFC';
  ALTER TABLE "brand" ALTER COLUMN "secondary" SET DEFAULT '#F1F5F9';
  ALTER TABLE "brand" ALTER COLUMN "secondary_foreground" SET DEFAULT '#0F172A';
  ALTER TABLE "brand" ALTER COLUMN "muted" SET DEFAULT '#F1F5F9';
  ALTER TABLE "brand" ALTER COLUMN "muted_foreground" SET DEFAULT '#64748B';
  ALTER TABLE "brand" ALTER COLUMN "accent" SET DEFAULT '#F1F5F9';
  ALTER TABLE "brand" ALTER COLUMN "accent_foreground" SET DEFAULT '#0F172A';
  ALTER TABLE "brand" ALTER COLUMN "destructive" SET DEFAULT '#EF4444';
  ALTER TABLE "brand" ALTER COLUMN "destructive_foreground" SET DEFAULT '#F8FAFC';
  ALTER TABLE "brand" ALTER COLUMN "border" SET DEFAULT '#E2E8F0';
  ALTER TABLE "brand" ALTER COLUMN "input" SET DEFAULT '#E2E8F0';
  ALTER TABLE "brand" ALTER COLUMN "ring" SET DEFAULT '#020817';
  ALTER TABLE "brand" ALTER COLUMN "dark_background" SET DEFAULT '#020817';
  ALTER TABLE "brand" ALTER COLUMN "dark_foreground" SET DEFAULT '#F8FAFC';
  ALTER TABLE "brand" ALTER COLUMN "dark_card" SET DEFAULT '#020817';
  ALTER TABLE "brand" ALTER COLUMN "dark_cardforeground" SET DEFAULT '#F8FAFC';
  ALTER TABLE "brand" ALTER COLUMN "dark_popover" SET DEFAULT '#020817';
  ALTER TABLE "brand" ALTER COLUMN "dark_popoverforeground" SET DEFAULT '#F8FAFC';
  ALTER TABLE "brand" ALTER COLUMN "dark_primary" SET DEFAULT '#F8FAFC';
  ALTER TABLE "brand" ALTER COLUMN "dark_primaryforeground" SET DEFAULT '#0F172A';
  ALTER TABLE "brand" ALTER COLUMN "dark_secondary" SET DEFAULT '#1E293B';
  ALTER TABLE "brand" ALTER COLUMN "dark_secondaryforeground" SET DEFAULT '#F8FAFC';
  ALTER TABLE "brand" ALTER COLUMN "dark_muted" SET DEFAULT '#1E293B';
  ALTER TABLE "brand" ALTER COLUMN "dark_mutedforeground" SET DEFAULT '#94A3B8';
  ALTER TABLE "brand" ALTER COLUMN "dark_accent" SET DEFAULT '#1E293B';
  ALTER TABLE "brand" ALTER COLUMN "dark_accentforeground" SET DEFAULT '#F8FAFC';
  ALTER TABLE "brand" ALTER COLUMN "dark_destructive" SET DEFAULT '#7F1D1D';
  ALTER TABLE "brand" ALTER COLUMN "dark_destructiveforeground" SET DEFAULT '#F8FAFC';
  ALTER TABLE "brand" ALTER COLUMN "dark_border" SET DEFAULT '#1E293B';
  ALTER TABLE "brand" ALTER COLUMN "dark_input" SET DEFAULT '#1E293B';
  ALTER TABLE "brand" ALTER COLUMN "dark_ring" SET DEFAULT '#CBD5E1';
  ALTER TABLE "pages" ADD COLUMN "background_component" "enum_pages_background_component" DEFAULT 'none';
  ALTER TABLE "_pages_v" ADD COLUMN "version_background_component" "enum__pages_v_version_background_component" DEFAULT 'none';
  ALTER TABLE "header_nav_items" ADD COLUMN "custom_class" varchar;
  ALTER TABLE "header" ADD COLUMN "custom_css" varchar;
  ALTER TABLE "pages_blocks_about_section_features" ADD CONSTRAINT "pages_blocks_about_section_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_section" ADD CONSTRAINT "pages_blocks_about_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_section_locales" ADD CONSTRAINT "pages_blocks_about_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_section_links" ADD CONSTRAINT "pages_blocks_contact_section_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_section" ADD CONSTRAINT "pages_blocks_contact_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_section_locales" ADD CONSTRAINT "pages_blocks_contact_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_events_section_schedule" ADD CONSTRAINT "pages_blocks_events_section_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_events_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_events_section" ADD CONSTRAINT "pages_blocks_events_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_section" ADD CONSTRAINT "pages_blocks_hero_section_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_section" ADD CONSTRAINT "pages_blocks_hero_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_section_locales" ADD CONSTRAINT "pages_blocks_hero_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_membership_section_membership_types" ADD CONSTRAINT "pages_blocks_membership_section_membership_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_membership_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_membership_section" ADD CONSTRAINT "pages_blocks_membership_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_membership_section_locales" ADD CONSTRAINT "pages_blocks_membership_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_membership_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_section_features" ADD CONSTRAINT "_pages_v_blocks_about_section_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_section" ADD CONSTRAINT "_pages_v_blocks_about_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_section_locales" ADD CONSTRAINT "_pages_v_blocks_about_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_section_links" ADD CONSTRAINT "_pages_v_blocks_contact_section_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_section" ADD CONSTRAINT "_pages_v_blocks_contact_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_section_locales" ADD CONSTRAINT "_pages_v_blocks_contact_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_events_section_schedule" ADD CONSTRAINT "_pages_v_blocks_events_section_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_events_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_events_section" ADD CONSTRAINT "_pages_v_blocks_events_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_section" ADD CONSTRAINT "_pages_v_blocks_hero_section_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_section" ADD CONSTRAINT "_pages_v_blocks_hero_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_section_locales" ADD CONSTRAINT "_pages_v_blocks_hero_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_membership_section_membership_types" ADD CONSTRAINT "_pages_v_blocks_membership_section_membership_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_membership_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_membership_section" ADD CONSTRAINT "_pages_v_blocks_membership_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_membership_section_locales" ADD CONSTRAINT "_pages_v_blocks_membership_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_membership_section"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_about_section_features_order_idx" ON "pages_blocks_about_section_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_section_features_parent_id_idx" ON "pages_blocks_about_section_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_section_order_idx" ON "pages_blocks_about_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_section_parent_id_idx" ON "pages_blocks_about_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_section_path_idx" ON "pages_blocks_about_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_about_section_locales_locale_parent_id_unique" ON "pages_blocks_about_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_section_links_order_idx" ON "pages_blocks_contact_section_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_section_links_parent_id_idx" ON "pages_blocks_contact_section_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_section_order_idx" ON "pages_blocks_contact_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_section_parent_id_idx" ON "pages_blocks_contact_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_section_path_idx" ON "pages_blocks_contact_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_contact_section_locales_locale_parent_id_unique" ON "pages_blocks_contact_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_events_section_schedule_order_idx" ON "pages_blocks_events_section_schedule" USING btree ("_order");
  CREATE INDEX "pages_blocks_events_section_schedule_parent_id_idx" ON "pages_blocks_events_section_schedule" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_events_section_order_idx" ON "pages_blocks_events_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_events_section_parent_id_idx" ON "pages_blocks_events_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_events_section_path_idx" ON "pages_blocks_events_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_section_order_idx" ON "pages_blocks_hero_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_section_parent_id_idx" ON "pages_blocks_hero_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_section_path_idx" ON "pages_blocks_hero_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_section_logo_idx" ON "pages_blocks_hero_section" USING btree ("logo_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_section_locales_locale_parent_id_unique" ON "pages_blocks_hero_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_membership_section_membership_types_order_idx" ON "pages_blocks_membership_section_membership_types" USING btree ("_order");
  CREATE INDEX "pages_blocks_membership_section_membership_types_parent_id_idx" ON "pages_blocks_membership_section_membership_types" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_membership_section_order_idx" ON "pages_blocks_membership_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_membership_section_parent_id_idx" ON "pages_blocks_membership_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_membership_section_path_idx" ON "pages_blocks_membership_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_membership_section_locales_locale_parent_id_uni" ON "pages_blocks_membership_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_about_section_features_order_idx" ON "_pages_v_blocks_about_section_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_section_features_parent_id_idx" ON "_pages_v_blocks_about_section_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_section_order_idx" ON "_pages_v_blocks_about_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_section_parent_id_idx" ON "_pages_v_blocks_about_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_section_path_idx" ON "_pages_v_blocks_about_section" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_about_section_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_about_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_section_links_order_idx" ON "_pages_v_blocks_contact_section_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_section_links_parent_id_idx" ON "_pages_v_blocks_contact_section_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_section_order_idx" ON "_pages_v_blocks_contact_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_section_parent_id_idx" ON "_pages_v_blocks_contact_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_section_path_idx" ON "_pages_v_blocks_contact_section" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_section_locales_locale_parent_id_uni" ON "_pages_v_blocks_contact_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_events_section_schedule_order_idx" ON "_pages_v_blocks_events_section_schedule" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_events_section_schedule_parent_id_idx" ON "_pages_v_blocks_events_section_schedule" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_events_section_order_idx" ON "_pages_v_blocks_events_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_events_section_parent_id_idx" ON "_pages_v_blocks_events_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_events_section_path_idx" ON "_pages_v_blocks_events_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_section_order_idx" ON "_pages_v_blocks_hero_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_section_parent_id_idx" ON "_pages_v_blocks_hero_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_section_path_idx" ON "_pages_v_blocks_hero_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_section_logo_idx" ON "_pages_v_blocks_hero_section" USING btree ("logo_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_section_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_membership_section_membership_types_order_idx" ON "_pages_v_blocks_membership_section_membership_types" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_membership_section_membership_types_parent_id_idx" ON "_pages_v_blocks_membership_section_membership_types" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_membership_section_order_idx" ON "_pages_v_blocks_membership_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_membership_section_parent_id_idx" ON "_pages_v_blocks_membership_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_membership_section_path_idx" ON "_pages_v_blocks_membership_section" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_membership_section_locales_locale_parent_id_" ON "_pages_v_blocks_membership_section_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_about_section_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_section_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_events_section_schedule" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_events_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_membership_section_membership_types" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_membership_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_membership_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_section_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_section_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_events_section_schedule" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_events_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_membership_section_membership_types" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_membership_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_membership_section_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_about_section_features" CASCADE;
  DROP TABLE "pages_blocks_about_section" CASCADE;
  DROP TABLE "pages_blocks_about_section_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_section_links" CASCADE;
  DROP TABLE "pages_blocks_contact_section" CASCADE;
  DROP TABLE "pages_blocks_contact_section_locales" CASCADE;
  DROP TABLE "pages_blocks_events_section_schedule" CASCADE;
  DROP TABLE "pages_blocks_events_section" CASCADE;
  DROP TABLE "pages_blocks_hero_section" CASCADE;
  DROP TABLE "pages_blocks_hero_section_locales" CASCADE;
  DROP TABLE "pages_blocks_membership_section_membership_types" CASCADE;
  DROP TABLE "pages_blocks_membership_section" CASCADE;
  DROP TABLE "pages_blocks_membership_section_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_about_section_features" CASCADE;
  DROP TABLE "_pages_v_blocks_about_section" CASCADE;
  DROP TABLE "_pages_v_blocks_about_section_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_section_links" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_section" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_section_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_events_section_schedule" CASCADE;
  DROP TABLE "_pages_v_blocks_events_section" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_section" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_section_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_membership_section_membership_types" CASCADE;
  DROP TABLE "_pages_v_blocks_membership_section" CASCADE;
  DROP TABLE "_pages_v_blocks_membership_section_locales" CASCADE;
  ALTER TABLE "brand" ALTER COLUMN "theme" SET DATA TYPE text;
  ALTER TABLE "brand" ALTER COLUMN "theme" SET DEFAULT 'slate'::text;
  DROP TYPE "public"."enum_brand_theme";
  CREATE TYPE "public"."enum_brand_theme" AS ENUM('slate', 'ocean', 'forest', 'rose', 'amber', 'violet');
  ALTER TABLE "brand" ALTER COLUMN "theme" SET DEFAULT 'slate'::"public"."enum_brand_theme";
  ALTER TABLE "brand" ALTER COLUMN "theme" SET DATA TYPE "public"."enum_brand_theme" USING "theme"::"public"."enum_brand_theme";
  ALTER TABLE "brand" ALTER COLUMN "background" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "foreground" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "card" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "card_foreground" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "popover" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "popover_foreground" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "primary" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "primary_foreground" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "secondary" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "secondary_foreground" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "muted" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "muted_foreground" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "accent" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "accent_foreground" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "destructive" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "destructive_foreground" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "border" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "input" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "ring" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "dark_background" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "dark_foreground" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "dark_card" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "dark_cardforeground" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "dark_popover" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "dark_popoverforeground" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "dark_primary" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "dark_primaryforeground" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "dark_secondary" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "dark_secondaryforeground" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "dark_muted" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "dark_mutedforeground" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "dark_accent" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "dark_accentforeground" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "dark_destructive" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "dark_destructiveforeground" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "dark_border" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "dark_input" DROP DEFAULT;
  ALTER TABLE "brand" ALTER COLUMN "dark_ring" DROP DEFAULT;
  ALTER TABLE "pages" DROP COLUMN "background_component";
  ALTER TABLE "_pages_v" DROP COLUMN "version_background_component";
  ALTER TABLE "header_nav_items" DROP COLUMN "custom_class";
  ALTER TABLE "header" DROP COLUMN "custom_css";
  DROP TYPE "public"."enum_pages_blocks_about_section_features_icon";
  DROP TYPE "public"."enum_pages_blocks_about_section_cfp_link_type";
  DROP TYPE "public"."enum_pages_blocks_about_section_cfp_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_contact_section_links_icon";
  DROP TYPE "public"."enum_pages_blocks_contact_section_sponsor_link_type";
  DROP TYPE "public"."enum_pages_blocks_contact_section_sponsor_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_section_primary_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_section_primary_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_section_contact_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_section_contact_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_membership_section_join_link_type";
  DROP TYPE "public"."enum_pages_blocks_membership_section_join_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_membership_section_info_link_type";
  DROP TYPE "public"."enum_pages_blocks_membership_section_info_link_appearance";
  DROP TYPE "public"."enum_pages_background_component";
  DROP TYPE "public"."enum__pages_v_blocks_about_section_features_icon";
  DROP TYPE "public"."enum__pages_v_blocks_about_section_cfp_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_about_section_cfp_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_contact_section_links_icon";
  DROP TYPE "public"."enum__pages_v_blocks_contact_section_sponsor_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_contact_section_sponsor_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_section_primary_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_section_primary_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_section_contact_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_section_contact_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_membership_section_join_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_membership_section_join_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_membership_section_info_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_membership_section_info_link_appearance";
  DROP TYPE "public"."enum__pages_v_version_background_component";`)
}
