import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class orderSorts1656734902681 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'order_sorts',
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
                        name: 'order_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'cloth_num_receive',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'cloth_num_pass',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'varchar',
                        isNullable: true,
                    }
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order_sorts');
    }

}
