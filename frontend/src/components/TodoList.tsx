import React from 'react';
import TodoItem from './TodoItem';
import { Todo, TodoStats } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  stats: TodoStats;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, stats }) => {
  const validTodos = Array.isArray(todos) ? todos.filter(t => t && t.id) : [];

  if (validTodos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No todos yet!</h3>
        <p>Add your first todo to get started</p>
      </div>
    );
  }

  return (
    <div className="todo-list-container">
      <div className="todo-stats">
        <div className="stat-card">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-card pending">
          <span className="stat-value">{stats.pending}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card completed">
          <span className="stat-value">{stats.completed}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      <div className="todo-list">
        {validTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
