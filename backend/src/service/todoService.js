import TodoModel from '../models/todoModel.js'
import db from '../config/database.js';
import CustomerError from '../utils/CustomError.js';
import ERROR_MESSAGES from '../constants/ErrorMessages.js';

export const TodoService = {
    createTask(req) {
        console.log('Started to process /todos request');
        const { title, description, priority } = req.body


        const validPriorities = ['low', 'medium', 'high'];
        if (priority && !validPriorities.includes(priority)) throw new CustomerError(ERROR_MESSAGES.INVALID_DATA, 400);

        if (!title || title.trim() === '') throw new CustomerError(ERROR_MESSAGES.INVALID_DATA, 400);
        const newTask = new TodoModel(
            title.trim(),
            description,
            priority
        );

        return db.create(newTask);
    },

    getAll() {
        console.log('Started to process get /todos requet');
        return db.getAll();
    },

    getById(id) {
        console.log('Started to process request to get todo by id', id);
        const todo = db.getById(id);

        if (!todo) {
            throw new CustomerError(ERROR_MESSAGES.ITEM_NOT_FOUND, 404)
        }
        return todo;
    },

    update(req) {
        console.log('Started to process request to update todo by id', req.params.id);
        const { title, completed, description, priority } = req.body;

        const validPriorities = ['low', 'medium', 'high'];
        if (priority && !validPriorities.includes(priority)) throw new CustomerError(ERROR_MESSAGES.INVALID_DATA, 400);

        if (title !== undefined && title.trim() === '') throw new CustomerError(ERROR_MESSAGES.INVALID_DATA, 400);

        const updatedTodo = db.update(req.params.id, {
            title: title?.trim(),
            completed,
            description,
            priority
        });

        if (!updatedTodo) throw new CustomerError(ERROR_MESSAGES.ITEM_NOT_FOUND, 404);
        return updatedTodo;
    },

    delete(id) {
        console.log('Started to process request to delete todo by id', id);

        const deletedTodo = db.delete(id);

        if (!deletedTodo) throw new CustomerError(ERROR_MESSAGES.ITEM_NOT_FOUND, 404);
        return deletedTodo;
    },

    getStats() {
        const todos = this.getAll();

        const stats = {
            total: todos.length,
            completed: todos.filter(t => t.completed).length,
            pending: todos.filter(t => !t.completed).length,
            byPriority: {
                low: todos.filter(t => t.priority === 'low').length,
                medium: todos.filter(t => t.priority === 'medium').length,
                high: todos.filter(t => t.priority === 'high').length
            }
        };

        return stats;
    }
}