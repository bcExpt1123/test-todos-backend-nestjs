import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class Todo1687812914943 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'todo',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'dueDate',
            type: 'bigint',
          },
          {
            name: 'priority',
            type: 'integer',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'todo',
      new TableIndex({
        name: 'IDX_TODO_DESCRIPTION_PRIORITY',
        columnNames: ['description', 'priority'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('todo');

    await queryRunner.dropIndex('todo', 'IDX_TODO_DESCRIPTION_PRIORITY');
  }
}
