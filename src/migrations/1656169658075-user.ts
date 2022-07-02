import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class user1656169658075 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
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
                        name: 'full_name',
                        type: 'varchar',
                        isNullable: true,
                        charset: 'utf8mb4',
                        collation: 'utf8mb4_unicode_ci'
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'role',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'balance',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'type_confirm',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'confirm_code',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'expire_code',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'email_verified',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'is_registered_with_google',
                        type: 'boolean',
                        isNullable: true,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
