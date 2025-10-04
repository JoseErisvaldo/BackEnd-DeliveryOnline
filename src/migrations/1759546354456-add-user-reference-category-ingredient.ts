import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserReferenceCategoryIngredient1759546354456 implements MigrationInterface {
    name = 'AddUserReferenceCategoryIngredient1759546354456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categorys" DROP CONSTRAINT "FK_597ed7d123aaa691a73b8babee9"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_9a8a13cc60b4a4a067679cde290"`);
        await queryRunner.query(`ALTER TABLE "categorys" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "ingredients" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "categorys" ADD CONSTRAINT "FK_2584bc188ec70c1ce2069394f93" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_317acbdff49aeb8558a1bc6c606" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_317acbdff49aeb8558a1bc6c606"`);
        await queryRunner.query(`ALTER TABLE "categorys" DROP CONSTRAINT "FK_2584bc188ec70c1ce2069394f93"`);
        await queryRunner.query(`ALTER TABLE "ingredients" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "categorys" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_9a8a13cc60b4a4a067679cde290" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categorys" ADD CONSTRAINT "FK_597ed7d123aaa691a73b8babee9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
