import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/entities/todo.entity';
import { Todo1687812914943 } from '../migrations/1687812914943-Todo';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './storage/todos.db',
      entities: [Todo],
      migrations: [Todo1687812914943],
      migrationsRun: true,
    }),
    TodosModule,
  ],
})
export class AppModule {}
