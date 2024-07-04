import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1720077104882 implements MigrationInterface {
    name = 'CreateTables1720077104882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "multi_choose_grid" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "row" character varying NOT NULL, "gcolumn" character varying, "answer_id" uuid, CONSTRAINT "PK_02def43b96308f1befa736bb865" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "multi_choose_option" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "option" character varying NOT NULL, "answer_id" uuid, CONSTRAINT "PK_bd1cd22b2849b0f214d076050f1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "response" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "submisstion_date" TIMESTAMP NOT NULL, "survey_id" uuid, CONSTRAINT "PK_f64544baf2b4dc48ba623ce768f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "answer_text" character varying, "single_option" character varying, "other_text" character varying, "linear_value" integer, "is_choose_other" boolean, "response_id" uuid, "question_id" uuid, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "g_column" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "gcolumn_content" character varying NOT NULL, "question_id" uuid, CONSTRAINT "PK_61db4b7dca6a988fc340927f45b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "linear_scale" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "min" integer NOT NULL, "max" integer NOT NULL, "left_label" character varying NOT NULL, "right_label" character varying NOT NULL, "question_id" uuid, CONSTRAINT "REL_80082acbc2cfdcffe0a4ac81cd" UNIQUE ("question_id"), CONSTRAINT "PK_3146986561f659dabf6c9ca4217" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "option" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "option_text" character varying, "question_id" uuid, CONSTRAINT "PK_e6090c1c6ad8962eea97abdbe63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "row" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "row_content" character varying NOT NULL, "question_id" uuid, CONSTRAINT "PK_8a1504a78acbc2e1273f69f03aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "validation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "validation_type" character varying NOT NULL, "condition_name" character varying NOT NULL, "condition_value1" character varying NOT NULL, "condition_value2" character varying NOT NULL, "question_id" uuid, CONSTRAINT "REL_c0d69d46b1c5dbee07ed276945" UNIQUE ("question_id"), CONSTRAINT "PK_03284e4f9952ce64ddc0e64bcad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "question" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying, "is_required" boolean NOT NULL, "is_has_description" boolean NOT NULL, "question_type" character varying NOT NULL, "is_validation" boolean NOT NULL, "is_has_other" boolean NOT NULL, "next_question_id" character varying NOT NULL, "previous_question_id" character varying NOT NULL, "survey_id" uuid, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "survey" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "owner_id_string" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "background_image" character varying, "is_accepting" boolean NOT NULL DEFAULT true, "owner_id" uuid, CONSTRAINT "PK_f0da32b9181e9c02ecf0be11ed3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "survey_share" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "is_edit" boolean NOT NULL DEFAULT false, "is_accept" boolean NOT NULL DEFAULT false, "email" character varying NOT NULL, "survey_id" uuid, "user_id" uuid, CONSTRAINT "PK_5294383ae2244a90612a6818837" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "verify_email_token" character varying NOT NULL, "reset_password_token" character varying, "access_token" character varying, "refresh_token" character varying, "user_id" uuid, CONSTRAINT "REL_8769073e38c365f315426554ca" UNIQUE ("user_id"), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "email" character varying NOT NULL, "password" character varying, "full_name" character varying NOT NULL, "avatar" character varying, "is_admin" boolean NOT NULL DEFAULT false, "is_google_account" boolean NOT NULL DEFAULT false, "is_verified_email" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "multi_choose_grid" ADD CONSTRAINT "FK_e339c6e8bae00ab40d684a554fa" FOREIGN KEY ("answer_id") REFERENCES "answer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "multi_choose_option" ADD CONSTRAINT "FK_e72d25252e23a71cdee9cf8d1ff" FOREIGN KEY ("answer_id") REFERENCES "answer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "response" ADD CONSTRAINT "FK_8c07347cafd9bd799c1db5ed204" FOREIGN KEY ("survey_id") REFERENCES "survey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_08f038baecd54ecc69350a7a3d7" FOREIGN KEY ("response_id") REFERENCES "response"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "g_column" ADD CONSTRAINT "FK_4a9224a42f0d1aeb99e2aa043a8" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "linear_scale" ADD CONSTRAINT "FK_80082acbc2cfdcffe0a4ac81cd4" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "option" ADD CONSTRAINT "FK_790cf6b252b5bb48cd8fc1d272b" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "row" ADD CONSTRAINT "FK_8fa99e74e1db3fbe2c99f34620a" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "validation" ADD CONSTRAINT "FK_c0d69d46b1c5dbee07ed2769451" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_a74e5e8dfbf68d7d1cd39c8c9fc" FOREIGN KEY ("survey_id") REFERENCES "survey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survey" ADD CONSTRAINT "FK_ec8daff33708a5bc68df09e8fe5" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survey_share" ADD CONSTRAINT "FK_87bf6a4f77dad078150c86bc546" FOREIGN KEY ("survey_id") REFERENCES "survey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survey_share" ADD CONSTRAINT "FK_4dad882376b33e99fafb1e0e60a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_8769073e38c365f315426554ca5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_8769073e38c365f315426554ca5"`);
        await queryRunner.query(`ALTER TABLE "survey_share" DROP CONSTRAINT "FK_4dad882376b33e99fafb1e0e60a"`);
        await queryRunner.query(`ALTER TABLE "survey_share" DROP CONSTRAINT "FK_87bf6a4f77dad078150c86bc546"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP CONSTRAINT "FK_ec8daff33708a5bc68df09e8fe5"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_a74e5e8dfbf68d7d1cd39c8c9fc"`);
        await queryRunner.query(`ALTER TABLE "validation" DROP CONSTRAINT "FK_c0d69d46b1c5dbee07ed2769451"`);
        await queryRunner.query(`ALTER TABLE "row" DROP CONSTRAINT "FK_8fa99e74e1db3fbe2c99f34620a"`);
        await queryRunner.query(`ALTER TABLE "option" DROP CONSTRAINT "FK_790cf6b252b5bb48cd8fc1d272b"`);
        await queryRunner.query(`ALTER TABLE "linear_scale" DROP CONSTRAINT "FK_80082acbc2cfdcffe0a4ac81cd4"`);
        await queryRunner.query(`ALTER TABLE "g_column" DROP CONSTRAINT "FK_4a9224a42f0d1aeb99e2aa043a8"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_08f038baecd54ecc69350a7a3d7"`);
        await queryRunner.query(`ALTER TABLE "response" DROP CONSTRAINT "FK_8c07347cafd9bd799c1db5ed204"`);
        await queryRunner.query(`ALTER TABLE "multi_choose_option" DROP CONSTRAINT "FK_e72d25252e23a71cdee9cf8d1ff"`);
        await queryRunner.query(`ALTER TABLE "multi_choose_grid" DROP CONSTRAINT "FK_e339c6e8bae00ab40d684a554fa"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TABLE "survey_share"`);
        await queryRunner.query(`DROP TABLE "survey"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "validation"`);
        await queryRunner.query(`DROP TABLE "row"`);
        await queryRunner.query(`DROP TABLE "option"`);
        await queryRunner.query(`DROP TABLE "linear_scale"`);
        await queryRunner.query(`DROP TABLE "g_column"`);
        await queryRunner.query(`DROP TABLE "answer"`);
        await queryRunner.query(`DROP TABLE "response"`);
        await queryRunner.query(`DROP TABLE "multi_choose_option"`);
        await queryRunner.query(`DROP TABLE "multi_choose_grid"`);
    }

}
