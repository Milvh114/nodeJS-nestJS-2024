import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelation20240419162737 implements MigrationInterface {
    name = 'CreateRelation20240419162737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`post\`
            ADD CONSTRAINT \`FK_52378a74ae3724bcab44036645b\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_52378a74ae3724bcab44036645b\`
        `);
    }

}
