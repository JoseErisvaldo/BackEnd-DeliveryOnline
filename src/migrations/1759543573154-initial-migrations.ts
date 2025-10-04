import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigrations1759543573154 implements MigrationInterface {
    name = 'InitialMigrations1759543573154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "status" ("id" SERIAL NOT NULL, "name" "public"."status_name_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_95ff138b88fdd8a7c9ebdb97a32" UNIQUE ("name"), CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        
        await queryRunner.query(`
        INSERT INTO "status" (name) VALUES
        ('ativo'),
        ('pendente'),
        ('inativo');
        `);

        await queryRunner.query(`CREATE TABLE "establishments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "address" character varying(255), "street" character varying, "number" character varying, "complement" character varying, "neighborhood" character varying, "city" character varying, "state" character varying, "country" character varying, "zipCode" character varying, "photo" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "owner_id" uuid, "statusId" integer, CONSTRAINT "PK_7fb6da6c365114ccb61b091bbdf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categorys" ("category_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_9294b399fc72c74c5bf1114f470" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`CREATE TABLE "ingredients" ("ingredient_id" BIGSERIAL NOT NULL, "price" double precision, "description" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "product_id" bigint, CONSTRAINT "PK_ca1733bfdc5be587ed299844ac1" PRIMARY KEY ("ingredient_id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("product_id" BIGSERIAL NOT NULL, "name" text, "price" double precision, "discount" double precision DEFAULT '0', "is_active" boolean, "photo" text, "category_id" uuid, "description" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" uuid, "establishment_id" uuid, CONSTRAINT "PK_a8940a4bf3b90bd7ac15c8f4dd9" PRIMARY KEY ("product_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "street" character varying, "number" character varying, "complement" character varying, "neighborhood" character varying, "city" character varying, "state" character varying, "country" character varying, "zipCode" character varying, "status" character varying DEFAULT 'active', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "establishments" ADD CONSTRAINT "FK_168b3de5d4a58a8d444cda001e2" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "establishments" ADD CONSTRAINT "FK_7015eb963b658b78c3ef0efe2f8" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_a397c54c9cb188d354187b4be26" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categorys"("category_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_87e76aa1df75179245786854125" FOREIGN KEY ("establishment_id") REFERENCES "establishments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_87e76aa1df75179245786854125"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_a397c54c9cb188d354187b4be26"`);
        await queryRunner.query(`ALTER TABLE "establishments" DROP CONSTRAINT "FK_7015eb963b658b78c3ef0efe2f8"`);
        await queryRunner.query(`ALTER TABLE "establishments" DROP CONSTRAINT "FK_168b3de5d4a58a8d444cda001e2"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "ingredients"`);
        await queryRunner.query(`DROP TABLE "categorys"`);
        await queryRunner.query(`DROP TABLE "establishments"`);
        await queryRunner.query(`DROP TABLE "status"`);
    }

}
