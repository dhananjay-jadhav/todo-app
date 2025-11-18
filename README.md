
# Todo App

This is a full-stack Todo application built with React, TypeScript, Vite (frontend), and Express.js with SQLite (backend API).

## Features

- Add, edit, delete, and view todos
- Persistent storage using SQLite
- RESTful API backend
- Modern React UI with TypeScript

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Backend:** Express.js, SQLite, express-validator

## Project Structure

```
todo-app/
├── public/
├── src/
│   ├── App.tsx
│   ├── types.ts
│   ├── components/
│   │   ├── ToDoCreate.tsx
│   │   ├── ToDoEdit.tsx
│   │   ├── ToDoList.tsx
│   │   └── ToDoShow.tsx
│   └── ...
├── todo-api/
│   ├── app.js
│   ├── package.json
│   └── todos.db
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)

### Setup

#### 1. Install dependencies

Frontend:
```bash
cd todo-app
npm install
```

Backend:
```bash
cd todo-api
npm install
```

#### 2. Run the backend API server

```bash
cd todo-api
npm start
# The API runs on http://localhost:5000
```

#### 3. Run the frontend React app

```bash
cd todo-app
npm run dev
# The app runs on http://localhost:5173
```

## API Endpoints

- `GET /todos` - List all todos
- `GET /todos/:id` - Get a single todo
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## License

MIT
