import TodoModel from '../models/todoModel.js'
import db from '../config/database.js';
import CustomerError from '../utils/CustomError.js';
import ERROR_MESSAGES from '../constants/ErrorMessages.js';

export const TodoService = {
    async createTask(req) {
        console.log('Started to process /todos request');
        const { title } = req.body

        if (!title || title.trim() === '') {
            throw new CustomerError(ERROR_MESSAGES.INVALID_DATA, 400);
      }

        const newTask = new TodoModel(
            title.trim()
        );

        return db.create(newTask);
    },

    async getAll() {
        console.log('Started to process get /todos requet');
        return db.getAll();
    },

    async getById(id) {
        console.log('Started to process request to get todo by id', id);
        const todo = db.getById(id);

        if (!todo) {
            throw new CustomerError(ERROR_MESSAGES.ITEM_NOT_FOUND, 404)
        }
        return todo;
    },

    async update(req) {
        console.log('Started to process request to update todo by id', req.params.id);
        const { title, completed } = req.body;

      if (title !== undefined && title.trim() === '') throw new CustomerError(ERROR_MESSAGES.INVALID_DATA, 400);

      const updatedTodo = db.update(req.params.id, {
        title: title?.trim(),
        completed
      });

      if (!updatedTodo) throw new CustomerError(ERROR_MESSAGES.ITEM_NOT_FOUND, 404);
      return updatedTodo;
    },

    async delete(id) {
        console.log('Started to process request to delete todo by id', id);

        const deletedTodo = db.delete(id);

        if (!deletedTodo) throw new CustomerError(ERROR_MESSAGES.ITEM_NOT_FOUND, 404);
        return deletedTodo;
    }
}