export function isValidPriority(priority: unknown): boolean {
    return priority === "low" || priority === "medium" || priority === "high";
}

export function isValidStatus(status: unknown): boolean {
    return status === "pending" || status === "in_progress" || status === "completed";
}

export function getCreateTaskError(body: any): string | null {
    if (typeof body !== "object" || body === null) {
        return "Request body must be a JSON object";
    }

    if (typeof body.title !== "string" || body.title.trim() === "") {
        return "'title' is required and must be a non-empty string";
    }

    if (typeof body.description !== "string" || body.description.trim() === "") {
        return "'description' is required and must be a non-empty string";
    }

    if (body.priority !== undefined && !isValidPriority(body.priority)) {
        return "'priority' must be 'low', 'medium' or 'high'";
    }

    if (body.status !== undefined && !isValidStatus(body.status)) {
        return "'status' must be 'pending', 'in_progress' or 'completed'";
    }

    return null;
}

export function getUpdateTaskError(body: any): string | null {
    if (typeof body !== "object" || body === null) {
        return "Request body must be a JSON object";
    }

    if (body.title !== undefined && (typeof body.title !== "string" || body.title.trim() === "")) {
        return "'title' must be a non-empty string";
    }

    if (body.description !== undefined && (typeof body.description !== "string" || body.description.trim() === "")) {
        return "'description' must be a non-empty string";
    }

    if (body.priority !== undefined && !isValidPriority(body.priority)) {
        return "'priority' must be 'low', 'medium' or 'high'";
    }

    if (body.status !== undefined && !isValidStatus(body.status)) {
        return "'status' must be 'pending', 'in_progress' or 'completed'";
    }

    return null;
}
