import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} from "../handlers/taskhandlers";

export async function taskRoutes(request: Request) {
    const url = new URL(request.url);
    const parts = url.pathname.split("/");

    if (request.method === "POST" && url.pathname === "/tasks") {

        return createTask(request);

    }

    else if (request.method === "GET" && url.pathname === "/tasks") {

        return getTasks();

    }

    else if (request.method === "GET" && parts[1] === "tasks" && parts[2]) {

        return getTaskById(parts[2]);

    }

    else if (request.method === "PUT" && parts[1] === "tasks" && parts[2]) {

        return updateTask(request, parts[2]);

    }

    else if (request.method === "DELETE" && parts[1] === "tasks" && parts[2]) {

        return deleteTask(parts[2]);

    }

    return new Response("Route not found", { status: 404 });
}