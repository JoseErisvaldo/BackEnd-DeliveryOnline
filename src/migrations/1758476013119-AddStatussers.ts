import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatussers1758476013119 implements MigrationInterface {
    name = 'AddStatussers1758476013119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "status" character varying DEFAULT 'active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
    }

}
