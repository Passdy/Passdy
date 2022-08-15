import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class collectionItems1659855185414 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'collection_items',
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
                        name: 'product_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'collection_id',
                        type: 'int',
                        isNullable: false,
                    }
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('collection_items');
    }

}
