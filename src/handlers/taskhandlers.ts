import type { Task } from "../models/tasks";
import { tasks } from "../data/taskstore";
import { getCreateTaskError, getUpdateTaskError } from "./taskValidation";

export async function createTask(request: Request) {
    let body: any;
    try {
        body = await request.json();
    } catch {
        return Response.json(
            { error: "Request body is not valid JSON" },
            { status: 400 }
        );
    }

    const validationError = getCreateTaskError(body);
    if (validationError) {
        return Response.json({ error: validationError }, { status: 400 });
    }

    const newTask: Task = {
        id: crypto.randomUUID(),
        title: body.title,
        description: body.description,
        priority: body.priority ?? "medium",
        status: body.status ?? "pending",
        created_at: new Date(),
        updated_at: new Date(),
    };

    tasks.push(newTask);

    return Response.json(newTask, { status: 201 });
}

export function getTasks() {
    return Response.json(tasks, { status: 200 });
}

export function getTaskById(id: string) {
    const task = tasks.find((task) => task.id === id);

    if (!task) {
        return Response.json({ error: "Task not found" }, { status: 404 });
    }

    return Response.json(task, { status: 200 });
}

export async function updateTask(request: Request, id: string) {
    const task = tasks.find((task) => task.id === id);

    if (!task) {
        return Response.json({ error: "Task not found" }, { status: 404 });
    }

    let body: any;
    try {
        body = await request.json();
    } catch {
        return Response.json(
            { error: "Request body is not valid JSON" },
            { status: 400 }
        );
    }

    const validationError = getUpdateTaskError(body);
    if (validationError) {
        return Response.json({ error: validationError }, { status: 400 });
    }

    if (body.title !== undefined) {
        task.title = body.title;
    }

    if (body.description !== undefined) {
        task.description = body.description;
    }

    if (body.priority !== undefined) {
        task.priority = body.priority;
    }

    if (body.status !== undefined) {
        task.status = body.status;
    }

    task.updated_at = new Date();

    return Response.json(task, { status: 200 });
}

export function deleteTask(id: string) {
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
        return Response.json({ error: "Task not found" }, { status: 404 });
    }

    tasks.splice(index, 1);

    return Response.json(
        { message: "Task deleted successfully" },
        { status: 200 }
    );
}
