import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class events1656169695120 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'events',
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
                        name: 'display_type',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        isNullable: true,
                    }
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('events');
    }

}
