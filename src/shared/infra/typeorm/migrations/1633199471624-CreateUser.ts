import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1633199471624 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "address_id",
                        type: "uuid",
                    },
                    {
                        name: "category_id",
                        type: "uuid",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "deleted_at",
                        type: "timestamp",
                        isNullable: true,
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKAddressUser",
                        referencedTableName: "address",
                        referencedColumnNames: ["id"],
                        columnNames: ["address_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: "FKCategoryUser",
                        referencedTableName: "category",
                        referencedColumnNames: ["id"],
                        columnNames: ["category_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }
}
