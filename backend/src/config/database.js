class Database {
  constructor() {
    this.todos = [];
  }

  getAll() {
    return this.todos;
  }

  getById(id) {
    return this.todos.find(todo => todo.id == id);
  }

  create(todo) {
    this.todos.push(todo);
    return todo;
  }

  update(id, data) {
    const todo = this.getById(id);
    if (!todo) return null;
    todo.update(data);
    return todo;
  }

  delete(id) {
    const index = this.todos.findIndex(todo => todo.id == id);
    if (index === -1) return null;
    const deleted = this.todos[index];
    this.todos.splice(index, 1);
    return deleted;
  }

  clear() {
    this.todos = [];
  }
}

export default new Database();
