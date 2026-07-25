import { taskRoutes } from "./routes/taskRoutes";

const server = Bun.serve({
    port: 3000,

    async fetch(request) {
        return taskRoutes(request);
    },
});

console.log(`Server is listening on http://localhost:${server.port}`);