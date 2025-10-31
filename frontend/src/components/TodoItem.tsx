import React, { useState } from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: { description?: string }) => void;
}

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'high': return '🔴';
    case 'medium': return '🟡';
    case 'low': return '🟢';
    default: return '⚪';
  }
};

const getPriorityClass = (priority: string) => {
  return `priority-${priority}`;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(todo.description || '');

  const handleSaveDescription = () => {
    onUpdate(todo.id, { description: editedDescription });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedDescription(todo.description || '');
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      // setIsDeleting(true);
      try {
        onDelete(todo.id);
      } catch (error) {
        // setIsDeleting(false);
      }
    }
  }

    return (
      <li className={`todo-item ${todo.completed ? 'completed' : ''} ${getPriorityClass(todo.priority)}`}>
        <div className="todo-main">
          <div className="todo-header">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="todo-checkbox"
            />
            <div className="todo-content-wrapper">
              <h3 className="todo-title">
                {getPriorityIcon(todo.priority)} {todo.title}
              </h3>
              {!isExpanded && todo.description && (
                <p className="todo-description-preview">
                  {todo.description.substring(0, 60)}{todo.description.length > 60 ? '...' : ''}
                </p>
              )}
            </div>
            <div className="todo-actions">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="btn-expand-icon"
                title={isExpanded ? 'Show less' : 'Show more'}
              >
                {isExpanded ? '−' : '+'}
              </button>
              <button
                onClick={handleDelete}
                className="btn-delete"
                aria-label="Delete todo"
              >
                🗑️
              </button>
            </div>
          </div>

          {/* Expandable Section */}
          {isExpanded && (
            <div className="todo-details">
              <div className="todo-description-section">
                <div className="description-header">
                  <span className="section-title">Description</span>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn-edit-description"
                    >
                      {todo.description ? '✏️ Edit' : '➕ Add'}
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="description-edit">
                    <textarea
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      placeholder="Add a description..."
                      rows={4}
                      className="description-textarea"
                      autoFocus
                    />
                    <div className="description-actions">
                      <button onClick={handleSaveDescription} className="btn-save">
                        💾 Save
                      </button>
                      <button onClick={handleCancelEdit} className="btn-cancel">
                        ❌ Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="description-display">
                    {todo.description ? (
                      <p className="todo-description-full">{todo.description}</p>
                    ) : (
                      <em className="no-description">No description added yet</em>
                    )}
                  </div>
                )}
              </div>

              <div className="todo-metadata">
                <div className="metadata-item">
                  <span className="metadata-icon">📅</span>
                  <div>
                    <div className="metadata-label">Created</div>
                    <div className="metadata-value">{new Date(todo.createdAt).toLocaleString()}</div>
                  </div>
                </div>
                <div className="metadata-item">
                  <span className="metadata-icon">🔄</span>
                  <div>
                    <div className="metadata-label">Updated</div>
                    <div className="metadata-value">{new Date(todo.updatedAt).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="todo-footer">
          <span className={`priority-badge ${getPriorityClass(todo.priority)}`}>
            {getPriorityIcon(todo.priority)} {todo.priority.toUpperCase()}
          </span>
          {todo.completed && <span className="status-badge completed">✓ Completed</span>}
        </div>
      </li>
    );
  };

  export default TodoItem;
