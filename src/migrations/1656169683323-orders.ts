import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class orders1656169683323 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'orders',
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
                        name: 'email',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'type_give',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'type_receive',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'cloth_num',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'address_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'city_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'district_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'ward_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'address_type',
                        type: 'varchar',
                        isNullable: true,
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
        await queryRunner.dropTable('orders');
    }

}
