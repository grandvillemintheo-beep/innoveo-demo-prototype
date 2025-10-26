import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersAndContents1710000000000 implements MigrationInterface {
  name = 'CreateUsersAndContents1710000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');

    await queryRunner.query(
      `CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "email" character varying NOT NULL,
        "display_name" character varying NOT NULL,
        "password" character varying NOT NULL,
        "roles" text NOT NULL DEFAULT '',
        "mfa_secret" character varying,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_users_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_users_email" UNIQUE ("email")
      )`
    );

    await queryRunner.query(
      `CREATE TABLE "contents" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "title" character varying NOT NULL,
        "body" text NOT NULL,
        "published_at" TIMESTAMP WITH TIME ZONE,
        "authorId" uuid NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_contents_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_contents_author" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      )`
    );

    await queryRunner.query('CREATE INDEX "IDX_contents_author" ON "contents" ("authorId")');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_contents_author"');
    await queryRunner.query('DROP TABLE "contents"');
    await queryRunner.query('DROP TABLE "users"');
  }
}
