import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class products1659846886195 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'products',
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
                        name: 'sku',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'price',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'amount',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'sort_status',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'product_status',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'sell_status',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'product_type_id',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'size_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'color_id',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'measure',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'pattern_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'material_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'branch_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'discount_percent',
                        type: 'int',
                        isNullable: true,
                    }
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products');
    }

}
