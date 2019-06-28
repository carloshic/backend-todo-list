import { Document } from 'mongoose';
export interface IToDo extends Document {
    title: string;
    description: string;
}
