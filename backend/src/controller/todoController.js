import TodoModel from '../models/todoModel.js';
import {TodoService} from '../service/todoService.js';

class TodoController {

  async create(req, res, next) {
    try {
      console.log('Received /todos request');
      const newTask = await TodoService.createTask(req);

      res.status(200).json(newTask);
      console.log('Result:', newTask)
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      console.log('Received request to get all todos')
      const todos = await TodoService.getAll();
      res.status(200).json(todos);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      console.log('Received request to get todo by id', req.params.id)
      const todo = await TodoService.getById(req.params.id);

      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      console.log('Received request to update todo by id', req.params.id)
      const updatedTodo = await TodoService.update(req);

      res.status(200).json(updatedTodo);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      console.log('Received request to delete todo by id', req.params.id)

      const deletedTodo = await TodoService.delete(req.params.id);

      res.status(200).json(deletedTodo);
    } catch (error) {
      next(error);
    }
  }
}

export default new TodoController();
