import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusAndFkEstablishment1758681723928 implements MigrationInterface {
    name = 'AddStatusAndFkEstablishment1758681723928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Renomeia coluna
        await queryRunner.query(`ALTER TABLE "establishments" RENAME COLUMN "status" TO "statusId"`);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_name_enum') THEN
                    CREATE TYPE "public"."status_name_enum" AS ENUM('ativo', 'pendente', 'inativo');
                END IF;
            END$$;
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "status" (
                "id" SERIAL NOT NULL,
                "name" "public"."status_name_enum" NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_95ff138b88fdd8a7c9ebdb97a32" UNIQUE ("name"),
                CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`ALTER TABLE "establishments" DROP COLUMN "statusId"`);
        await queryRunner.query(`ALTER TABLE "establishments" ADD "statusId" integer`);
        await queryRunner.query(`
            ALTER TABLE "establishments" 
            ADD CONSTRAINT "FK_7015eb963b658b78c3ef0efe2f8" 
            FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "establishments" DROP CONSTRAINT "FK_7015eb963b658b78c3ef0efe2f8"`);
        await queryRunner.query(`ALTER TABLE "establishments" DROP COLUMN "statusId"`);
        await queryRunner.query(`ALTER TABLE "establishments" ADD "statusId" character varying DEFAULT 'active'`);
        await queryRunner.query(`DROP TABLE IF EXISTS "status"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."status_name_enum"`);
        await queryRunner.query(`ALTER TABLE "establishments" RENAME COLUMN "statusId" TO "status"`);
    }
}
