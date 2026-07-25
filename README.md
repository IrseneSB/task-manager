# task-manager

A simple REST API for managing tasks, built with Bun.

## Install

```bash
bun install
```

## Run

```bash
bun run src/index.ts
```

The server starts on `http://localhost:3000`.

## Endpoints

### Create a task

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy milk", "description": "2% milk, one gallon", "priority": "medium", "status": "pending"}'
```

### Get all tasks

```bash
curl http://localhost:3000/tasks
```

### Get a task by id

```bash
curl http://localhost:3000/tasks/<task-id>
```

### Update a task

```bash
curl -X PUT http://localhost:3000/tasks/<task-id> \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

### Delete a task

```bash
curl -X DELETE http://localhost:3000/tasks/<task-id>
```

This project was created using `bun init` in bun v1.3.14. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
