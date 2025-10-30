import { TodoService } from '../service/todoService.js';

class TodoController {

  async create(req, res, next) {
    try {
      console.log('Received /todos request');
      res.status(200).json(TodoService.createTask(req));
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      console.log('Received request to get all todos')
      res.status(200).json(TodoService.getAll());
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      console.log('Received request to get todo by id', req.params.id)
      res.status(200).json(TodoService.getById(req.params.id));
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      console.log('Received request to update todo by id', req.params.id)
      res.status(200).json(TodoService.update(req));
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      console.log('Received request to delete todo by id', req.params.id)
      res.status(200).json(TodoService.delete(req.params.id));
    } catch (error) {
      next(error);
    }
  }

  async getTodoStats(req, res, next) {
    try {
      console.log("Received request to get stats of completed and pending todos");
      res.status(200).json(TodoService.getStats());
    } catch (error) {
      next(error);
    }
  }
}

export default new TodoController();
