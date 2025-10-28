export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TodoInput {
  title: string;
}

export interface TodoUpdate {
  title?: string;
  completed?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
  error?: string;
}

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
}
