class TodoModel {

  static nextId = 1;

  constructor(title, description = '', priority = 'medium') {
    this.id = TodoModel.nextId++;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.completed = false;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  update(data) {
    if (data.title !== undefined) this.title = data.title;
    if (data.completed !== undefined) this.completed = data.completed;
    if (data.description !== undefined) this.description = data.description;
    if (data.priority !== undefined) this.priority = data.priority;
    this.updatedAt = new Date().toISOString();
  }
}

export default TodoModel;