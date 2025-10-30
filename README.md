# Todo List Fullstack App (React + Node.js + Docker)

A todo list application built with React + TypeScript(frontend), Node.js/Express (backend), and Docker Compose for deployment

## Stack

**Frontend:**
- React + TypeScript

**Backend:**
- Node.js (18+) + Express.js
- In-memory database (for demo purposes)
- Jest + Supertest (API tests)
- Swagger-jsdoc + Swagger UI (API docs)
- CORS/Helmet/Rate-limit (security middleware)

**DevOps / Deployment:**
- Docker (multi-service containers)
- Docker Compose (service orchestration, network)

---

## Installation & Run Instructions

### Prerequisites

- Docker and Docker Compose installed

### Clone and Start

``` bash 
git clone https://github.com/daria-k15/todo-app.git`
cd todo-app
docker-compose up --build
```


- **Frontend** accessible at: [http://localhost:3000](http://localhost:3000)
- **Backend** accessible at: [http://localhost:8000](http://localhost:8000)
- **API Docs** at: [http://localhost:8000/api-docs](http://localhost:8000/api-docs)

---

## Running Without Docker

**Backend:**
``` bash
cd backend
npm install
npm run dev
```

By default runs on http://localhost:8000

**Frontend:**

``` bash 
cd frontend
npm install
npm start
```

By default runs on http://localhost:3000

---

## Running Tests

**Backend tests** (Jest + Supertest):

```bash
cd backend
npm test
```

---

## API Endpoints

| Method | Endpoint               | Description                                                      | Example Request Body                |
|--------|------------------------|------------------------------------------------------------------|-------------------------------------|
| GET    | `/todos`           | Returns all todos, sorted by creation date                       | *None*                              |
| POST   | `/todos`           | Creates a new todo item. Requires `title` (string)               | `{ "title": "Buy milk" }`           |
| GET    | `/todos/:id`       | Returns a specific todo item by ID                               | *None*                              |
| PUT    | `/todos/:id`       | Updates a todo; can change `title`, `description`, `completed`   | `{ "completed": true }`             |
| DELETE | `/todos/:id`       | Deletes a todo item by ID                                        | *None*                              |

**Additional Endpoints:**
- `/api-docs`: Swagger UI interactive API documentation.
