import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePost20240419162502 implements MigrationInterface {
    name = 'CreatePost20240419162502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`post\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`title\` varchar(255) NOT NULL,
                \`content\` varchar(255) NOT NULL,
                \`user_id\` bigint NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                UNIQUE INDEX \`IDX_52378a74ae3724bcab44036645\` (\`user_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX \`IDX_52378a74ae3724bcab44036645\` ON \`post\`
        `);
        await queryRunner.query(`
            DROP TABLE \`post\`
        `);
    }

}
