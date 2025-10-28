import { useState, useEffect, useCallback } from 'react';
import todoService from '../services/todoService';
import { Todo, TodoInput, TodoStats } from '../types/todo';

interface UseTodosReturn {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  addTodo: (todoData: TodoInput) => Promise<Todo>;
  toggleTodo: (id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  clearError: () => void;
  stats: TodoStats;
  refetch: () => Promise<void>;
}

export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await todoService.getAll();
      
      if (result && Array.isArray(result)) {
        setTodos(result);
      } else {
        setTodos([]);
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || err.message || 'Failed to load todos';
      setError(errorMsg);
      console.error('Error fetching todos:', err);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (todoData: TodoInput): Promise<Todo> => {
    try {
      setError(null);
      const result = await todoService.create(todoData);
      
      if (result) {
        setTodos(prevTodos => [result, ...prevTodos]);
        return result;
      }
      throw new Error('Invalid response');
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || err.message || 'Failed to add todo';
      setError(errorMsg);
      throw new Error(errorMsg);
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
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to update todo');
    }
  };

  const deleteTodo = async (id: number): Promise<void> => {
    try {
      await todoService.delete(id);
      setTodos(prevTodos => prevTodos.filter(t => t?.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to delete todo');
    }
  };

  const clearError = (): void => setError(null);

  const stats: TodoStats = {
    total: todos.length,
    completed: todos.filter(t => t?.completed).length,
    pending: todos.filter(t => !t?.completed).length
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearError,
    stats,
    refetch: fetchTodos
  };
};
