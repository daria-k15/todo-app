import React from 'react';
import { TodoStats as TodoStatsType } from '../types/todo';

interface TodoStatsProps {
  stats: TodoStatsType | null;
}

const TodoStats: React.FC<TodoStatsProps> = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-value">{stats.total}</div>
        <div className="stat-label">Total</div>
      </div>
      <div className="stat-card completed">
        <div className="stat-value">{stats.completed}</div>
        <div className="stat-label">Completed</div>
      </div>
      <div className="stat-card pending">
        <div className="stat-value">{stats.pending}</div>
        <div className="stat-label">Pending</div>
      </div>
      <div className="stat-card priority-high">
        <div className="stat-value">{stats.byPriority.high}</div>
        <div className="stat-label">High Priority</div>
      </div>
    </div>
  );
};

export default TodoStats;
