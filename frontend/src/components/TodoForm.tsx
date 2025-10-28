import React, { useState, FormEvent } from 'react';
import { TodoInput } from '../types/todo';

interface TodoFormProps {
  onAdd: (todoData: TodoInput) => Promise<any>;
  disabled?: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd, disabled = false }) => {
  const [title, setTitle] = useState<string>('');
  // const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!title.trim()) return;

    try {
      setIsSubmitting(true);
      await onAdd({ 
        title: title.trim(), 
      });
      setTitle('');
      // setDescription('');
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="todo-form-container">
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-row">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="todo-input"
            disabled={isSubmitting || disabled}
            maxLength={100}
            autoFocus
          />
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting || disabled || !title.trim()}
          >
            {isSubmitting ? (
              <>
                <span className="btn-spinner"></span>
                Adding...
              </>
            ) : (
              <>
                <span className="btn-icon">➕</span>
                Add Todo
              </>
            )}
          </button>
        </div>
        {/* <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="todo-textarea"
          rows={2}
          disabled={isSubmitting || disabled}
          maxLength={500}
        /> */}
      </form>
    </div>
  );
};

export default TodoForm;
