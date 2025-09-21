import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFullAddressToUsers1758475459825 implements MigrationInterface {
    name = 'AddFullAddressToUsers1758475459825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "number" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "complement" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "neighborhood" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "country" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "neighborhood"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "complement"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "number"`);
    }

}
