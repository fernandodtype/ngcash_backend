import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669060270770 implements MigrationInterface {
    name = 'default1669060270770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "balance" SET DEFAULT '100'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "balance" DROP DEFAULT`);
    }

}
