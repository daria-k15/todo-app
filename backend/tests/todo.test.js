import request from 'supertest';
import app from '../src/app.js';
import db from '../src/config/database.js';
import Todo from '../src/models/todoModel.js';

describe('Todo API Tests', () => {
  beforeEach(() => {
    db.todos = [];
    Todo.nextId = 1;
  });

  afterAll(() => {
    db.todos = [];
  });

  describe('POST /todos', () => {
    it('should create a new todo', async () => {
      const response = await request(app)
        .post('/todos')
        .send({ title: 'Test Todo' })
        .expect(200);


      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Test Todo');
      expect(response.body.completed).toBe(false);

    });

    it('should return error for empty title', async () => {
      await request(app)
        .post('/todos')
        .send({ title: '' })
        .expect(400);
    });
  });

  describe('GET /todos', () => {
    it('should return empty array initially', async () => {
      const response = await request(app)
        .get('/todos')
        .expect(200);

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return all todos', async () => {
      await request(app).post('/todos').send({ title: 'Todo 1' });
      await request(app).post('/todos').send({ title: 'Todo 2' });

      const response = await request(app)
        .get('/todos')
        .expect(200);

      expect(response.body).toHaveLength(2);
    });
  });

  describe('GET /todos/:id', () => {
    it('should return todo by ID', async () => {
      const createResponse = await request(app)
        .post('/todos')
        .send({ title: 'Test Todo' });

      const todoId = createResponse.body.id;

      const response = await request(app)
        .get(`/todos/${todoId}`)
        .expect(200);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(todoId);
    });

    it('should return 404 for non-existent ID', async () => {
      await request(app)
        .get('/todos/999')
        .expect(404);
    });
  });

  describe('PUT /todos/:id', () => {
    it('should update todo', async () => {
      const createResponse = await request(app)
        .post('/todos')
        .send({ title: 'Old Title' });

      const todoId = createResponse.body.id;

      const response = await request(app)
        .put(`/todos/${todoId}`)
        .send({ title: 'New Title', completed: true })
        .expect(200);

      expect(response.body.title).toBe('New Title');
      expect(response.body.completed).toBe(true);
    });

    it('should return 404 for non-existent ID', async () => {
      await request(app)
        .put('/todos/999')
        .send({ title: 'Updated' })
        .expect(404);
    });
  });

  describe('DELETE /todos/:id', () => {
    it('should delete todo', async () => {
      const createResponse = await request(app)
        .post('/todos')
        .send({ title: 'Delete Me' });

      const todoId = createResponse.body.id;

      await request(app)
        .delete(`/todos/${todoId}`)
        .expect(200);

      await request(app)
        .get(`/todos/${todoId}`)
        .expect(404);
    });

    it('should return 404 for non-existent ID', async () => {
      await request(app)
        .delete('/todos/123')
        .expect(404);
    });
  });
});
