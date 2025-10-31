import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import { useTodos } from './hooks/useTodos';

function App() {
  const { todos, stats, loading, error, addTodo, toggleTodo, updateTodo, deleteTodo } = useTodos();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  if (loading) {
    return <div className="App loading">Loading todos...</div>;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Todo List</h1>
        <p>Stay organized and productive</p>
        <button onClick={toggleDarkMode} className="btn-theme-toggle">
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      <TodoStats stats={stats} />
      
      <TodoForm onSubmit={addTodo} />
      
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
      />
    </div>
  );
}

export default App;
