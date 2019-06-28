import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { ToDoSchema } from '../schemas/todo.schema';
import { Connection } from 'mongoose';
import * as mongoose from 'mongoose';
import { DB_CONFIG } from '../config/db.config';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [
    TodoService,
    {
      provide: 'TODO_MODEL',
      useFactory: (connection: Connection) => connection.model('tasks', ToDoSchema),
      inject: ['DATABASE_CONNECTION'],
    },
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<typeof mongoose> =>
        await mongoose.connect(DB_CONFIG, {
           useNewUrlParser: true,
        }),
    },
  ],
})
export class TodoModule {}
