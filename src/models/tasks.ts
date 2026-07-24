  export interface Task{
    id:string;
    title:string;
    description:string;
    priority: "low" | "medium" | "high";
    status: "pending" | "in_progress" | "completed";
    created_at:Date;
    updated_at:Date;
}

export interface TaskPayload{
  title:string;
  description:string;
  priority?:"low" | "medium" |"high";
  status?: "pending" | "in_progress" |"completed";
}

export interface UpdateTaskPayload{
  title?:string;
  description?:string;
  priority?:"low" | "medium" |"high";
  status?:"pending" | "in_progress" |"completed";
}