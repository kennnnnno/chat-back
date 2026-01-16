import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1768543688240 implements MigrationInterface {
    name = 'InitialSchema1768543688240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "user_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_id"`);
    }

}
