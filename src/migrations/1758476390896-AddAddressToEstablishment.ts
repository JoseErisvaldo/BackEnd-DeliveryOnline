import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressToEstablishment1758476390896 implements MigrationInterface {
    name = 'AddAddressToEstablishment1758476390896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "establishments" ADD "street" character varying`);
        await queryRunner.query(`ALTER TABLE "establishments" ADD "number" character varying`);
        await queryRunner.query(`ALTER TABLE "establishments" ADD "complement" character varying`);
        await queryRunner.query(`ALTER TABLE "establishments" ADD "neighborhood" character varying`);
        await queryRunner.query(`ALTER TABLE "establishments" ADD "city" character varying`);
        await queryRunner.query(`ALTER TABLE "establishments" ADD "state" character varying`);
        await queryRunner.query(`ALTER TABLE "establishments" ADD "country" character varying`);
        await queryRunner.query(`ALTER TABLE "establishments" ADD "zipCode" character varying`);
        await queryRunner.query(`ALTER TABLE "establishments" ADD "status" character varying DEFAULT 'active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "establishments" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "establishments" DROP COLUMN "zipCode"`);
        await queryRunner.query(`ALTER TABLE "establishments" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "establishments" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "establishments" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "establishments" DROP COLUMN "neighborhood"`);
        await queryRunner.query(`ALTER TABLE "establishments" DROP COLUMN "complement"`);
        await queryRunner.query(`ALTER TABLE "establishments" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "establishments" DROP COLUMN "street"`);
    }

}
