import { useState, useEffect } from 'react';
import todoService from '../services/todoService';
import { Todo, TodoInput, TodoUpdate, TodoStats } from '../types/todo';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [stats, setStats] = useState<TodoStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async (): Promise<void> => {
    try {
      setLoading(true);
      const result = await todoService.getAll();
      if (result) {
        setTodos(result);
      }
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async (): Promise<void> => {
    try {
      const result = await todoService.getStats();
      if (result) {
        setStats(result);
      }
    } catch (err: any) {
      console.error('Failed to fetch stats:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
    fetchStats();
  }, []);

  const addTodo = async (todoData: TodoInput): Promise<void> => {
    try {
      const result = await todoService.create(todoData);
      if (result) {
        setTodos(prevTodos => [...prevTodos, result]);
        fetchStats();
      }
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to create todo');
    }
  };

  const toggleTodo = async (id: number): Promise<void> => {
    try {
      const todo = todos.find(t => t?.id === id);
      if (!todo) return;

      const result = await todoService.update(id, { completed: !todo.completed });
      
      if (result) {
        setTodos(prevTodos => 
          prevTodos.map(t => t?.id === id ? result : t)
        );
        fetchStats();
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to update todo');
    }
  };

  const updateTodo = async (id: number, data: TodoUpdate): Promise<void> => {
    try {
      const result = await todoService.update(id, data);
      
      if (result) {
        setTodos(prevTodos => 
          prevTodos.map(t => t?.id === id ? result : t)
        );
      }
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to update todo');
    }
  };

  const deleteTodo = async (id: number): Promise<void> => {
    try {
      await todoService.delete(id);
      setTodos(prevTodos => prevTodos.filter(t => t?.id !== id));
      fetchStats();
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to delete todo');
    }
  };

  return {
    todos,
    stats,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    refreshTodos: fetchTodos,
    refreshStats: fetchStats
  };
};
