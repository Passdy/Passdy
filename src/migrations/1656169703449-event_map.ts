import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class eventMap1656169703449 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'event_map',
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
                        name: 'event_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'child_event_id',
                        type: 'int',
                        isNullable: false,
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
        await queryRunner.dropTable('event_map');
    }

}
