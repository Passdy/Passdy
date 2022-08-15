import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class oderBuys1659846839011 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'order_buys',
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
                        name: 'user_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'total_price',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'tax',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'delivery_fee',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'coupon_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'status',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'payment_method_id',
                        type: 'int',
                        isNullable: true,
                    }
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order_buys');
    }

}
