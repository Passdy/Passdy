import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class childEvent1656169714621 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'child_events',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                        unsigned: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'content',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'img',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'status',
                        type: 'int',
                        isNullable: true,
                    }
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('child_events');
    }

}
