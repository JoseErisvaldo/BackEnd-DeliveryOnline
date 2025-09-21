import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressFieldsToUsers1758475370170 implements MigrationInterface {
    name = 'AddAddressFieldsToUsers1758475370170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "street" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "city" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "state" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "zipCode" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "zipCode"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "street"`);
    }

}
