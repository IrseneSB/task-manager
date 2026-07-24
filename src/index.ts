import type { Task, TaskPayload,UpdateTaskPayload } from "./models/tasks";
import { tasks } from "./data/taskstore";


const server = Bun.serve({
    port: 3000,

    async fetch(request) {
        const url = new URL(request.url);
        const parts = url.pathname.split("/");

        if (request.method === "POST" && url.pathname === "/tasks") {

            const body = await request.json() as TaskPayload;

            if (!body.title || !body.description) {
                return Response.json(
                    { error: "title and description are required" },
                    { status: 400 }
                );
            }

            const newTask: Task = {
                uuid: crypto.randomUUID(),
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

        else if (request.method === "GET" && url.pathname === "/tasks") {

            return Response.json(tasks, { status: 200 });

        }

        else if (request.method === "GET" && parts[1] === "tasks" && parts[2]) {

            const task = tasks.find(
                (task) => task.uuid=== parts[2]
            );

            if (!task) {
                return Response.json(
                    { error: "Task not found" },
                    { status: 404 }
                );
            }

            return Response.json(task, { status: 200 });

        }

        else if (request.method === "PUT" && parts[1] === "tasks" && parts[2]) {

            const task = tasks.find(
                (task) => task.uuid=== parts[2]
            );

            if (!task) {
                return Response.json(
                    { error: "Task not found" },
                    { status: 404 }
                );
            }

            const body = await request.json() as UpdateTaskPayload;

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

        else if (request.method === "DELETE" && parts[1] === "tasks" && parts[2]) {

            const index = tasks.findIndex(
                (task) => task.uuid === parts[2]
            );

            if (index === -1) {
                return Response.json(
                    { error: "Task not found" },
                    { status: 404 }
                );
            }

            tasks.splice(index, 1);

            return Response.json(
                { message: "Task deleted successfully" },
                { status: 200 }
            );

        }

        return new Response("Route not found", { status: 404 });
    },
});

console.log(`Server is listening on http://localhost:${server.port}`);