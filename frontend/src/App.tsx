import React from 'react';
import { useTodos } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorAlert from './components/ErrorAlert';
import './App.css';

const App: React.FC = () => {
  const { 
    todos, 
    loading, 
    error, 
    addTodo, 
    toggleTodo, 
    deleteTodo, 
    clearError,
    stats 
  } = useTodos();

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">
            {/* <span className="title-icon">✓</span> */}
            Todo List
          </h1>
          <p className="app-subtitle">Stay organized and productive</p>
        </header>

        <ErrorAlert message={error} onClose={clearError} />

        <TodoForm onAdd={addTodo} disabled={loading} />

        {loading && todos.length === 0 ? (
          <LoadingSpinner />
        ) : (
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            stats={stats}
          />
        )}
      </div>
    </div>
  );
};

export default App;
