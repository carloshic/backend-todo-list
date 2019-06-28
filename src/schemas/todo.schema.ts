import { Schema } from 'mongoose';

export const ToDoSchema = new Schema({
    title: String,
    description: String,
});
