import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumPhotoEstablishment1759087273953 implements MigrationInterface {
    name = 'AddColumPhotoEstablishment1759087273953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "establishments" ADD "photo" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "establishments" DROP COLUMN "photo"`);
    }

}
