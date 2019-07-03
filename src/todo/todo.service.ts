import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IToDo } from './todo.interface';

@Injectable()
export class TodoService {
    constructor(@Inject('TODO_MODEL') private readonly toDoModel: Model<IToDo>) {}

    async findAll(): Promise<IToDo[]> {
        return await this.toDoModel.find().exec();
    }

    async findById(id: string): Promise<IToDo> {
        return await this.toDoModel.findById(id).exec();
    }

    async create(todo: IToDo): Promise<IToDo> {

        const createdTask = new this.toDoModel(todo);

        return await createdTask.save();
    }

    async update(id: string, todo: IToDo): Promise<IToDo> {

        const taskForUpdate: IToDo = await this.toDoModel.findById(id).exec();

        if ( taskForUpdate ) {

            taskForUpdate.title = todo.title;

            taskForUpdate.description = todo.description;

            const updateTaskModel = new this.toDoModel(taskForUpdate);

            return await updateTaskModel.save();

        } else {

            throw new Error(`La tarea con ID: ${id} no existe`);
        }
    }

    async delete(id: string): Promise<IToDo> {
        return await this.toDoModel.findByIdAndDelete(id).exec();
    }

    async search(term: string) {
        const regex = new RegExp(term, 'i');
        return this.toDoModel.find({}).or([{ title: regex }, { description: regex }]).exec();
    }
}
