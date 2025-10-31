# Todo List Fullstack App (React + Node.js + Docker)

A full-stack todo list application built with **React (TypeScript)** on the frontend and **Node.js/Express** on the backend.

### Core Features
- Create new todos with title and description
- Mark todos as complete/incomplete (toggle)
- Delete todos
- View all todos in a clean, organized list
- Priority System: Assign priority levels (Low 🟢, Medium 🟡, High 🔴) to todos with visual indicators
- Statistics Dashboard: Real-time stats showing:
  - Total todos
  - Completed vs Pending count
  - Todos by priority level
- Dark Mode: Toggle between light and dark themes with persistent preference


## Stack

**Frontend:**
- React + TypeScript

**Backend:**
- Node.js (18+) + Express.js
- In-memory database (for demo purposes)
- Jest + Supertest (API tests)
- Swagger-jsdoc + Swagger UI (API docs)

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

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| GET | `/todos/:id` | Get a single todo by ID |
| GET | `/todos/stats` | Get statistics (total, completed, pending, by priority) |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/:id` | Update a todo |
| DELETE | `/todos/:id` | Delete a todo |

**Additional Endpoints:**
- `/api-docs`: Swagger UI interactive API documentation.
