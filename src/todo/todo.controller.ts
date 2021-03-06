import { Controller, Post, Body, Res, HttpStatus, Get, Param, Delete, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { IToDo } from './todo.interface';
import { CRStatus } from '../helpers/custom-response-status';
import { CResponse } from '../helpers/custom-response';

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {}
    @Get()
    getAll(@Res() response) {

        this.todoService.findAll().then(( toDoList: IToDo[] ) => {
            if ( toDoList.length > 0 ) {
                response.status(HttpStatus.OK).json(new CResponse(CRStatus.OK, 'Exito', toDoList));
            } else {
                response.status(HttpStatus.OK).json(new CResponse(CRStatus.NO_RECORDS_FOUND, 'No hay tareas por hacer', []));
            }
        }).catch((error) => {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new CResponse(CRStatus.ERROR, error.message));
        });
    }
    @Get(':id')
    getById(@Res() response,  @Param('id') id: string) {

        this.todoService.findById(id).then(( toDo: IToDo ) => {
            if ( toDo ) {
                response.status(HttpStatus.OK).json(new CResponse(CRStatus.OK, 'Exito', toDo));
            } else {
                response.status(HttpStatus.OK).json(new CResponse(CRStatus.NO_RECORDS_FOUND, 'La tarea no existe'));
            }
        }).catch((error) => {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new CResponse(CRStatus.ERROR, error.message));
        });
    }

    @Post()
    create(@Res() response,  @Body() todo: IToDo) {

        this.todoService.create(todo).then(( toDo: IToDo ) => {
            response.status(HttpStatus.OK).json(new CResponse(CRStatus.OK, 'Tarea creada con exito', toDo));
        }).catch((error) => {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new CResponse(CRStatus.ERROR, error.message));
        });
    }

    @Put(':id')
    update(@Res() response,  @Param('id') id: string, @Body() todo: IToDo) {

        this.todoService.update(id, todo).then(( toDo: IToDo ) => {
            response.status(HttpStatus.OK).json(new CResponse(CRStatus.OK, 'Tarea actualizada con exito', toDo));
        }).catch((error) => {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new CResponse(CRStatus.ERROR, error.message));
        });
    }

    @Delete(':id')
    delete(@Res() response,  @Param('id') id: string) {

        this.todoService.delete(id).then(() => {
            response.status(HttpStatus.OK).json(new CResponse(CRStatus.OK, 'Tarea borrada con exito'));
        }).catch((error) => {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new CResponse(CRStatus.ERROR, error.message));
        });
    }

    @Get('/search/:term')
    search(@Res() response,  @Param('term') term: string) {

        this.todoService.search(term).then((toDoList: IToDo[]) => {
            response.status(HttpStatus.OK).json(new CResponse(CRStatus.OK, 'Exito', toDoList));
        }).catch((error) => {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new CResponse(CRStatus.ERROR, error.message));
        });
    }
}
