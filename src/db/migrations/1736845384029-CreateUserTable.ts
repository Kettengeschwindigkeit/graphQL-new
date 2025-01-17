import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1736845384029 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "email",
            type: "varchar"
          },
          {
            name: "username",
            type: "varchar",
            isNullable: true
          },
          {
            name: "password",
            type: "varchar"
          },
          {
            name: "description",
            type: "text",
            isNullable: true
          },
          {
            name: "avatar_path",
            type: "varchar",
            isNullable: true
          },
          {
            name: "country",
            type: "varchar",
            isNullable: true
          },
          {
            name: "social_link",
            type: "varchar",
            isNullable: true
          },
          {
            name: "remember_token",
            type: "varchar",
            isNullable: true
          },
          {
            name: "is_verified",
            type: "boolean",
            default: false
          },
          {
            name: "is_real_time",
            type: "boolean",
            default: true
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()"
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
