class TodoModel {

  static nextId = 1;

  constructor(title) {
    this.id = TodoModel.nextId++;
    this.title = title;
    this.completed = false;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  update(data) {
    if (data.title !== undefined) this.title = data.title;
    if (data.completed !== undefined) this.completed = data.completed;
    this.updatedAt = new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      completed: this.completed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

export default TodoModel;
