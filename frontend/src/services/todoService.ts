import { Todo, TodoInput, TodoUpdate, ApiResponse } from '../types/todo';

const API_URL = 'http://localhost:8000/todos';

class TodoService {
  async getAll(): Promise<Todo[]> {
    try {
      const response = await fetch(`${API_URL}`);

      if (!response.ok) throw new Error('Failed to fetch reminders');
      console.log('GET ALL Response:', response);
      return response.json();
    } catch (error) {
      console.error('GET ALL Error:', error);
      throw error;
    }
  }

  async getById(id: number): Promise<Todo> {
    const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch reminders');

    return response.json();
  }

  async create(todoData: TodoInput): Promise<Todo> {
    try {

      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todoData)
      })  

      if (!response.ok) throw new Error('Failed to create a reminder');

      console.log('CREATE Response:', response);
      return response.json();
    } catch (error) {
      console.error('CREATE Error:', error);
      throw error;
    }
  }

  async update(id: number, todoData: TodoUpdate): Promise<Todo> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todoData)
      })  

    if (!response.ok) throw new Error('Failed to create a reminder');
    return response.json();
  }

  async delete(id: number): Promise<Todo> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })  

    if (!response.ok) throw new Error('Failed to create a reminder');
    return response.json();
  }
}

export default new TodoService();
