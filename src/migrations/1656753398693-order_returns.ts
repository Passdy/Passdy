import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class orderReturns1656753398693 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'order_returns',
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
                        name: 'cloth_num_return',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'ship_fee',
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
        await queryRunner.dropTable('order_returns');
    }

}
