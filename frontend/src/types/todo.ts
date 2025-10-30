export interface Todo {
  id: number;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TodoInput {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface TodoUpdate {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
}

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
  byPriority: {
    low: number;
    medium: number;
    high: number;
  };
}
